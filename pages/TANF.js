import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Button from '~/components/button';
import MainContent from '~/components/main-content';

import { getGrants } from '~/lib/queries/grants';
import { AlgoliaIndex } from '~/lib/algolia/algoliaClient';
import { grantsFormatter, grantsOnlyFormatter } from '~/lib/algolia/grantsFormatter';

export default function GrantsFinder({}) {
  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <Button href={'/'}>Hello World</Button>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the component above for rendering */
// export async function getStaticProps({ params, preview = false, previewData }) {
//   return;
// }
