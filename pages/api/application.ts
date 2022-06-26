import * as AWS from 'aws-sdk';
import * as nodemailer from 'nodemailer';
import formidable from 'formidable';
import { PassThrough } from 'node:stream';
import type { NextApiRequest, NextApiResponse } from 'next';

AWS.config.update({
  accessKeyId: process.env.AWS_SES_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SES_S3_SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

AWS.config.getCredentials((error) => {
  if (error) {
    console.error(error.stack);
  }
});

const SES = new AWS.SES({ apiVersion: '2010-12-01' });

const transporter = nodemailer.createTransport({
  SES,
  sendingRate: 1,
});

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_SES_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SES_S3_SECRET_ACCESS_KEY,
});

const uploadStream = (file) => {
  const pass = new PassThrough();

  S3.upload(
    {
      Bucket: 'pfb-grants',
      Key: `${file.newFilename}.${file.originalFilename.split('.')[1]}`,
      ContentType: file.mimeType,
      Body: pass,
    },
    (error, data) => {
      console.log(error, data);
    },
  );

  return pass;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    fileWriteStreamHandler: uploadStream as any,
  });

  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).json({ error });
    }

    if (
      !fields.missionAndHistory ||
      !fields.projectDescription ||
      !fields.communityBenefits ||
      !fields.diversityStatement ||
      !fields.evaluation
    ) {
      return res.status(400).json({ data: 'Invalid application' });
    }

    const subject = `Grant application`;

    const text = `Mission and history:\n
${fields.missionAndHistory}\r\n
\r\n
Project description:\n
${fields.projectDescription}\r\n
\r\n
Community benefits:\n
${fields.communityBenefits}\r\n
\r\n
Diversity statement:\n
${fields.diversityStatement}\r\n
\r\n
Evaluation:\n
${fields.evaluation}`;

    const newFiles = [...Object.entries(files)].map((item) => item.slice(-1)[0]);
    console.log(newFiles);

    // @TODO remove
    return;

    //@TODO populate attachments with array of objects containing `filename` and `path` (AWS S3 URL) properties

    const sendMail = async () => {
      try {
        const response = await transporter.sendMail({
          from: process.env.GRANTS_APPLICATION_FROM_ADDRESS,
          to: process.env.GRANTS_APPLICATION_TO_ADDRESS,
          subject,
          text,
          attachments: [],
        });

        return response;
      } catch (error) {
        console.error(error);
      }
    };

    try {
      await sendMail();

      return res.status(200).json({ status: 'Application sent' });
    } catch (error) {
      return res.status(500).json({ status: 'Application not sent' });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
