import { getGrants } from "../../../lib/queries/grants";

import Wrapper from "../../../components/global/wrapper";
import Header1 from "../../../components/primitives/h1";
import GrantsItem from "../../../components/content/grants-item";
import Button from "../../../components/primitives/button";
import MainContent from "../../../components/global/main-content";
import ColorBanner from "../../../components/global/color-banner";

export default function GrantsFinder({ page }) {
  return (
    <Wrapper postPath="/grants/" postTitle="Grants" isWide={true}>
      <script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=peopleforbikes"
      ></script>
      <MainContent maxWidth="1200px">
        <Header1>Grants Finder</Header1>

        { page.map( (grant) => {
          return(
            <GrantsItem 
              city={ grant.node.city ? grant.node.city : null }
              date={ grant.node.cycle ? grant.node.cycle : null }
              grantType={ grant.node.type ? grant.node.type : null }
              key={ grant.node._meta.id }
              location={ grant.node.location ? grant.node.location.location[0].text : null }
              path={ `/grants/${ grant.node._meta.uid }` }
              title={ grant.node.title[0].text }
              text={ grant.node.main_content }
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
          href="/grants"
        >
          Back to Grants Page
        </Button>
      </MainContent>

      <ColorBanner />
    </Wrapper>
  );
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getGrants();

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  }
}
