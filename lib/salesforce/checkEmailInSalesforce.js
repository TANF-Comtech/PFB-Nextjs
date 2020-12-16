import {getAccessToken} from './accessToken'
import * as jsforce from 'jsforce'

const checkEmailInSalesforce = (email) => {

    let primaryAffiliation

    return getAccessToken().then(data=>{
        const accessToken = data
        console.log("Access Token :)", accessToken)
        var sfConnection = new jsforce.Connection({
        instanceUrl: 'https://cs36.salesforce.com/',
        version: '49.0',
        accessToken: accessToken
        });

        return sfConnection.query(`SELECT Id, npsp__Primary_Affiliation__c FROM Contact WHERE Email = '${email}'`)
        .then(function(res) {
            try{
            const customerID = res.records[0].Id
            primaryAffiliation = res.records[0].npsp__Primary_Affiliation__c
            console.log("Customer ID is " + customerID)
            return customerID
        }
        catch(error){
            console.log("Customer Doesn't Even Exist!")
            throw new Error("Your email is not currently in our database. Please use this form (X) to register yourself with a company");
        }
        }).then(customerID =>{
            sfConnection.query(`SELECT 	npe5__Organization__c, npe5__Contact__c FROM npe5__Affiliation__c WHERE npe5__Contact__c = '${customerID}'`)
            .then(function(res) {
            if(res.length>0){
            const affiliationIDs = res.records.map(record=>{
                    return record.npe5__Organization__c
            })
            return affiliationIDs
            }
            else{
                console.log("Customer Has No Affliations!")
                throw new Error("Your organization is not currently a member, please contact Kerri Salazar at Kerri@peopleforbikes.org");    
            }
           
        }).then(affiliationIDs =>{
            sfConnection.query(`SELECT Id, Name, Last_Membership_End_Date__c, Last_Membership_End_Date_Child__c, FROM Account WHERE Id IN = ${affiliationIDs.join(', ')}`)
            .then(function(res) {
            console.log(res)
            })
            //date handling here

               // if both fields are blank block access
                // primary affliation for now
                // 6 months cutoff Last Membership End Date and Last Membership End Date Child
            
        })  
        }).catch(error => {
            return {status:false,error:error.message}
        })
    })
}

export default checkEmailInSalesforce