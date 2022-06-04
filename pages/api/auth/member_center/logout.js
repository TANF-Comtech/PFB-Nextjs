import Cookies from 'cookies';

const logout = (req, res) => {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    cookies.set('auth-token');
    res.status(200).json({ status: true });
  }
};

export default logout;
