import {getAccessToken} from './accessToken'

const checkEmailInSalesforce = (email) => {

    return getAccessToken().then(data=>{
        const accessToken = data

        var sfConnection = new jsforce.Connection();

        sfConnection.initialize({
        instanceUrl: 'https://cs36.salesforce.com/ ',
        accessToken: accessToken
        });
    })
}

export default checkEmailInSalesforce