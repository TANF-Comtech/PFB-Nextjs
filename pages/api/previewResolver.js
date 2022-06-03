const Prismic = require('@prismicio/client');
const linkResolver = require('../../lib/utils');

exports.prismicPreview = async (req, res) => {
  const { token, documentId } = req.query;
  const api = await Prismic.client('https://peopleforbikes.prismic.io/api/v2');
  const redirectUrl = await api.getPreviewResolver(token, documentId).resolve(linkResolver, '/');
  // because we're using the Prismic.client method, we apparently don't need to set the cookies
  res.redirect(302, redirectUrl);
};
