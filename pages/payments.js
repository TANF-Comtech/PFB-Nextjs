import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Wrapper from "../components/global/wrapper";
import styled from "styled-components";

const RevInp = styled.input`
  width: 40vw;
  margin-right: 10px;
`;

const CalcWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid gray;
  border-bottom: 0.5px solid gray;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Checkout = styled.button`
  min-height: fit-content;
`;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default function Payments() {
  const [price, setPrice] = useState();
  const [revenue, setRevenue] = useState(null);
  const [memberDues, setMemberDues] = useState();

  const handleRevenue = (e) => {
    e.preventDefault();
    setRevenue(e.target.value);
  };

  useEffect(() => {
    if (revenue < 1000000) {
      setPrice(1000);
    } else if (revenue >= 1000000) setPrice((revenue / 1000000) * 1250);
  }, [revenue]);

  const handleSubCalc = () => {
    setMemberDues(price.toFixed(2));
  };

  // handles the call to the Stripe Checkout
  const handleClick = async (e) => {
    // Calls your backend to create the Checkout session.
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantity: 1, amount: memberDues * 100 }),
    }).then((res) => res.json());

    //  When the custome clicks on the button, redirect them to C heckout.
    const stripe = stripePromise;
    const { error } = await (await stripe).redirectToCheckout({
      sessionId,
    });
  };

  return (
    <Wrapper postTitle="People for Bikes Homepage" isWide={false}>
      <h1>Join the Coalition</h1>
      <p>
        Dues are calculated on annual sales revenue:
        <br />
        $1250 for every $1 million in U.S. bicycle related sales<sup>*</sup>
      </p>
      <CalcWrapper>
        <InputWrapper>
          <RevInp
            placeholder="$ Annual U.S. Bicycle-related sales"
            onChange={handleRevenue}
          />
          <p style={{ margin: 0 }}> x 1250</p>
        </InputWrapper>
        <button onClick={handleSubCalc}>
          <h5>CALCULATE</h5>
        </button>
      </CalcWrapper>
      {memberDues && (
        <h2>${memberDues.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
      )}
      {memberDues === 1000 && (
        <>
          <p>
            You qualify for our minimum dues amount. Your dues may be paid by
            clicking on the checkout button below.
          </p>
          <span>
            <Checkout type="button" role="link" onClick={handleClick}>
              <h5>CHECKOUT</h5>
            </Checkout>
          </span>
        </>
      )}
      {memberDues <= 3000 && memberDues !== 1000 && (
        <>
          <p>Your dues may be paid by clicking on the checkout button below.</p>
          <span>
            <Checkout type="button" role="link" onClick={handleClick}>
              <h5>CHECKOUT</h5>
            </Checkout>
          </span>
        </>
      )}
      {memberDues > 3000 && (
        <p>
          Please email{" "}
          <a
            style={{ color: "inherit" }}
            href="mailto:kerri@peopleforbikes.org?subject=Membership Dues"
          >
            Kerri Salazar
          </a>{" "}
          to make your payment.
        </p>
      )}
    </Wrapper>
  );
}
