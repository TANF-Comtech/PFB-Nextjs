import { setPreviewData, redirectToPreviewURL } from '@prismicio/next';

import { linkResolver, createClient } from '~/lib/api';

export default async function handler(req, res) {
  const client = createClient({ req });

  await setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client, linkResolver });
}
