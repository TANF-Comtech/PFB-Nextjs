import React from "react";
import Wrapper from "../components/global/wrapper";

import Grid from "../components/global/grid";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from "../components/content/big-title-banner";
import MainContent from "../components/global/main-content";
import styled from 'styled-components'

import { AlgoliaIndex, AlgoliaReactClient } from "../lib/algolia/algoliaClient";
import { InstantSearch, connectHits, RefinementList } from "react-instantsearch-dom";
import { CustomSearchBox } from "../components/global/search";
import  { FilterMenu } from "../components/global/filter";

import * as jsforce from "jsforce";
import { memberFormatter } from "../lib/algolia/memberFormatter";

const HitsAndFilters = styled.section`
  display: flex;
`

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1vw;
`

const AlgoliaContainer = styled.div`
  display: flex;
`

export default function CorporateMembers() {

  const Hits = ({ hits }) => {
    return(
    <Grid>
      {hits.map((hit) => {
        return <CorporateMember key={hit.objectId} hit={hit} />;
      })}
      </Grid>
    )
  };

  const CustomHits = connectHits(Hits);

  return (
    <Wrapper isWide={true}>
      <BigTitleBanner>
        <h1>Coalition</h1>
      </BigTitleBanner>
      <AlgoliaContainer>
        <InstantSearch
          searchClient={AlgoliaReactClient}
          indexName="PFB_COALITION_MEMBERS"
        >
          <HitsAndFilters>
            <FilterContainer>
              <h3 style={{marginBottom: "10px"}}>Letter</h3>
              <FilterMenu attribute="Letter" limit={5} showMore />
            </FilterContainer>
          </HitsAndFilters>
          <MainContent>
            <CustomSearchBox
              width={"50%"}
              translations={{
                placeholder: "SEARCH BY NAME",
              }}
            />
            <CustomHits />
          </MainContent>
        </InstantSearch>
      </AlgoliaContainer>
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
