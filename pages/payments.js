import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import Wrapper from '../components/global/wrapper';
import styled, { ThemeContext } from 'styled-components';

import SiteMetaCustom from '../components/meta/site-meta-custom';
import MainContent from '../components/global/main-content';

const RevInp = styled.input`
  min-width: 20vw;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: right;
  font-family: monospace;
`;

const CalcWrapper = styled.span`
  align-items: center;
  border-top: 0.5px solid gray;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5vh 0;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CalcButton = styled.button`
  font-family: ${(props) => props.theme.montserrat};
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;

  @media (max-width: ${(props) => props.theme.sm}) {
    margin-top: 15px;
  }
`;

const Checkout = styled.button`
  font-family: ${(props) => props.theme.montserrat};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4vh;
  min-height: fit-content;
  padding: 10px 20px;
  transition: 0.2 ease-in-out;
`;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const addCommas = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const removeCommas = (value) => value.replace(/,/g, '');
const removeNonNumericCharacters = (value) => value.replace(/[^0-9]/g, '');

export default function Payments() {
  const themeProps = useContext(ThemeContext);

  const [price, setPrice] = useState(1000);
  const [revenue, setRevenue] = useState('');
  const [memberDues, setMemberDues] = useState();

  const handleRevenue = (e) => {
    e.preventDefault();
    const maskedRevenue = addCommas(removeNonNumericCharacters(e.currentTarget.value));
    setRevenue(maskedRevenue);
  };

  useEffect(() => {
    const rawRevenue = parseInt(removeCommas(revenue), 10);

    if (rawRevenue < 1000000) {
      setPrice(1000);
    } else if (rawRevenue >= 1000000) setPrice((rawRevenue / 1000000) * 1250);
  }, [revenue]);

  const handleSubCalc = () => {
    setMemberDues(price.toFixed(2));
  };

  // handles the call to the Stripe Checkout
  const handleClick = async (e) => {
    // Calls your backend to create the Checkout session.
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1, amount: memberDues * 100 }),
    }).then((res) => res.json());

    //  When the customer clicks on the button, redirect them to checkout.
    const stripe = stripePromise;
    const { error } = await (
      await stripe
    ).redirectToCheckout({
      sessionId,
    });
  };

  return (
    <>
      <SiteMetaCustom
        desc="PeopleForBikes corporate dues payments can be accepted through this facility up to $3000/year. Click to learn more."
        title="Dues Payment | PeopleForBikes Corporate Member Center"
        path="https://www.peopleforbikes.org/payments"
      />
      <Wrapper postTitle="Corporate Members Dues Payments" isWide={false}>
        <h2>Corporate Members Dues Payment</h2>
        <p>Annual dues are calculated based on your company&apos;s annual sales revenue.</p>
        <ul>
          <li>
            Organizations with $1 million or more in US bike related annual sales will pay{' '}
            <strong>$1250 per $1M</strong>
          </li>
          <li>
            Organizations with less than $1 million in annual sales will pay{' '}
            <strong>$1000 for an annual membership</strong>.
          </li>
        </ul>
        <p>You can determine your PeopleForBikes membership dues with our handy calculator:</p>
        <CalcWrapper>
          <InputWrapper>
            <p style={{ margin: 0 }}>$&nbsp;</p>
            <RevInp placeholder="Annual Sales" value={revenue} onChange={handleRevenue} />
            <p style={{ margin: 0 }}>&nbsp;/&nbsp;&nbsp;$1,000,000 x 1250</p>
          </InputWrapper>
          <CalcButton onClick={handleSubCalc}>CALCULATE</CalcButton>
        </CalcWrapper>
        {memberDues && (
          <>
            <p>Estimated Dues Based on Your Sales:</p>
            <h2>
              $
              {Math.round(memberDues)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </h2>
          </>
        )}
        {memberDues <= 3000 && (
          <>
            <p>Your dues may be paid by clicking on the checkout button below.</p>
            <Checkout type="button" role="link" onClick={handleClick}>
              CHECKOUT
            </Checkout>
            <MainContent bgColor={themeProps.midnightBlue} contentPadding="6vh 4vw">
              <h2 style={{ color: 'white' }}>Why Your Dues Matter</h2>
              <p style={{ color: 'white' }}>
                The PeopleForBikes Coalition is the business voice of bicycling in the U.S.,
                extending the resources, reach and influence of bike companies nationwide. When you
                join the Coalition, you add your weight to the collective strength of hundreds of
                other bike businesses. With proven success and leadership in and outside of the
                industry, you can count on PeopleForBikes to optimize your membership dollars by
                strategically investing in a bigger, brighter future for bicycling.
              </p>
              <h3>
                <Link href="/mission">
                  <a>Learn More About Our Mission</a>
                </Link>
              </h3>
            </MainContent>
          </>
        )}
        {memberDues > 3000 && (
          <>
            <p>
              Please email{' '}
              <a
                style={{ color: themeProps.blue }}
                href="mailto:kerri@peopleforbikes.org?subject=Membership Dues"
              >
                Kerri Salazar
              </a>{' '}
              to make your payment.
            </p>
            <MainContent bgColor={themeProps.midnightBlue} contentPadding="6vh 4vw">
              <h2 style={{ color: 'white' }}>Why Your Dues Matter</h2>
              <p style={{ color: 'white' }}>
                The PeopleForBikes Coalition is the business voice of bicycling in the U.S.,
                extending the resources, reach and influence of bike companies nationwide. When you
                join the Coalition, you add your weight to the collective strength of hundreds of
                other bike businesses. With proven success and leadership in and outside of the
                industry, you can count on PeopleForBikes to optimize your membership dollars by
                strategically investing in a bigger, brighter future for bicycling.
              </p>
              <h3>
                <Link href="/mission">
                  <a>Learn More About Our Mission</a>
                </Link>
              </h3>
            </MainContent>
          </>
        )}
      </Wrapper>
    </>
  );
}
