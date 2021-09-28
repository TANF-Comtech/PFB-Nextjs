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
import { memberFormatter } from "../lib/algolia/memberFormatter";

export default function CorporateMembers() {
  const Hits = ({ hits }) => {
    <Grid>
      {hits.map((hit) => {
        return <CorporateMember key={hit.objectId} hit={hit} />;
      })}
    </Grid>;
  };

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
  const sfConnection = new jsforce.Connection({
    oauth2: {
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI,
    },
    instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
    accessToken: process.env.SALESFORCE_OAUTH2_TOKEN,
    refreshToken: process.env.SALESFORCE_REFRESH_TOKEN,
  });

  sfConnection.oauth2.refreshToken(
    process.env.SALESFORCE_REFRESH_TOKEN,
    (err, results) => {
      if (err) return err;
      new jsforce.Connection({
        instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
        accessToken: results.access_token,
      });
    }
  );

  const fetchedData = await sfConnection.query(
    "SELECT Id, Name, Website  FROM Account WHERE Coalition_Member__c = true",
    function (result, err) {
      if (err) {
        return err;
      }

      return result;
    }
  );

  const memberData = fetchedData.records.map((record) => record);

  const algoliaFormattedData = memberFormatter(memberData);
  await AlgoliaIndex("PFB_COALITION_MEMBERS").saveObjects(algoliaFormattedData);

  return {
    props: {
      page: null,
    },
  };
}
