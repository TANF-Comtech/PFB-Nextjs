import * as jwt from 'jsonwebtoken'

const getAuth0PublicKey = async () => {

    const response = await fetch ('https://pfb.us.auth0.com/pem',{
        method:'GET',
        mode:'cors'
      })
      return response.text()
  }

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