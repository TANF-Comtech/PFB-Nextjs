import { Date as ParseDate } from 'prismic-reactjs';

import { setDateSuffix } from '../../lib/utils/setDateSuffix';

import MainContent from '../global/main-content';
import ContentItem from './content-item';
import FallbackImage from './fallback-image';

/**
 * <NewsList>
 *
 * Provides news list content
 *
 * @param { arr } fallback - the array of images you need when you dont have an image
 * @param { string } nodeName - endpoints have variable node names, so you can override here
 * @param { array } payload - list of news posts from Prismic API
 */
const NewsList = ({ nodeName = 'news_item', payload }) => {

  return (
    <MainContent>
      {payload !== null &&
        payload.map((news) => {

          // Date Processing - must use .replace() to avoid JS date bug!
          let theDateLongform = null;
          if (news[nodeName].publication_date) {
            theDateLongform = new Date(news[nodeName].publication_date.replace(/-/g, '/'));
          } else {
            theDateLongform = new Date(news[nodeName]._meta.lastPublicationDate.replace(/-/g, '/'));
          }

          return (
            <ContentItem
              date={`${theDateLongform.toLocaleString('en-us', { month: 'long' })}
                     ${setDateSuffix(theDateLongform.toLocaleString('en-us', { day: 'numeric' }))},
                     ${theDateLongform.toLocaleString('en-us', { year: 'numeric',})}`}
              deck={news[nodeName].deck}
              key={news[nodeName]._meta.id}
              image={news[nodeName].header_image ? news[nodeName].header_image : FallbackImage}
              path={`/news/${news[nodeName]._meta.uid}`}
              text={
                news[nodeName].main_content && news[nodeName].main_content[0].type === 'paragraph'
                  ? news[nodeName].main_content[0].text
                  : ''
              }
              title={news[nodeName].title[0].text}
            />
          );
        })}
    </MainContent>
  );
};

export default NewsList;
