import React from 'react';
import styled from 'styled-components';
import { InstantSearch, connectHits, RefinementList } from 'react-instantsearch-dom';

import { AlgoliaIndex, AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import { memberFormatter } from '~/lib/algolia/memberFormatter';
import getCorporateMembers from '~/lib/salesforce/getCorporateMembers';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Grid from '~/components/grid';
import BigTitleBanner from '~/components/big-title-banner';
import MainContent from '~/components/main-content';
import Heading1 from '~/components/h1';
import CustomSearchBox from '~/components/search-box';
import SiteMetaCustom from '~/components/site-meta-custom';
import Button from '~/components/button';

const HitsAndFilters = styled.section`
  align-items: flex-start !important;
  display: flex !important;
  flex-wrap: wrap !important;
  margin: 0 0 10px 0 !important;

  h3 {
    font-size: 16px !important;
    margin: 0 !important;
    text-transform: uppercase !important;
  }
`;

const FilterMenu = styled(RefinementList)`
  color: ${(props) => props.theme.darkGray} !important;

  ul {
    display: flex !important;
    flex-wrap: wrap !important;
    margin: 8px 0 !important;
  }

  label {
    align-items: center !important;
    display: flex !important;
    margin: 0 !important;
  }

  span {
    color: ${(props) => props.theme.blue} !important;
    cursor: pointer !important;
    font-size: 14px !important;
    font-weight: bold !important;
    line-height: 1 !important;
    margin: 0 5px !important;
    text-transform: uppercase !important;

    &:hover {
      text-decoration: underline !important;
    }
  }

  li[class='ais-RefinementList-item'] {
    list-style-type: none !important;
  }

  li[class='ais-RefinementList-item ais-RefinementList-item--selected'] {
    color: ${(props) => props.theme.blue} !important;
    list-style-type: none !important;
    text-decoration: underline !important;
  }

  // hides checkbox and count
  input[class='ais-RefinementList-checkbox'] {
    display: none !important;
  }
  span[class='ais-RefinementList-count'] {
    display: none !important;
  }
`;

const Box = styled.div`
  width: 100% !important;
  background-color: #d8d8d8 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 5vh 0 !important;
`;

const Company = styled.p`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-transform: uppercase !important;
  text-align: center !important;
  margin: 0 !important;
`;

const CompName = styled.span`
  display: block !important;
  font-weight: bold !important;
  margin-bottom: 0 !important;
  padding: 0 3vw !important;
`;

const HyperCompName = styled.a`
  font-weight: bold !important;
  padding: 0 5vw !important;
  &:hover {
    color: inherit !important;
  }
`;

function CoalitionMember({ hit }) {
  return (
    <>
      <Box>
        <Company>
          {!hit.Website && <CompName>{hit.Name}</CompName>}
          {hit.Website &&
            (hit.Website.includes('http://') ||
              hit.Website.includes('https://') ||
              hit.Website.includes('HTTP://') ||
              hit.Website.includes('HTTPS://')) && (
              <HyperCompName
                style={{ textDecoration: 'underline', color: 'inherit' }}
                href={hit.Website}
              >
                {hit.Name}
              </HyperCompName>
            )}
          {hit.Website &&
            !(
              hit.Website.includes('http://') ||
              hit.Website.includes('https://') ||
              hit.Website.includes('HTTP://') ||
              hit.Website.includes('HTTPS://')
            ) && (
              <HyperCompName
                style={{ textDecoration: 'underline', color: 'inherit' }}
                href={`https://${hit.Website}`}
                target="_blank"
              >
                {hit.Name}
              </HyperCompName>
            )}
        </Company>
      </Box>
    </>
  );
}

export default function CorporateMembers() {
  const Hits = ({ hits }) => {
    return (
      <Grid>
        {hits.map((hit) => {
          return <CoalitionMember key={hit.objectID} hit={hit} />;
        })}
      </Grid>
    );
  };

  const CustomHits = connectHits(Hits);

  return (
    <LegacyPage>
      <SiteMetaCustom title="Corporate Members | PeopleForBikes" />
      <Wrapper isWide={true}>
        <BigTitleBanner>
          <Heading1>Corporate Members</Heading1>
        </BigTitleBanner>
        <MainContent>
          <InstantSearch searchClient={AlgoliaReactClient} indexName="PFB_COALITION_MEMBERS">
            <CustomSearchBox
              width={'50%'}
              translations={{
                placeholder: 'SEARCH BY NAME',
              }}
            />
            <HitsAndFilters>
              <h3>Filter By Letter:</h3>
              <FilterMenu attribute="Letter" limit={40} operator="or" />
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
    </LegacyPage>
  );
}

export async function getStaticProps() {
  const memberData = await getCorporateMembers();

  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    const algoliaFormattedData = memberFormatter(memberData);
    await AlgoliaIndex('PFB_COALITION_MEMBERS').replaceAllObjects(algoliaFormattedData);
  }

  return {
    props: {
      page: null,
    },
  };
}
