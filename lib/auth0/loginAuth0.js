import {AuthenticationClient} from 'auth0'

const loginAuth0 = (code,email) => {
  
  const auth0Options = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
  }
  
  const auth0 = new AuthenticationClient(auth0Options)
  
  return auth0.passwordless.signIn({otp:code,realm:'email',username:email}, function (err,message){
      if (err) {
        console.log("Auth0 Error", err)
      }
      if(message){
        console.log("Auth0 Message", message)
      }
  })  

}

export default loginAuth0