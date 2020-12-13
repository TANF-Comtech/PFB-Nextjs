import * as jwt from 'jsonwebtoken'
import fs, { access } from 'fs'
import path from 'path'


const checkAccessTokenStillValid = () => {
    
    try{
      const accessTokenFileProps = fs.statSync('accesstoken.txt')
      const accessTokenModifiedTime = new Date(accessTokenFileProps.mtime)
      const dateDiffInMinutes = (Math.abs(accessTokenModifiedTime - new Date())/(1000*60))
      if(dateDiffInMinutes >= 15){
        return false
      }
      else{
        return  JSON.parse(fs.readFileSync('accesstoken.txt'))?.access_token
      }
    }
    catch(error){
      return false
    }
}


const options = {
  issuer: process.env.SALESFORCE_CLIENT_ID,
  audience: 'https://test.salesforce.com/',
  expiresIn: '3m',
  algorithm:'RS256'
}

const token = jwt.sign({ prn: 'omar+1@omarspira.com.partialcop' }, fs.readFileSync('server.key','utf-8'),options);


const accessTokenRequest = async () => {
  const response = await fetch ("https://test.salesforce.com/" + 'services/oauth2/token',{
    method:'POST',
    mode:'cors',
    body: new URLSearchParams({
      'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      'assertion': token
    }),
  })
  return response.json()
}

const getAccessToken = async () => {

  const access_token = checkAccessTokenStillValid()

  if(access_token){
    return access_token
  }

  else if(!access_token){
        return await accessTokenRequest().then(data=>{
        fs.writeFile('accesstoken.txt', JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        })
        return data.access_token
      })
  }
}


export {getAccessToken}