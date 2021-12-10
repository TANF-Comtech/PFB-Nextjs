import Cookies from 'cookies'
import checkEmailInSalesforce from '../../../../lib/salesforce/checkEmailInSalesforce'
import sendAuthCode from '../../../../lib/auth0/sendAuthCode'
import loginAuth0 from '../../../../lib/auth0/loginAuth0'

const cookieLifeTimeHours = process.env.AUTH0_TOKEN_LIFETIME_HOURS

export default (req, res) => {
    
  if (req.method === 'POST') {
    const email = req.body?.email
    const code  = req.body?.code
    
    // if submitting email (step 1)
    if (code == null && email) {
      
      // Allow PFB and THOR emails to slip by Salesforce lookup check, just get Auth0 verification
      if (email.endsWith("@peopleforbikes.org") || email.endsWith("@thor-studio.com")) {
        return sendAuthCode(email).then( auth0Data => { 
          //dont use auth0Data here
          res.status(200).json({status:true})
        }).catch(auth0Data=>{
          console.log(auth0Data)
          res.status(401).json({
            status: false,
            error:"Authentication service error. Please reach out to Kerri at kerri@peopleforbikes.org if this persists"
          })  
        })
      }
      
      // All other emails much pass through the Salesforce check
      else {
        return checkEmailInSalesforce(email).then(salesforceData=> {
          if(salesforceData.status) {
            sendAuthCode(email).then(auth0Data => { 
              //dont use auth0Data here
              res.status(200).json(salesforceData)
            }).catch(auth0Data=>{
              res.status(401).json({
                status:false,
                error:"Service Error - Service Unavailable! Please Try Again Soon."
              })  
            })
          }
          else{
            res.status(401).json(salesforceData)
          }
        })
      }
    }

     // if submitting code (step 2)
    else if (code && email) {
      return loginAuth0(code,email).then(data => {
        if(data.id_token) {
          const cookies = new Cookies(req, res)
          cookies.set('auth-token', data.id_token, {
            httpOnly: true,
            sameSite:true,
            expires: new Date(new Date().getTime() + 60 * 60 * cookieLifeTimeHours * 1000)
          })        
          res.status(200).json({status:true})
        }
        else {
          res.status(401).json({status:false, error:"Incorrect code or code timed out!"}) 
        }
      }).catch(error => {
        res.status(401).json({status:false, error:"Incorrect code or code timed out!"}) 
      })
    }
    
    else{
      res.status(401).json({status:false, error:"Unauthorized"}) 
    }
  }
}
  