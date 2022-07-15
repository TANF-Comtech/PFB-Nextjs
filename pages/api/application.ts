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
    (error, data) => {},
  );

  return pass;
};

const getAttachments = (files: any) => {
  const attachments = [...Object.entries(files)].map((file: any) => {
    const filename = `${file[1].newFilename}.${file[1].originalFilename.split('.')[1]}`;
    const contentType = `${file[1].mimetype}`;
    const path = `https://pfb-grants.s3.us-east-2.amazonaws.com/${filename}`;

    return {
      filename,
      contentType,
      path,
    };
  });

  return attachments;
};

const getLinks = (files: any) => {
  const links = [...Object.entries(files)].map(
    (file: any) =>
      `https://pfb-grants.s3.us-east-2.amazonaws.com/${file[1].newFilename}.${
        file[1].originalFilename.split('.')[1]
      }`,
  );

  return links;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    fileWriteStreamHandler: uploadStream as any,
  });

  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).json({ error });
    }

    const links = getLinks(files);

    if (
      !fields.name ||
      !fields.email ||
      !fields.phone ||
      !fields.missionAndHistory ||
      !fields.projectDescription ||
      !fields.communityBenefits ||
      !fields.diversityStatement ||
      !fields.evaluation ||
      !links.length
    ) {
      return res.status(400).json({ status: 'Invalid application' });
    }

    const subject = `Grant application from ${fields.name} (${fields.email})`;

    const text = `Name:\n
${fields.name}\r\n
\r\n
Email:\n
${fields.email}\r\n
\r\n
Phone:\n
${fields.phone}\r\n
\r\n
Mission and history:\n
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
${fields.evaluation}\r\n
\r\n
Attachments:\n
${links.map((link) => `${link}\n`)}`;

    // @TODO restore attachments
    // const attachments = getAttachments(files);

    const sendMail = async () => {
      try {
        const response = await transporter.sendMail({
          from: process.env.GRANTS_APPLICATION_FROM_ADDRESS,
          replyTo: fields.email as string,
          to: process.env.GRANTS_APPLICATION_TO_ADDRESS,
          subject,
          text,
          // @TODO restore attachments
          // attachments,
        });

        return response;
      } catch (error) {
        console.error(error);
      }
    };

    try {
      const emailResponse = await sendMail();

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
