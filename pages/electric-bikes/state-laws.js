import React, { useContext } from 'react';
import styled from 'styled-components';

import { getEBikeLaws } from '~/lib/queries/electric-bikes';
import data from '~/data';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import Promo from '~/components/promo';
import Grid from '~/components/grid';

import EBikesPromo from '~/public/promo/electric-bikes-shaded.jpg';

const GridWrapper = styled.section`
  margin: 2vh 0 !important;
`;

const Box = styled.div`
  align-items: center !important;
  background-color: ${(props) => props.theme.midnightBlue} !important;
  display: flex !important;
  justify-content: center !important;
  min-height: 190px !important;
  padding: 25px !important;
`;

const Text = styled.h4`
  color: ${(props) => props.theme.blueBright} !important;
  font-size: 36px !important;
  font-weight: 700 !important;
  line-height: 36px !important;
  margin: 0 0 10px 0 !important;
  text-align: center !important;
  text-transform: uppercase !important;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880)) !important;
    line-height: calc(36px + 8 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px !important;
    line-height: 44px !important;
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 0 auto !important;
  width: 46px !important;
`;

export default function EBikesLaws({ page, preview }) {
  // Destructure page payload and meta from global context
  const { meta } = data;

  return (
    <LegacyPage>
      <SiteMetaCustom
        desc={meta.desc}
        title="State by State Electric Bike Laws | PeopleForBikes"
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path="https://www.peopleforbikes.org/electric-bikes/state-laws"
      />
      <Wrapper postPath="/topics/electric-bikes" postTitle="Electric Bikes" isWide="true">
        <MainContent maxWidth="800px">
          <h2>Electric Bike Laws - State by State</h2>
          <p>
            Electric bicycle (e-bike) laws are different in every state, and can be confusing for
            riders, retailers, and suppliers. PeopleForBikes is making riding an electric bicycle
            easy and accessible for all. Find your state&apos;s specific rules below.
          </p>

          {page && (
            <GridWrapper>
              <Grid>
                {page.map((PDF) => {
                  return (
                    PDF.node.ebike_laws && (
                      <Box key={PDF.node.ebike_laws.size}>
                        <a href={PDF.node.ebike_laws.url} target="_blank" rel="noopener">
                          <Text>{PDF.node.location && PDF.node.location[0].text}</Text>
                          <Arrow src="/white-arrow.svg" />
                        </a>
                      </Box>
                    )
                  );
                })}
              </Grid>
            </GridWrapper>
          )}
        </MainContent>

        <Promo
          bigWords="Electric Bikes"
          path="/topics/electric-bikes"
          smallWords="Explore More About"
          source={EBikesPromo}
        />
      </Wrapper>
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getEBikeLaws();

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}
