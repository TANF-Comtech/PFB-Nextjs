import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import MainContent from '~/components/main-content';
import Grid from '~/components/grid';

import WhiteArrow from '~/public/white-arrow.svg';

const GridWrapper = styled.section`
  margin: 2vh 0;
`;

const Box = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.midnightBlue};
  display: flex;
  justify-content: center;
  min-height: 190px;
  padding: 25px;
`;

const Text = styled.h4`
  color: ${(props) => props.theme.blueBright};
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  margin: 0 0 10px 0;
  text-align: center;
  text-transform: uppercase;
  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880));
    line-height: calc(36px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px;
    line-height: 44px;
  }
`;

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`;

const PageHeading = styled.h2`
  color: ${(props) => props.theme.red};
  font-weight: 700;
  margin-top: 5vh;
  text-transform: uppercase;
`;

/* So...the landing page query is so large, we've overloaded it */
/* I had to manually pull the payload into this page, ugh */
const statsList = [
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Environmental',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9towREAACQA5Q7G',
        uid: 'environmental',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Facilities',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9trThEAACYA5RoJ',
        uid: 'bicycle-facilities-and-safety',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Participation',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9twlBEAACQA5TCu',
        uid: 'participation',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Protected Bike Lanes',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9txphEAAOPu5TVn',
        uid: 'economic-benefits',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Safety',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9tyohEAAOPu5Tm2',
        uid: 'safety',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Electric Bikes',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9ty0xEAACQA5TqW',
        uid: 'e-bikes',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Health',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9ttFBEAACQA5SFr',
        uid: 'bicycling-and-lungs',
        type: 'statistic_page',
      },
    },
  },
  {
    node: {
      title: [
        {
          type: 'heading1',
          text: 'Economic',
          spans: [],
        },
      ],
      _meta: {
        id: 'X9tmVBEAACYA5QQW',
        uid: 'economic',
        type: 'statistic_page',
      },
    },
  },
];

/**
 * <StatsList>
 *
 * Grid of all stats pages for the research landing page
 *
 * @param { array } payload - list of locations from Prismic API
 */
const StatsList = ({ payload }) => {
  return (
    <MainContent>
      <PageHeading>Statistics Library</PageHeading>
      <hr />
      <GridWrapper>
        <Grid>
          {statsList.map((stat) => {
            return (
              <Box key={stat.node._meta.id}>
                <Link href={`/statistics/${stat.node._meta.uid}`}>
                  <a>
                    <Text>{`${stat.node.title[0].text} Statistics`}</Text>
                    <Arrow src={WhiteArrow} />
                  </a>
                </Link>
              </Box>
            );
          })}
        </Grid>
      </GridWrapper>
    </MainContent>
  );
};

export default StatsList;
