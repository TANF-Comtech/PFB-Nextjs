import type { NextApiRequest, NextApiResponse } from 'next';
import { exitPreview } from '@prismicio/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await exitPreview({ req, res });
}
