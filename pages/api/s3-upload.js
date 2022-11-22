import { APIRoute } from 'next-s3-upload';

export default APIRoute.configure({
  key(req, filename) {
    const date = new Date().toLocaleDateString('en-CA').replaceAll('/', '-');
    return `${date}-${filename.toLowerCase()}`;
  },
});
