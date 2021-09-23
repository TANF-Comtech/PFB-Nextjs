import React from "react";
import Wrapper from "../components/global/wrapper";
import { getAccessToken } from "../lib/salesforce/accessToken";
import { salesforceInstanceURL } from "../lib/salesforce/checkEmailInSalesforce";
import * as jsforce from "jsforce";
import Grid from "../components/global/grid";
import { dummyMembers } from "../components/dummydata";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from "../components/content/big-title-banner";
import MainContent from "../components/global/main-content";
import { AlgoliaIndex, AlgoliaReactClient } from "../lib/algolia/algoliaClient";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import { CustomSearchBox } from '../components/global/search'


export default function CorporateMembers({ data }) {
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
          {/* <Grid> */}
          <CustomHits />
          {/* </Grid> */}
        </InstantSearch>
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

  const algoliaMemberData = dummyMembers;
  await AlgoliaIndex("PFB_COALITION_MEMBERS").saveObjects(algoliaMemberData);

  return {
    props: {
      data: pageData ?? null,
    },
  };
}
