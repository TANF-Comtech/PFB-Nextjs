import React from "react";
import Wrapper from "../components/global/wrapper";
import { getAccessToken } from "../lib/salesforce/accessToken";
import { salesforceInstanceURL } from "../lib/salesforce/checkEmailInSalesforce";
import * as jsforce from "jsforce";
import Grid from "../components/global/grid";
import { dummyMembers } from "../components/dummydata";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from '../components/content/big-title-banner'
import MainContent from '../components/global/main-content'
import { AlgoliaIndex, AlgoliaReactClient } from '../lib/algolia/algoliaClient'
import {InstantSearch, Hits, SearchBox, RefinementList, Pagination} from 'react-instantsearch-dom'

export default function CorporateMembers({ data }) {


  return (
    <Wrapper isWide={true}>
      <BigTitleBanner>
        <h1>Coalition</h1>
      </BigTitleBanner>
      <InstantSearch
        searchClient={AlgoliaReactClient}
        indexName="MAINSITE"
      >
        <SearchBox />
        <Hits hitComponent={} />
      </InstantSearch>

      <MainContent>
        <Grid>
          {dummyMembers.map((member) => {
            if (member.duesPaid) {
              return <CorporateMember name={member.company} url={member.url} />;
            }
          })}
        </Grid>
      </MainContent>
      {/* {data} */}
    </Wrapper>
  );
}


export async function getStaticProps() {
  let pageData;

  getAccessToken().then((data) => {
    const accessToken = data;
    const sfConnection = new jsforce.Connection({
      instanceUrl: salesforceInstanceURL,
      version: "49.0",
      accessToken: accessToken,
    });
    sfConnection.query(`SELECT * FROM Account`).then(function (res) {
      pageData = res;
    });
  });

  const algoliaMemberData = dummyMembers
  await AlgoliaIndex("PFB_COALITION_MEMBERS").saveObjects(algoliaMemberData);

  return {
    props: {
      data: pageData ?? null,
    },
  };
}
