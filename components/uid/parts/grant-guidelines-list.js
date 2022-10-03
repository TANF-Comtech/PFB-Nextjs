import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';

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
      {payload.map((grant, index) => {
        return (
          <Accordion key={index} title={prismicH.asText(grant.accordion_heading)}>
            <PrismicRichText field={grant.accordion_content} />
          </Accordion>
        );
      })}
    </MainContent>
  );
};

export default GrantsList;
