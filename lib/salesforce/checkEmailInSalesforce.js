import * as jsforce from 'jsforce';

import { getAccessToken } from '~/lib/salesforce/accessToken';

const salesforceInstanceURL = process.env.SALESFORCE_INSTANCE_URL;

//https://stackoverflow.com/a/1648448/

/**
 * utility function to get the number of days in a given month for a given year
 * @param {*} year
 * @param {*} month
 */

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

/**
 * add or subtract months for dates
 * example: //addMonths(new Date(), -6)
 * @param {*} input
 * @param {*} months
 */

const addMonths = (input, months) => {
  const date = new Date(input);
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth() + 1)));
  return date;
};

/**
 * takes an email and runs some logic to determine if the email is eligible
 * to login given it's associated data in salesforce
 * uses jsforce to wrap some SOQL to query the salesforce database
 * @param {string} email
 */

const checkEmailInSalesforce = (email) => {
  let primaryAffiliationID;
  let name;
  let authedOrg = false;

  return getAccessToken().then((data) => {
    const accessToken = data;
    var sfConnection = new jsforce.Connection({
      instanceUrl: salesforceInstanceURL,
      version: '49.0',
      accessToken: accessToken,
    });
    //Query 1. - find the salesforce contact by querying the email param against the contact's email or personal email
    return sfConnection
      .query(
        `SELECT Id, Name, npsp__Primary_Affiliation__c FROM Contact WHERE Email = '${email}' OR Personal_Email__c = '${email}'`,
      )
      .then(function (res) {
        try {
          const customerID = res.records[0].Id;
          name = res.records[0].Name;
          // save primary affiliation so we query it first later
          // in the date comparisons
          // (so the user will sign into their primary affiliation first if it's eligible)
          primaryAffiliationID = res.records[0]?.npsp__Primary_Affiliation__c;
          //console.log("Customer ID is " + customerID)
          return customerID;
        } catch (error) {
          throw new Error(
            '<p>Your email is currently not registered. Please register here: <a href="https://www.peopleforbikes.org/take-action/register-for-peopleforbikes-member-center" style={{ textDecoration: \'underline\' }}>https://www.peopleforbikes.org/take-action/register-for-peopleforbikes-member-center</a>. Your employer must be a current PeopleForBikes Corporate Member to gain access to the Member Center.</p>',
          );
        }
      })
      .then((customerID) => {
        //Query 2. - get all affiliations for a contact
        return sfConnection
          .query(
            `SELECT npe5__Organization__c, npe5__Contact__c FROM npe5__Affiliation__c WHERE npe5__Contact__c = '${customerID}'`,
          )
          .then(function (res) {
            if (res.records.length > 0) {
              const affiliationIDs = res.records.map((record) => {
                return record.npe5__Organization__c;
              });
              return affiliationIDs;
            } else {
              //console.log("Customer Has No Affiliations!")
              throw new Error(
                '<p>Your email is not affiliated with an organization in our database. Please contact Mimi at <a href="mailto:mimi@peopleforbikes.org?subject=PeopleForBikes%20Member%20Center%20-%20Email%20Affiliation%20Error" style={{ textDecoration: \'underline\' }}>mimi@peopleforbikes.org</a></p>',
              );
            }
          })
          .then((affiliationIDs) => {
            //Query 3. - get all accounts for a collection of affiliations
            return sfConnection
              .query(
                `SELECT Id, Name, Last_Membership_End_Date__c, Last_Membership_End_Date_Child__c FROM Account WHERE Id IN (${affiliationIDs
                  .map((a) => {
                    return "'" + a + "'";
                  })
                  .join(',')})`,
              )
              .then(function (res) {
                const records = res.records;
                // if you have a primary affiliation sort it first by removing it
                // from the records array and then inserting it back at the very start
                if (primaryAffiliationID) {
                  let primaryAffiliationIndex = false;
                  for (const [index, org] of records.entries()) {
                    if (org.Id === primaryAffiliationID) {
                      primaryAffiliationIndex = index;
                      break;
                    }
                  }
                  if (primaryAffiliationIndex) {
                    const primaryAffliation = records.splice(primaryAffiliationIndex, 1);
                    //console.log("primary affiliation", primaryAffiliation)
                    records.unshift(primaryAffliation[0]);
                  }
                }
                //find the first eligible affiliation
                for (const org of records) {
                  const lastMembership = new Date(org.Last_Membership_End_Date__c);
                  const lastMembershipChild = new Date(org.Last_Membership_End_Date_Child__c);
                  const sixMonthsAgo = addMonths(new Date(), -6);
                  if (sixMonthsAgo <= lastMembership || sixMonthsAgo <= lastMembershipChild) {
                    authedOrg = org.Name;
                    break;
                  }
                }
                if (authedOrg) {
                  // return the name and eligible affiliation
                  return { status: true, name: name, affiliation: authedOrg };
                } else {
                  throw new Error(
                    '<p>Your organization\'s membership has expired, please contact Mimi at <a href="mailto:mimi@peopleforbikes.org?subject=PeopleForBikes%20Member%20Center%20-%20Organization%20Expiration" style={{ textDecoration: \'underline\' }}>mimi@peopleforbikes.org</a></p>',
                  );
                }
              });
          });
      })
      .catch((error) => {
        return { status: false, error: error.message };
      });
  });
};

export default checkEmailInSalesforce;
