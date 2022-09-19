import * as AWS from 'aws-sdk';
import * as nodemailer from 'nodemailer';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body?.name || !req.body?.organization || !req.body?.email || !req.body?.message) {
    return res.status(400).json({ status: 'Invalid application' });
  }

  const subject = `Support request from ${req.body?.name} on behalf of ${req.body?.organization}`;

  const text = `NAME:\n${req.body?.name}
\r\n\r\nORGANIZATION:\n${req.body?.organization}
\r\n\r\nEMAIL:\n${req.body?.email}
\r\n\r\nMESSAGE:\n${req.body?.message}
`;

  const sendMail = async () => {
    try {
      const response = await transporter.sendMail({
        from: 'info@peopleforbikes.org',
        replyTo: req.body.email as string,
        to: process.env.SUPPORT_REQUEST_TO_ADDRESS,
        subject,
        text,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  try {
    await sendMail();

    return res.status(200).json({ status: 'Support request sent' });
  } catch (error) {
    return res.status(500).json({ status: 'Support request not sent' });
  }
}
