import React from "react";
import Wrapper from "../components/global/wrapper";

import Grid from "../components/global/grid";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from "../components/content/big-title-banner";
import MainContent from "../components/global/main-content";
import styled from "styled-components";

import { AlgoliaIndex, AlgoliaReactClient } from "../lib/algolia/algoliaClient";
import { InstantSearch, connectHits } from "react-instantsearch-dom";
import { CustomSearchBox } from "../components/global/search";
import { FilterMenu } from "../components/global/filter";

import * as jsforce from "jsforce";
import { memberFormatter } from "../lib/algolia/memberFormatter";

const HitsAndFilters = styled.section`
  display: flex;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1vw;
`;

const AlgoliaContainer = styled.div`
  display: flex;
`;

export default function CorporateMembers() {
  const Hits = ({ hits }) => {
    return (
      <Grid>
        {hits.map((hit) => {
          return <CorporateMember key={hit.objectId} hit={hit} />;
        })}
      </Grid>
    );
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
              <h3 style={{ marginBottom: "10px" }}>Letter</h3>
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
  let accessToken = process.env.SALESFORCE_OAUTH2_TOKEN;
  let refreshToken = process.env.SALESFORCE_REFRESH_TOKEN;
  let CurrentDate = new Date();


  const MemberDate = (date) => {
    date.setMonth(date.getMonth() - 6);
    return date.toISOString().split("T")[0];
  };

  let MinSixMonths = MemberDate(CurrentDate);


  const sfConnection = new jsforce.Connection({
    loginUrl: process.env.SALESFORCE_AUTH_URL,
    oauth2: {
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI,
    },
    instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  sfConnection.login(
    process.env.SALESFORCE_AUTH_USER2,
    process.env.SALESFORCE_AUTH_PASS,
    function (err, userInfo) {
      if (err) {
        return console.error(err);
      }
      accessToken = sfConnection.accessToken;
      refreshToken = sfConnection.refreshToken;
    }
  );

  sfConnection.on("refresh", (newAccessToken, res) => {
    console.log("Access token refreshed");
    accessToken = newAccessToken;
  });

  const fetchedData = await sfConnection.query(
    `SELECT Id,Published_Name__c,Website FROM Account WHERE Do_not_publish_membership__c = false AND (Last_Membership_End_Date__c >= ${MinSixMonths} OR Last_Membership_End_Date_Child__c >= ${MinSixMonths})`,
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
