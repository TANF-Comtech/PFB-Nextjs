import * as jwt from 'jsonwebtoken'


const checkAccessToken = () => {
    //fs check timestamp
}


const getAccessToken = () => {
    const token = jwt.sign({ prn: userName }, privateKey, options);

    const accessTokenRequest = async () => {
        setLoginLoading(true)
        const response = await fetch (process.env.SALESFORCE_URL,{
          method:'POST',
          mode:'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email})
    
        })
        return response.json()
      }
    
}


export {checkAccessToken, getAccessToken}