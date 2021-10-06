import React from "react";
import styled from "styled-components";
import { InstantSearch, 
         connectHits, 
         RefinementList } from "react-instantsearch-dom";
import * as jsforce from "jsforce";

import { AlgoliaIndex, AlgoliaReactClient, } from "../lib/algolia/algoliaClient";
import { memberFormatter } from "../lib/algolia/memberFormatter";

import Wrapper from "../components/global/wrapper";
import Grid from "../components/global/grid";
import CorporateMember from "../components/global/member-box";
import BigTitleBanner from "../components/content/big-title-banner";
import MainContent from "../components/global/main-content";
import Heading1 from "../components/primitives/h1"
import CustomSearchBox from "../components/global/search-box";
import SiteMetaCustom from '../components/meta/site-meta-custom'
import Button from '../components/primitives/button'

const HitsAndFilters = styled.section`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 10px 0;

  h3 {
    font-size: 16px;
    margin: 0;
    text-transform: uppercase;
  }
`;

const FilterMenu = styled(RefinementList)`
  color: ${props=> props.theme.darkGray};
  
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 8px 0;
  }

  label {
    align-items: center;
    display: flex;
    margin: 0;
  }

  span {
    color: ${ props => props.theme.blue };
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    margin: 0 5px;
    text-transform: uppercase;

    &:hover {
      text-decoration: underline;
    }
  }

  li[class="ais-RefinementList-item ais-RefinementList-item--selected"] {
    color: ${ props => props.theme.blue };
    text-decoration: underline !important;
  }

  // hides checkbox and count
  input[class="ais-RefinementList-checkbox"] {
    display: none;
  }
  span[class="ais-RefinementList-count"] {
    display: none;
  }
`

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
    <>
    <SiteMetaCustom
      title="Corporate Members | PeopleForBikes"
    />     
    <Wrapper isWide={true}>
      <BigTitleBanner>
        <Heading1>Corporate Members</Heading1>
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
          <HitsAndFilters>
            <h3>Filter By Letter:</h3>
            <FilterMenu 
              attribute="Letter" 
              limit={40} 
              operator="or"
            />
          </HitsAndFilters>          
          <CustomHits />
        </InstantSearch>
      </MainContent>
      <Button
        buttonAlign="center"
        buttonBg="#D0021B"
        buttonBorder="none"
        buttonColor="white"
        buttonFontSize="24px"
        buttonMargin="50px 0 0 0"
        buttonPadding="10px 30px"
        buttonTextTransform="uppercase"
        href="/members"
      >
        Become a Corporate Member
      </Button>
    </Wrapper>
    </>
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
