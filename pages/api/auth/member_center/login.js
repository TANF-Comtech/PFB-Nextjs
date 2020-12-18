import Cookies from 'cookies'
import checkEmailInSalesforce from '../../../../lib/salesforce/checkEmailInSalesforce'
import sendAuthCode from '../../../../lib/auth0/sendAuthCode'
import loginAuth0 from '../../../../lib/auth0/loginAuth0'

export default (req, res) => {
    if (req.method === 'POST') {
        const email = req.body?.email
        const code  = req.body?.code
        // if submitting email (step 1)
    if(code == null && email){
            return checkEmailInSalesforce(email).then(data=>{
                console.log("Data From CheckEmail", data)
                if(data.status){
                    sendAuthCode(email)
                    //do something to the salesforce data - store in a cookie/token?
                    res.status(200).json(data)
                }
                else{
                    res.status(401).json(data)
                }
            })
    }
     // if submitting code (step 2)
    else if (code && email){
            return loginAuth0(code,email).then(data=>{
                if(data.id_token){
                    const cookies = new Cookies(req, res)
                    cookies.set('auth-token', data.id_token, {
                        httpOnly: true,
                        sameSite: 'lax',
                        //cookie lasts 24 hours - as long as the token from Auth0 lasts
                        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
                    })        
                    res.status(200).json({status:true})
                }
                else{
                    res.status(401).json({status:false, error:"Incorrect code!"}) 
                }
                
            }).catch(error=>{
                res.status(401).json({status:false, error:"Incorrect code!"}) 
            })
        }
    else{
        res.status(401).json({status:false, error:"Unauthorized"}) 
    }
    }
}
  