const checkEmailInSalesForce = async (email) => {
    setLoginLoading(true)
    const response = await fetch (`/api/auth/member_center/login`,{
      method:'POST',
      mode:'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})

    })
    return response.json()
  }

  const sendAuth0Code = async (email) => {
    setLoginLoading(true)
    const response = await fetch (`/api/auth/member_center/login`,{
      method:'POST',
      mode:'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})

    })
    return response.json()
  }


export default (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email
        checkEmailInSalesForce(email).then(data=>{
            if(data.inSalesForce){
                sendAuth0Code(email).then(data=>{
                    res.status(200).json({status:true}) //will tweak
                })
            }
        })
    }
  }
  