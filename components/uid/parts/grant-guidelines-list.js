import React from 'react';
import { PrismicRichText } from '@prismicio/react';

import { randomID } from '~/utils';

import MainContent from '~/components/main-content';
import Accordion from '~/components/accordion';

/**
 * <GrantsList>
 *
 * Provides news list content
 *
 * @param { array } payload - list of news posts from Prismic API
 */
const GrantsList = ({ payload }) => {
  return (
    <MainContent>
      {payload.map((grant) => {
        return (
          <Accordion
            key={randomID(10000000)}
            title={PrismicRichText.asText(grant.accordion_heading)}
          >
            <PrismicRichText field={grant.accordion_content} />
          </Accordion>
        );
      })}
    </MainContent>
  );
};

export default GrantsList;
