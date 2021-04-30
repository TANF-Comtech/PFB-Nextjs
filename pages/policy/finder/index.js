import { getPolicies } from "../../../lib/queries/policies";

import Wrapper from "../../../components/global/wrapper";
import Header1 from "../../../components/primitives/h1";
import PolicyItem from "../../../components/content/policy-item";
import Button from "../../../components/primitives/button";
import MainContent from "../../../components/global/main-content";
import ColorBanner from "../../../components/global/color-banner";

export default function PolicyFinder({ page }) {
  return (
    <Wrapper postPath="/policy/" postTitle="Policy" isWide={true}>
      <script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=peopleforbikes"
      ></script>
      <MainContent maxWidth="1200px">
        <Header1>Policy Finder</Header1>

        {page.map((policy) => {
          return (
            <PolicyItem
              city={policy.node.city ? policy.node.city : null}
              date={policy.node.year ? policy.node.year : null}
              govLevel={policy.node.government_level}
              key={policy.node._meta.id}
              location={
                policy.node.location
                  ? policy.node.location.location[0].text
                  : null
              }
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
    revalidate: 1,
  };
}
