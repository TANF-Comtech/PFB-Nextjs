import React from "react";
import Wrapper from "../components/global/wrapper";
import { getAccessToken } from "../lib/salesforce/accessToken";
import { salesforceInstanceURL } from "../lib/salesforce/checkEmailInSalesforce";

export default function CorporateMembers({ data }) {
  const { memberData } = data;

  return <Wrapper></Wrapper>;
}

// getStaticPaths requires a the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticProps() {
  getAccessToken().then((data) => {
    const accessToken = data;
    var sfConnection = new jsforce.Connection({
      instanceUrl: salesforceInstanceURL,
      version: "49.0",
      accessToken: accessToken,
    });
  });

  return {
    props: {
      data: "hello",
    },
  };
}
