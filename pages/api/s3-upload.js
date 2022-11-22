import { APIRoute } from 'next-s3-upload';

export default APIRoute.configure({
  key(req, filename) {
    return `${new Date()
      .toLocaleDateString('en-CA')
      .replaceAll('/', '-')}-${filename.toLowerCase()}`;
  },
});
