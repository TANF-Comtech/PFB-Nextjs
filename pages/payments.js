import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Wrapper from '../components/global/wrapper'



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default function Payments() {
  const [price, setPrice] = useState()
  const [revenue, setRevenue] = useState(null)
  const [memberDues, setMemberDues] = useState('')

const handleRevenue = (e) => {
  e.preventDefault();
  setRevenue(e.target.value)
}

useEffect(() => {
  if(revenue < 1000000){
    setPrice(1000)
  } else if( revenue >= 1000000)
  setPrice((revenue/1000000) * (1250))
}, [revenue])


const handleSubCalc = () => {
  
    setMemberDues(`Your Annual dues are $${price}`)
}

// handles the call to the Stripe Checkout 
  const handleClick = async(e) => {
    // Calls your backend to create the Checkout session.
    const {sessionId} = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({quantity: 1, amount: (price * 100)})
    }).then(res => res.json());
    
    //  When the custome clicks on the button, redirect them to C heckout.
    const stripe = stripePromise;
    const {error} = await (await stripe).redirectToCheckout({
      sessionId,
    })
  }
 
  return (
    <Wrapper  
    postTitle="People for Bikes Homepage"
    isWide={false}
    >
      <h1>Join the Coalition</h1>
      <p>Dues are calculated on annual sales revenue:<br/>$1250 for every $1 million in U.S. bicycle related sales<sup>*</sup></p>
      <input placeholder='$ Annual U.S. Bicycle-related sales' onChange={handleRevenue} /><p> x 1250</p>
      <button onClick={handleSubCalc}>
        Calculate
      </button>
      {memberDues}
      <br/>
        <button type="button" role='link' onClick={handleClick}>
          Checkout
        </button>
    </Wrapper>
  );
}