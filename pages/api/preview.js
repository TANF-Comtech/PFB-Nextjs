import { PrismicClient } from '../../lib/api'
import { linkResolver } from '../../lib/utils'

/**
 * Preview()
 * 
 * Preview sets up an endpoint that generates the preview for the admin user
 * Note that it's only visible to the admin because we put together 
 * 
 * @param {*} req 
 * @param {*} res 
 */
const Preview = async (req, res) => {
  const { token: ref, documentId } = req.query;

  // Uses getPreviewResolver to figure out where to send user
  const redirectUrl = await PrismicClient.getPreviewResolver(ref, documentId).resolve(linkResolver(meta), "/");

  if (!redirectUrl) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Enable Preview Mode by setting the cookies
  // pass the ref to pages so that they can fetch the draft ref
  res.setPreviewData({ ref });

  // Redirect the user to the share endpoint from same origin. This is
  // necessary due to a Chrome bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
  // res.writeHead(302, { Location: `${redirectUrl}`  })
  res.write(
    `<!DOCTYPE html>
     <html>
      <head>
        <meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
        <script>window.location.href = '${redirectUrl}'</script>
      </head>`
  )

  res.end();
};

export default Preview;


// export default async function preview(req, res) {
//   const { token: ref, documentId } = req.query

//   // Check the token parameter against the Prismic SDK
//   const url = await PrismicClient
//     .getPreviewResolver(ref, documentId)
//     .resolve(linkResolver, '/')

//   if (!url) {
//     return res.status(401).json({ message: 'Invalid token' })
//   }

//   // Enable Preview Mode by setting the cookies
//   res.setPreviewData({
//     ref, // pass the ref to pages so that they can fetch the draft ref
//   })

//   // Redirect the user to the share endpoint from same origin. This is
//   // necessary due to a Chrome bug:
//   // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
//   res.write(
//     `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
//     <script>window.location.href = '${url}'</script>
//     </head>`
//   )

//   res.end()
// }

