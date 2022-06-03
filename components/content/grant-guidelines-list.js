import { RichText } from 'prismic-reactjs';

import { randomID } from '../../lib/utils';

import MainContent from '../global/main-content';
import Accordion from '../global/accordion';

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
          <Accordion key={randomID(10000000)} title={RichText.asText(grant.accordion_heading)}>
            <RichText render={grant.accordion_content} />
          </Accordion>
        );
      })}
    </MainContent>
  );
};

export default GrantsList;
