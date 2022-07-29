import Cookies from 'cookies';

import auth0ValidateToken from '~/lib/auth0/auth0ValidateToken';

const checkLogin = (req, res) => {
  if (req.method === 'GET') {
    const cookies = new Cookies(req, res);
    const token = cookies.get('auth-token');

    if (token) {
      auth0ValidateToken(token).then((data) => {
        res.status(200).json(data);
      });
    } else {
      res.status(200).json({ loggedIn: false });
    }
  }
};

export default checkLogin;
