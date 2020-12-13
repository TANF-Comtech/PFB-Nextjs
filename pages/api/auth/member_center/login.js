import Cookies from 'cookies'
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
            const id_token = loginAuth0(code,email)
            const cookies = new Cookies(req, res)
            cookies.set('auth-token', id_token, {
                httpOnly: true,
                sameSite: 'lax'
            })        
            res.status(200).json({status:true})
        }
        }
      }
}
  