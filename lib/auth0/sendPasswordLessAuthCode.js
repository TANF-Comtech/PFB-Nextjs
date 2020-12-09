import * as auth0 from 'auth0-js'

const sendPasswordlessAuthCode = (email) => {
    const webAuth = new auth0.WebAuth({
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
        responseType: 'token id_token'
      });
      webAuth.passwordlessStart({
        connection: 'email',
        send: 'code',
        email: email
      }, function (err,res) {
        
      }
    );
}

export default sendPasswordlessAuthCode