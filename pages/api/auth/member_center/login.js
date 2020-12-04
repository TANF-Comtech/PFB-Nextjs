import checkEmailInSalesforce from '../../../../lib/salesforce/checkEmailInSalesforce'
import sendPasswordlessAuthCode from '../../../../lib/auth0/sendPasswordlessAuthCode'

export default (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email
        checkEmailInSalesforce(email).then(data=>{
            if(data.inSalesForce){
                sendPasswordlessAuthCode(email).then(data=>{
                    res.status(200).json({status:true}) //will tweak
                })
            }
        })
    }
  }
  