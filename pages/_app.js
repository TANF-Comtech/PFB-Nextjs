import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';
import { ThemeProvider } from 'styled-components';

import { loginModalAtom, ownersManualModalAtom } from '~/atoms';
import { AuthProvider } from '~/lib/auth';
import { REPOSITORY, linkResolver } from '~/lib/api';
import Variables from '~/styles/variables';
import PageTransition from '~/components/transition';
import '~/styles/globals.css';

/**
 * store (variable)
 *
 * sets default values for Jotai atoms during SSR
 */

const store = createStore();
store.set(loginModalAtom, false);
store.set(ownersManualModalAtom, false);

/**
 * <App>
 *
 * This is an override of the default _app.js setup Next.js uses
 *
 * We're adding in two providers:
 * <ThemeProvider> is for the styled-components theme, which makes the styles/variables globally available
 *
 * Also:
 * <Component> is a Next.js default that renders all components and provides props to them
 */
const App = ({ Component, pageProps, router }) => {
  return (
    <JotaiProvider store={store}>
      <AuthProvider>
        <ThemeProvider theme={Variables}>
          <PageTransition location={router.pathname}>
            <PrismicProvider
              linkResolver={linkResolver}
              internalLinkComponent={({ href, ...props }) => <Link href={href} {...props} />}
            >
              <PrismicPreview repositoryName={REPOSITORY}>
                <Component {...pageProps} key={router.route} />
              </PrismicPreview>
            </PrismicProvider>
          </PageTransition>
        </ThemeProvider>
      </AuthProvider>
    </JotaiProvider>
  );
};

export default App;
