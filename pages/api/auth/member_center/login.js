import checkEmailInSalesforce from '../../../../lib/salesforce/checkEmailInSalesforce'
import sendPasswordlessAuthCode from '../../../../lib/auth0/sendPasswordlessAuthCode'
import loginAuth0 from '../../../../lib/auth0/loginAuth0'

export default (req, res) => {
    if (req.method === 'POST') {
        const email = req.body?.email
        const code  = req.body?.code
        if(!code && email){
            return checkEmailInSalesforce(email).then(data=>{
                console.log("Data From CheckEmail", data)
                if(data.inSalesForce){
                    sendPasswordlessAuthCode(email)
                    res.status(200).json({status:true})
                }
                else{
                    res.status(401).json({error:"You are not a member"})
                }
            })
        }
      else{
        if(code && email){
            return loginAuth0(code,email)
            }
        }
      }
}
  