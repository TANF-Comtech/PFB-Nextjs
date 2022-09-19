import { AuthenticationClient } from 'auth0';

/**
 * send passwordless auth code to an email or phone number
 * @param {string} email
 * @param {string} phone
 */
const sendAuthCode = (email, phone = '') => {
  const auth0Options = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  };

  const auth0 = new AuthenticationClient(auth0Options);

  if (phone) {
    return auth0.passwordless.sendSMS({ phone_number: phone });
  }

  return auth0.passwordless.sendEmail({ email: email, send: 'code' });
};

export default sendAuthCode;
