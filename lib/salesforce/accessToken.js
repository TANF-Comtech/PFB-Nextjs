import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';

const salesforceURL = process.env.SALESFORCE_AUTH_URL;
const salesforceUser = 'sfadmin@peopleforbikes.org';

const AWSACCESSKEY = process.env.PFB_AWS_ACCESS_KEY;
const AWSSECRETKEY = process.env.PFB_AWS_SECRET_KEY;

/**
 * check accesstoken.txt for an access token if it is still valid
 */
const checkAccessTokenStillValid = () => {
  try {
    const accessTokenFileProps = fs.statSync('accesstoken.txt');
    const accessTokenModifiedTime = new Date(accessTokenFileProps.mtime);
    const dateDiffInMinutes = Math.abs(accessTokenModifiedTime - new Date()) / (1000 * 60);
    if (dateDiffInMinutes >= 15) {
      return false;
    } else {
      return JSON.parse(fs.readFileSync('accesstoken.txt'))?.access_token;
    }
  } catch (error) {
    return false;
  }
};

/**
 * get the key file from s3 so that you can authenticate with salesforce
 */
const s3KeyFileRequest = async () => {
  const s3 = new S3({
    accessKeyId: AWSACCESSKEY,
    secretAccessKey: AWSSECRETKEY,
    apiVersion: '2006-03-01',
  });
  const params = {
    Bucket: 'pfb-sforce',
    Key: 'api-salesforce/server.key',
  };
  return (await s3.getObject(params).promise()).Body.toString('utf-8');
};

/**
 *  use the s3 key file so that you can authenticate with salesforce
 *  by signing a jwt
 *  return the access token
 *  https://help.salesforce.com/articleView?id=remoteaccess_oauth_jwt_flow.htm&type=5
 * @param {*} s3KeyFile
 */
const accessTokenRequest = async (s3KeyFile) => {
  const options = {
    issuer: process.env.SALESFORCE_CLIENT_ID,
    audience: salesforceURL,
    expiresIn: '3m',
    algorithm: 'RS256',
  };

  const token = jwt.sign({ prn: salesforceUser }, s3KeyFile, options);

  const response = await fetch(salesforceURL + 'services/oauth2/token', {
    method: 'POST',
    mode: 'cors',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }),
  });
  return response.json();
};

/**
 * if access token for salesforce is still valid, return the access token
 * otherwise, get the keyFile from s3, use on salesforce
 * and return the new access token
 */
const getAccessToken = async () => {
  /*   const access_token = checkAccessTokenStillValid()

  if(access_token){
    return access_token
  }

  else if(!access_token){ */
  const s3KeyFile = await s3KeyFileRequest();
  return await accessTokenRequest(s3KeyFile).then((data) => {
    /* fs.writeFile('accesstoken.txt', JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        }) */
    return data.access_token;
  });
};
//}

export { getAccessToken };
