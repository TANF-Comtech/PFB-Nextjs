import React, { useContext } from 'react';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import { getEBikesPages, getSingleEBikesPage } from '~/lib/queries/electric-bikes';
import { linkResolver } from '~/utils';
import DefaultContext from '~/context/default/default-context';

import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import Header1 from '~/components/h1';
import Promo from '~/components/promo';

import EBikesPromo from '~/public/promo/electric-bikes-shaded.jpg';

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;
`;

export default function EBikesPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { electric_bikes } = page;
  const { meta } = useContext(DefaultContext);

  return (
    <>
      <SiteMetaCustom
        desc={
          electric_bikes.main_content
            ? `${electric_bikes.main_content[0].text.substring(0, 180)} ... `
            : meta.desc
        }
        title={
          electric_bikes.title
            ? `${electric_bikes.title[0].text} - Electric Bikes | PeopleForBikes`
            : meta.title
        }
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={
          electric_bikes
            ? `https://www.peopleforbikes.org/electric-bikes/${electric_bikes._meta.uid}`
            : meta.path
        }
      />
      <Wrapper postPath="/topics/electric-bikes" postTitle="Electric Bikes" isWide="true">
        <MainContent maxWidth="800px">
          {electric_bikes.title && <Header1>{electric_bikes.title[0].text}</Header1>}
          {electric_bikes._meta.uid === 'emtb-map' && (
            <iframe
              width="800"
              height="533"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              src="https://arcg.is/1LuLuj"
            />
          )}
          {electric_bikes.main_content && (
            <IntroWrapper>
              <RichText linkResolver={linkResolver} render={electric_bikes.main_content} />
            </IntroWrapper>
          )}
        </MainContent>

        <Promo
          bigWords="Electric Bikes"
          path="/topics/electric-bikes"
          smallWords="Explore More About"
          source={EBikesPromo}
        />
      </Wrapper>
    </>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleEBikesPage(params.uid, previewData);

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getEBikesPages();
  return {
    paths: pages?.map(({ node }) => `/electric-bikes/${node._meta.uid}`) || [],
    fallback: false,
  };
}
