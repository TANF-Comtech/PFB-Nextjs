import React, { useContext } from 'react';

import { getPolicies, getSinglePolicyPage } from '~/lib/queries/policies';
import data from '~/data';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import PolicyItem from '~/components/policy-item';

/* You must reference the `policy` prop to get data from `getStaticProps` - check bottom of this file */
export default function PolicyPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { policy } = page;
  const { meta } = data;

  return (
    <LegacyPage>
      <SiteMetaCustom
        desc={
          policy.main_content ? `${policy.main_content[0].text.substring(0, 180)} ... ` : meta.desc
        }
        title={policy.title ? `${policy.title[0].text} | PeopleForBikes` : meta.title}
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={policy ? `https://www.peopleforbikes.org/policy/${policy._meta.uid}` : meta.path}
      />
      <Wrapper postPath="/policy" postTitle="Policy" isWide="false">
        <MainContent>
          <PolicyItem
            bill={policy.bill_link ? policy.bill_link : null}
            city={policy.city ? policy.city : null}
            date={policy.year ? policy.year : null}
            fullDisplay="true"
            govLevel={policy.government_level ? policy.government_level : null}
            location={policy.location ? policy.location.location[0].text : null}
            status={policy.status ? policy.status : null}
            supportingDoc={policy.supporting_document ? policy.supporting_document : null}
            title={policy.title[0].text}
            text={policy.main_content ? policy.main_content : null}
          />
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the policyPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSinglePolicyPage(params.uid, previewData);

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
  const policies = await getPolicies();
  return {
    paths: policies?.map(({ node }) => `/policy/${node._meta.uid}`) || [],
    fallback: false,
  };
}
