import * as jsforce from 'jsforce';

import { getAccessToken } from '~/lib/salesforce/accessToken';

const salesforceInstanceURL = process.env.SALESFORCE_INSTANCE_URL;

const updateOwnersManualData = (userData) => { 
  console.log('userData')     
  console.log(userData)     
  getAccessToken().then((data) => {
    const accessToken = data;
    var sfConnection = new jsforce.Connection({
      instanceUrl: salesforceInstanceURL,
      version: '49.0',
      accessToken: accessToken,
    });    
    sfConnection.sobject("Account").update(userData, function(err, ret) {
      console.log('err')
      console.log(err)
      console.log('ret')
      console.log(ret)
    });            
  })
};

export default updateOwnersManualData;
