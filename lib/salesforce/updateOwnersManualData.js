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
    console.log('updating data')
    let accountName = 'test pfb organization';    
    // convert key in data to proper salesforce attribute name
    // cases
    // docusign

    // AWS
    // stripe    

    sfConnection
    .query(
        `SELECT Id FROM Account WHERE Name = '${accountName}'`
    )
    .then((results) => {
      console.log(results);      
      if (results.records.length > 0) {
          let acctId = results.records[0].Id;
          console.log(acctId);
          userData['Id'] = acctId          
          sfConnection.sobject("Account").update(userData, function(err, ret) {
            console.log('err')
            console.log(err)
            console.log('ret')
            console.log(ret)
          });        
      } else {
          console.log("No account found with the given name");
      }
    })
    .catch((error) => {
        console.error("Error in querying Salesforce: ", error);
    });
  })
};

export default updateOwnersManualData;
