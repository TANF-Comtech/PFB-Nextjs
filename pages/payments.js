import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Wrapper from '../components/global/wrapper'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default function Payments() {

  const handleClick = async(e) => {
    // Calls your backend to create the Checkout session.
    const {sessionId} = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({quantity: 1, amount: 1099})
    }).then(res => res.json());
    
    //  When the custome clicks on the button, redirect them to C heckout.
    const stripe = stripePromise;
    const {error} = await (await stripe).redirectToCheckout({
      sessionId,
    })
  }
 
  return (
    <Wrapper>
    <form >
        <button role='link' onClick={handleClick}>
          Checkout
        </button>
    </form>
    </Wrapper>
  );
}