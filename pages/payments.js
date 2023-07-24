import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import styled, { ThemeContext } from 'styled-components';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import Wrapper from '~/components/wrapper';

const RevInp = styled.input`
  min-width: 20vw !important;
  margin-right: 10px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
  text-align: right !important;
  font-family: monospace !important;
  border: 1px solid black !important;
  border-radius: 3px !important;
`;

const CalcWrapper = styled.span`
  align-items: center !important;
  border-top: 0.5px solid gray !important;
  border-bottom: 0.5px solid gray !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  padding: 5vh 0 !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: center !important;
    flex-direction: row !important;
    justify-content: space-between !important;
  }
`;

const InputWrapper = styled.div`
  align-items: center !important;
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
`;

const PaymentButton = styled.button`
  background-color: ${(props) => props.theme.blue} !important;
  color: #fff !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-size: 18px !important;
  font-weight: bold !important;
  padding: 10px 20px !important;

  @media (max-width: ${(props) => props.theme.sm}) {
    margin-top: 15px !important;
  }
`;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const addCommas = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const removeCommas = (value) => value.replace(/,/g, '');
const removeNonNumericCharacters = (value) => value.replace(/[^0-9]/g, '');

export default function Payments() {
  const themeProps = useContext(ThemeContext);

  const [company, setCompany] = useState('');
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
      body: JSON.stringify({ quantity: 1, amount: memberDues * 100, company: company || 'N/A' }),
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
    <LegacyPage>
      <SiteMetaCustom
        desc="PeopleForBikes corporate dues payments can be accepted through this facility up to $3000/year. Click to learn more."
        title="Dues Payment | PeopleForBikes Corporate Member Center"
        path="https://www.peopleforbikes.org/payments"
      />
      <Wrapper postTitle="Corporate Members Dues Payments" isWide={false}>
        <h2>Corporate Members Dues Payment</h2>
        <p>Annual dues are calculated based on your company&apos;s annual sales revenue.</p>
        <ul>
          <li style={{ listStyleType: 'disc' }}>
            Organizations with $1 million or more in US bike related annual sales will pay{' '}
            <strong>$1250 per $1M</strong>
          </li>
          <li style={{ listStyleType: 'disc' }}>
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
          <PaymentButton onClick={handleSubCalc}>CALCULATE</PaymentButton>
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
            <p>
              Your dues may be paid by entering your company name and clicking on the checkout
              button below.
            </p>
            <div className="mb-10 flex flex-col gap-5">
              <div>
                <div className="font-bold">Company</div>
                <input
                  value={company}
                  placeholder="company name..."
                  onChange={(event) => setCompany(event.currentTarget.value)}
                  className="inline-block w-[15rem] rounded border p-1"
                />
              </div>
              <div>
                <PaymentButton type="button" role="link" onClick={handleClick}>
                  CHECKOUT
                </PaymentButton>
              </div>
            </div>
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
    </LegacyPage>
  );
}
