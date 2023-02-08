import * as jsforce from 'jsforce';

import { getAccessToken } from '~/lib/salesforce/accessToken';

const salesforceInstanceURL = `${process.env.SALESFORCE_INSTANCE_URL}`;

const getCorporateMembers = () => {
  return getAccessToken().then(async (accessToken) => {
    const sfConnection = new jsforce.Connection({
      instanceUrl: salesforceInstanceURL,
      version: '49.0',
      accessToken,
    });

    const CurrentDate = new Date();
    const MinSixMonths = MemberDate(CurrentDate);
  
    try {
      const fetchedData = await sfConnection.query(
        `SELECT Id,Published_Name__c,Website FROM Account WHERE Do_not_publish_membership__c = false AND (Last_Membership_End_Date__c >= ${MinSixMonths} OR Last_Membership_End_Date_Child__c >= ${MinSixMonths})`
      );
      
      const memberData = fetchedData.records;
      return memberData;

    } catch (error) {
      return error;
    }
  });
};

const MemberDate = (date) => {
  date.setMonth(date.getMonth() - 6);
  return date.toISOString().split('T')[0];
};

export default getCorporateMembers;
