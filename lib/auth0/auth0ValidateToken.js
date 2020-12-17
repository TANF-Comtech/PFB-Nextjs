import * as jwt from 'jsonwebtoken'

const auth0URL = process.env.AUTH0_DOMAIN

/**
 * get the Auth0 public key file so you can validate the token
 */
const getAuth0PublicKey = async () => {

    const response = await fetch (+'pem',{
        method:'GET',
        mode:'cors'
      })
      return response.text()
  }

/**
 * takes a token and validates and decodes it
 * @param {*} token 
 */
const auth0ValidateToken = async (token) => {
    return await getAuth0PublicKey().then(data=>{
        let decoded
        try {
            decoded = jwt.verify(token, data);
          } catch(err) {
            return false
          }
          return {
            "user":{
                "email": decoded.email,
                "name": decoded.nickname,
                "affiliation":"",
            },
            "loggedIn":true
        }
    })
}

export default auth0ValidateToken