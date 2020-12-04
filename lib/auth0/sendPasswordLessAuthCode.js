import * as auth0 from 'auth0-js'

const sendPasswordlessAuthCode = (email) => {
    const webAuth = new auth0.WebAuth({
        clientID: process.env.AUTH0CLIENTID,
        domain: process.env.AUTH0DOMAIN,
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

export default sendPasswordLessAuthCode