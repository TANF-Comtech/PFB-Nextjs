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
  const date = new Date().toLocaleDateString('en-CA').replaceAll('/', '-');
  const subject = `Owner's Manual purchase (${date})`;

  const text = `An Owner's Manual has been purchased on ${date}!`;

  const sendMail = async () => {
    try {
      const response = await transporter.sendMail({
        from: 'info@peopleforbikes.org',
        to: process.env.OWNERS_MANUAL_NOTIFICATION_TO_ADDRESS,
        cc: process.env.OWNERS_MANUAL_NOTIFICATION_CC_ADDRESS,
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

    return res.status(200).json({ status: 'Notification sent' });
  } catch (error) {
    return res.status(500).json({ status: 'Notification not sent' });
  }
}
