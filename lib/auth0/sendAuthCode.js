import {AuthenticationClient} from 'auth0'

/**
 * send passwordless auth code to an email
 * @param {string} email 
 */
const sendAuthCode = (email) => {
  
  const auth0Options = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
  }
  
  const auth0 = new AuthenticationClient(auth0Options)
  
  return auth0.passwordless.sendEmail({email:email,send:'code'}) 

}

export default sendAuthCode