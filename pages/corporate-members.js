import React from 'react';
import styled from 'styled-components';
import { InstantSearch, connectHits, RefinementList } from 'react-instantsearch-dom';

import { AlgoliaIndex, AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import { memberFormatter } from '~/lib/algolia/memberFormatter';
import getCorporateMembers from '~/lib/salesforce/getCorporateMembers';

import Wrapper from '~/components/wrapper';
import Grid from '~/components/grid';
import BigTitleBanner from '~/components/big-title-banner';
import MainContent from '~/components/main-content';
import Heading1 from '~/components/h1';
import CustomSearchBox from '~/components/search-box';
import SiteMetaCustom from '~/components/site-meta-custom';
import Button from '~/components/button';

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
  color: ${(props) => props.theme.darkGray};

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
    color: ${(props) => props.theme.blue};
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

  li[class='ais-RefinementList-item'] {
    list-style-type: none !important;
  }

  li[class='ais-RefinementList-item ais-RefinementList-item--selected'] {
    color: ${(props) => props.theme.blue};
    list-style-type: none !important;
    text-decoration: underline !important;
  }

  // hides checkbox and count
  input[class='ais-RefinementList-checkbox'] {
    display: none;
  }
  span[class='ais-RefinementList-count'] {
    display: none;
  }
`;

const Box = styled.div`
  width: 100%;
  background-color: #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5vh 0;
`;

const Company = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
`;

const CompName = styled.span`
  display: block;
  font-weight: bold;
  margin-bottom: 0;
  padding: 0 3vw;
`;

const HyperCompName = styled.a`
  font-weight: bold;
  padding: 0 5vw;
  &:hover {
    color: inherit;
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
    <>
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
    </>
  );
}

export async function getStaticProps() {
  const memberData = await getCorporateMembers();
  console.log(memberData)

  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    const algoliaFormattedData = memberFormatter(memberData);
    await AlgoliaIndex('PFB_COALITION_MEMBERS').saveObjects(algoliaFormattedData);
  }

  return {
    props: {
      page: null,
    },
  };
}
