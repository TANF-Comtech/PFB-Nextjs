import React, { useContext } from 'react';

import { getGrants, getSingleGrantPage } from '~/lib/queries/grants';
import data from '~/data';

import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import GrantsItem from '~/components/grants-item';

/* You must reference the `policy` prop to get data from `getStaticProps` - check bottom of this file */
export default function PolicyPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { grant } = page;
  const { meta } = data;

  return (
    <>
      <SiteMetaCustom
        desc={
          grant.main_content ? `${grant.main_content[0].text.substring(0, 180)} ... ` : meta.desc
        }
        title={grant.title ? `${grant.title[0].text} | PeopleForBikes` : meta.title}
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={grant ? `https://www.peopleforbikes.org/grants/${grant._meta.uid}` : meta.path}
      />
      <Wrapper postPath="/grant" postTitle="Grants" isWide="false">
        <MainContent>
          <GrantsItem
            amount={grant.amount ? grant.amount : null}
            city={grant.city ? grant.city : null}
            date={grant.cycle ? grant.cycle : null}
            grantType={grant.type ? grant.type : null}
            key={grant._meta.id}
            location={grant.location1 ? grant.location1.location[0].text : null}
            supportingDoc={grant.link}
            title={grant.title[0].text}
            text={grant.main_content}
          />
        </MainContent>
      </Wrapper>
    </>
  );
}

/* The return here sends the `page` prop back to the policyPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleGrantPage(params.uid, previewData);

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
  const grants = await getGrants();
  return {
    paths: grants?.map(({ node }) => `/grants/${node._meta.uid}`) || [],
    fallback: false,
  };
}
