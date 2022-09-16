import type { NextApiRequest, NextApiResponse } from 'next';
import { setPreviewData, redirectToPreviewURL } from '@prismicio/next';

import { linkResolver, createClient } from '~/lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = createClient({ req } as any);

  await setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client, linkResolver });
}
