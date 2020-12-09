import checkEmailInSalesforce from '../../../../lib/salesforce/checkEmailInSalesforce'
import sendPasswordlessAuthCode from '../../../../lib/auth0/sendPasswordlessAuthCode'

export default (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email
        return checkEmailInSalesforce(email).then(data=>{
            console.log("Data From CheckEmail", data)
            if(data.inSalesForce){
                sendPasswordlessAuthCode(email).then(data=>{
                    res.status(200).json({status:true}) //will tweak
                })
            }
            else{
                res.status(401).json({error:"You are not a member"})
            }
        })
    }
  }
  