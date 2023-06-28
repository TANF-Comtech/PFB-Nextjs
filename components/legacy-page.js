import Head from 'next/head';

import { Page } from '~/components/new/page';
import GlobalStyle from '~/styles/global-css';

/**
 * ldJSONBasic (variable)
 *
 * This is a LDJSON signature for the organization
 * We add this into _app.js so it's available around the site
 *
 * @param { object } ldJSONBasic - contains all LDJSON for a basic Google Organization
 */
const ldJSONBasic = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.peopleforbikes.org/mission',
  'name': 'PeopleForBikes',
  'url': 'https://www.peopleforbikes.org',
  'privacyPolicy': 'https://www.peopleforbikes.org/privacy',
  'alternateName': ['PFB', 'BikesBelong', 'Bicycle Product Suppliers Association', 'BPSA'],
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '2580 55th St #200',
    'addressLocality': 'Boulder',
    'addressRegion': 'CO',
    'postalCode': '80301',
    'addressCountry': 'US',
  },
  'telephone': '+13034494893',
  'logo': {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    'url': 'https://pfb-main-site-assets.s3.amazonaws.com/PFB_Stacked_LOGO_512x512.jpg',
    'height': 512,
    'width': 512,
  },
  'sameAs': [
    'https://www.facebook.com/PeopleForBikes',
    'https://twitter.com/peopleforbikes',
    'https://www.linkedin.com/company/peopleforbikes',
    'https://www.instagram.com/peopleforbikes',
    'https://www.youtube.com/user/peopleforbikes/videos',
  ],
};

/**
 * <LegacyPage>
 *
 * This provides the necessary components to preserve legacy pages:
 * <Head> provides global defaults to the HTML head of each page, they can easily be modified per page
 * <GlobalStyle> is styled-components way to provide an CSS doc to entire site
 */

export const LegacyPage = ({ children }) => {
  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(ldJSONBasic)}</script>
      </Head>
      <GlobalStyle />
      <Page showBanner={true} showHeader={true} showFooter={true} hasHero={false} legacy={true}>
        <div className="legacy-page">{children}</div>
      </Page>
    </>
  );
};
