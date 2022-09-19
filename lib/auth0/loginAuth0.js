import { AuthenticationClient } from 'auth0';

/**
 * login to Auth0
 * @param {string} code
 * @param {string} email
 * @param {string} phone
 */
const loginAuth0 = (code, email, phone = null) => {
  const auth0Options = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  };

  const auth0 = new AuthenticationClient(auth0Options);

  return auth0.passwordless.signIn({
    otp: code,
    realm: phone ? 'sms' : 'email',
    username: phone || email,
  });
};

export default loginAuth0;
