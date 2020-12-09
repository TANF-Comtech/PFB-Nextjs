import {getAccessToken} from './accessToken'
import * as jsforce from 'jsforce'

const checkEmailInSalesforce = (email) => {

    return getAccessToken().then(data=>{
        const accessToken = data
        console.log("Access Token :)", accessToken)
        var sfConnection = new jsforce.Connection({
        instanceUrl: 'https://cs36.salesforce.com/',
        version: '49.0',
        accessToken: accessToken
        });

        return sfConnection.query(`SELECT Id FROM Contact WHERE Email = '${email}'`)
        .then(function(res) {
        try{
            const customerID = res.records[0].Id
            console.log("Customer ID is " + customerID)
            return {inSalesForce:true} //temporary - need to check affliations
        }
        catch(error){
            console.log("Customer Doesn't Even Exist!")
            return {inSalesForce:false}
        }
        })
    })
}

export default checkEmailInSalesforce