import React from "react";
import Wrapper from "../components/global/wrapper";

import Grid from "../components/global/grid";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from "../components/content/big-title-banner";
import MainContent from "../components/global/main-content";

import { AlgoliaIndex, AlgoliaReactClient } from "../lib/algolia/algoliaClient";
import { InstantSearch, connectHits } from "react-instantsearch-dom";
import { CustomSearchBox } from "../components/global/search";

import * as jsforce from "jsforce";
import memberFormatter from "../lib/algolia/memberFormatter";

export default function CorporateMembers() {
  const Hits = ({ hits }) => (
    <Grid>
      {hits.map((hit) => {
        <CorporateMember key={hit.objectID} name={hit.company} url={hit.url} />;
      })}
    </Grid>
  );

  const CustomHits = connectHits(Hits);

  return (
    <Wrapper isWide={true}>
      <BigTitleBanner>
        <h1>Coalition</h1>
      </BigTitleBanner>
      <MainContent>
        <InstantSearch
          searchClient={AlgoliaReactClient}
          indexName="PFB_COALITION_MEMBERS"
        >
          <CustomSearchBox
            width={"50%"}
            translations={{
              placeholder: "SEARCH BY NAME",
            }}
          />
          <CustomHits />
        </InstantSearch>
      </MainContent>
    </Wrapper>
  );
}

export async function getStaticProps() {

  // var sfConnection = new jsforce.Connection({
  //   loginUrl: "https://login.salesforce.com/",
  // });

  //  sfConnection.login(
  //   "yousef@thor-studio.com",
  //   "A?&qzF5qzM8Q59kLkLM&RxQHPBrk" + "ZCPwW1gePmKbxRUEZkO3sgYB3",
  //   function (err) {
  //     if (err) {
  //       return console.error(err);
  //     }
  //   }
  //  );

  new jsforce.Connection({
    oauth2: {
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI,
    },
    instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
    accessToken: process.env.SALESFORCE_OAUTH2_TOKEN,
    refreshToken: "<your Salesforce OAuth2 refresh token is here>",
  });
  conn.on("refresh", function (accessToken, res) {
    // Refresh event will be fired when renewed access token
    // to store it in your storage for next request
  });

  // Alternatively, you can use the callback style request to fetch the refresh token
  conn.oauth2.refreshToken(refreshToken, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
  
     const memberData = await sfConnection.query(
       "SELECT Id, Name, Website  FROM Account WHERE Coalition_Member__c = true",
       function (result, err) {
         if (err) {
           return err;
         }

         return result.records.map((record) => record);
       }
     );

console.log(memberData)
  // await AlgoliaIndex("PFB_COALITION_MEMBERS").saveObjects(memberData);

  return {
    props: {
      page: null,
    },
  };
}
