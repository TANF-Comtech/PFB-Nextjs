import React from 'react';

import { getPolicies } from '~/lib/queries/policies';

import Wrapper from '~/components/wrapper';
import Header1 from '~/components/h1';
import PolicyItem from '~/components/policy-item';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import ColorBanner from '~/components/color-banner';

export default function PolicyFinder({ page }) {
  return (
    <Wrapper postPath="/policy/" postTitle="Policy" isWide={true}>
      <MainContent maxWidth="1200px">
        <Header1>Policy Finder</Header1>

        {page.map((policy) => {
          return (
            <PolicyItem
              city={policy.node.city ? policy.node.city : null}
              date={policy.node.year ? policy.node.year : null}
              govLevel={policy.node.government_level}
              key={policy.node._meta.id}
              location={policy.node.location ? policy.node.location.location[0].text : null}
              path={`/policy/${policy.node._meta.uid}`}
              title={policy.node.title[0].text}
              text={policy.node.main_content}
            />
          );
        })}
        <Button
          buttonAlign="center"
          buttonBg="#D0021B"
          buttonBorder="none"
          buttonColor="white"
          buttonFontSize="24px"
          buttonMargin="0 0 50px 0"
          buttonPadding="10px 30px"
          buttonTextTransform="uppercase"
          href="/policy"
        >
          Back to Policy Page
        </Button>
      </MainContent>

      <ColorBanner />
    </Wrapper>
  );
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getPolicies();

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}
