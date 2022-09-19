import Cookies from 'cookies';

import checkEmailInSalesforce from '~/lib/salesforce/checkEmailInSalesforce';
import sendAuthCode from '~/lib/auth0/sendAuthCode';
import loginAuth0 from '~/lib/auth0/loginAuth0';

const cookieLifeTimeHours = process.env.AUTH0_TOKEN_LIFETIME_HOURS;

const getPhoneNumber = (rawPhone = '') => {
  if (!rawPhone) return ``;

  const trimmedPhone = rawPhone.replace(/-|\s/g, '').trim();

  if (trimmedPhone.startsWith('+1')) {
    return `${trimmedPhone}`;
  } else if (trimmedPhone.startsWith('1')) {
    return `+${trimmedPhone}`;
  } else if (trimmedPhone.length === 10) {
    return `+1${trimmedPhone}`;
  } else {
    return ``;
  }
};

const login = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body?.email;
    const phone = getPhoneNumber(req.body?.phone);
    const code = req.body?.code;

    // if submitting email (step 1)
    if (code == null && email) {
      // Allow PFB and THOR emails to slip by Salesforce lookup check, just get Auth0 verification
      if (email.endsWith('@peopleforbikes.org') || email.endsWith('@thor-studio.com')) {
        return sendAuthCode(email, phone)
          .then((auth0Data) => {
            //dont use auth0Data here
            res.status(200).json({ status: true });
          })
          .catch((auth0Data) => {
            console.log(auth0Data);
            res.status(401).json({
              status: false,
              error:
                'Authentication service error. Please reach out to Kerri at kerri@peopleforbikes.org if this persists.',
            });
          });
      }

      // All other emails much pass through the Salesforce check
      else {
        return checkEmailInSalesforce(email).then((salesforceData) => {
          if (salesforceData.status) {
            sendAuthCode(email, phone)
              .then((auth0Data) => {
                //dont use auth0Data here
                res.status(200).json(salesforceData);
              })
              .catch((auth0Data) => {
                res.status(401).json({
                  status: false,
                  error:
                    'We could not verify your email address in our database. Try submitting it again. If this error persists, contact kerri@peopleforbikes.org and we will investigate further.',
                });
              });
          } else {
            res.status(401).json(salesforceData);
          }
        });
      }
    }

    // if submitting code (step 2)
    else if (code && email) {
      return loginAuth0(code, email, phone)
        .then((data) => {
          if (data.id_token) {
            const cookies = new Cookies(req, res);
            cookies.set('auth-token', data.id_token, {
              httpOnly: true,
              sameSite: true,
              expires: new Date(new Date().getTime() + 60 * 60 * cookieLifeTimeHours * 1000),
            });
            res.status(200).json({ status: true });
          } else {
            res.status(401).json({
              status: false,
              error:
                'The code you entered was incorrect. Double-check the code and try again. If you continue to see this error, it is likely that your code expired. Reload this page to generate a new code.',
            });
          }
        })
        .catch((error) => {
          res.status(401).json({
            status: false,
            error:
              'The code you entered was incorrect. Double-check the code and try again. If you continue to see this error, it is likely that your code expired. Reload this page to generate a new code.',
          });
        });
    } else {
      res
        .status(401)
        .json({
          status: false,
          error:
            'Your email address is not authorized to use the Member Center. Contact kerri@peopleforbikes.org if you believe this is an error.',
        });
    }
  }
};

export default login;
