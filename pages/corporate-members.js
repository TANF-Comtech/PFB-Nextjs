import React from "react";
import Wrapper from "../components/global/wrapper";
import { getAccessToken } from "../lib/salesforce/accessToken";
import { salesforceInstanceURL } from "../lib/salesforce/checkEmailInSalesforce";
import * as jsforce from "jsforce";

export default function CorporateMembers({ data }) {
  console.log(data);

  return <Wrapper> {data}</Wrapper>;
}

// getStaticPaths requires a the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticProps() {
  let sfCall;

  getAccessToken().then((data) => {
    const accessToken = data;
    const sfConnection = new jsforce.Connection({
      instanceUrl: salesforceInstanceURL,
      version: "49.0",
      accessToken: accessToken,
    });
    sfConnection.query(`SELECT * FROM Account`).then(function (res) {
      console.log(res);
    });
  });

  return {
    props: {
      data: sfCall ?? "Not Working",
    },
  };
}
