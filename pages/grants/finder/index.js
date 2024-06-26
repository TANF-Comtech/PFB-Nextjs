import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Header1 from '~/components/h1';
import GrantsItem from '~/components/grants-item';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import ColorBanner from '~/components/color-banner';

import { getGrants } from '~/lib/queries/grants';
import { AlgoliaIndex } from '~/lib/algolia/algoliaClient';
import { grantsFormatter, grantsOnlyFormatter } from '~/lib/algolia/grantsFormatter';

export default function GrantsFinder({ page }) {
  return (
    <LegacyPage>
      <Wrapper postPath="/grants/" postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <Header1>Grants Finder</Header1>
          {page.map((grant) => {
            return (
              <GrantsItem
                city={grant.node.city ? grant.node.city : null}
                date={grant.node.cycle ? grant.node.cycle : null}
                grantType={grant.node.type ? grant.node.type : null}
                key={grant.node._meta.id}
                location={grant.node.location ? grant.node.location.location[0].text : null}
                path={`/grants/${grant.node._meta.uid}`}
                title={grant.node.title[0].text}
                text={grant.node.main_content}
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
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getGrants();

  // Algolia General Search
  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    const algoliaFormattedData = grantsFormatter(pageData);
    await AlgoliaIndex().saveObjects(algoliaFormattedData);
  }

  // Algolia Grants Search
  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    const algoliaGrantsData = grantsOnlyFormatter(pageData);
    await AlgoliaIndex('PFB_GRANTS').saveObjects(algoliaGrantsData);
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}
