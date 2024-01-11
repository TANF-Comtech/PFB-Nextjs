import Cookies from 'cookies';

import updateOwnersManualData from '~/lib/salesforce/updateOwnersManualData';

const updateData = (req, res) => {  
  console.log(req);
  let sfParams = {}
  if (req.body.type === 'checkout.session.completed') {
    // stripe
    console.log('in stripe')
    sfParams['OM_Stripe_Subscription_ID__c'] = `https://dashboard.stripe.com/subscriptions/${req.body.data.object.subscription}`
    sfParams['OM_Payment_Received__c'] = true;
    const today = new Date();
    const oneYearFromToday = new Date(today.setFullYear(today.getFullYear() + 1));
    sfParams['OM_Expiration_Date__c'] = oneYearFromToday.toISOString();
    sfParams['Id'] = req.body.data.object.client_reference_id;
  } else if (req.body.event === 'recipient-completed') {
    // docusign
    console.log('in docusign')
    sfParams['OM_Agreement_Doc__c'] = req.body.data.envelopeId;
    sfParams['OM_License_Agreement_Signed__c'] = true;
    sfParams['Id'] = req.body.data.envelopeSummary.recipients.signers[0].tabs.textTabs[0].value;
    console.log(sfParams)
  } else if (JSON.parse(req.body) && JSON.parse(req.body).awsUrl) {
    // aws    
    sfParams['OM_Insurance_Cert_Received__c'] = true;
    sfParams['OM_Insurance_Doc__c'] = JSON.parse(req.body).awsUrl;
    sfParams['Id'] = JSON.parse(req.body).Id;
  }
  updateOwnersManualData(sfParams)
  res.status(200).json({ message: 'Resquest Successful!' })
};

export default updateData;
