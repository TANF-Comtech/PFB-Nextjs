import React from "react";
import Wrapper from "../components/global/wrapper";

import Grid from "../components/global/grid";
import { dummyMembers } from "../components/dummydata";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from "../components/content/big-title-banner";
import MainContent from "../components/global/main-content";
// import {getAccessToken} from '../lib/salesforce/accessToken'

import { AlgoliaIndex, AlgoliaReactClient } from "../lib/algolia/algoliaClient";
import { InstantSearch, connectHits } from "react-instantsearch-dom";
import { CustomSearchBox } from "../components/global/search";

import * as jsforce from "jsforce";

export default function CorporateMembers({ pageData }) {
  console.log(pageData);

  const Hits = ({ hits }) => (
    <Grid>
      {hits.map((hit) => {
        if (hit.duesPaid) {
          return (
            <CorporateMember
              key={hit.objectID}
              name={hit.company}
              url={hit.url}
            />
          );
        }
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
      {/* {data} */}
    </Wrapper>
  );
}

export async function getStaticProps() {
  let pageData;

  const sfConnection = new jsforce.Connection({
    instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
    accessToken: process.env.SALESFORCE_ACCESS_TOKEN,
  });

  sfConnection.query("SELECT Id, Name  FROM Account", function (err, result) {
    if (err) {
      return console.error(err);
    }

    console.log(result.records.map((record) => record));
    pageData = result;
  });

  const algoliaMemberData = dummyMembers;
  await AlgoliaIndex("PFB_COALITION_MEMBERS").saveObjects(algoliaMemberData);

  return {
    props: {
      page: pageData ?? null,
    },
  };
}
