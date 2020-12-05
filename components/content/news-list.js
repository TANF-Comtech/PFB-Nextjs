import { Date as ParseDate } from 'prismic-reactjs'

import { setDateSuffix } from '../../lib/utils'

import MainContent from '../global/main-content'
import ContentItem from './content-item'

/**
 * <NewsList>
 * 
 * Provides news list content
 *
 * @param { string } nodeName - endpoints have variable node names, so you can override here
 * @param { array } payload - list of news posts from Prismic API
 */
const NewsList = ({
  nodeName = 'news_item',
  payload
}) => {

  return (
    <MainContent>
      { payload.map( (news) => { 
        const newDate = news[nodeName].publication_date ? 
          ( new Date(ParseDate( news[nodeName].publication_date ))) : 
          ( new Date(ParseDate( news[nodeName]._meta.lastPublicationDate )))
        return (
          <ContentItem 
            date={ `${newDate.toLocaleString('en-us', { month: 'long' } )} 
                    ${setDateSuffix(newDate.getDate())}, 
                    ${newDate.getFullYear()}` }
            key={ news[nodeName]._meta.id }
            image={ news[nodeName].header_image && news[nodeName].header_image }
            path={ `/news/${news[nodeName]._meta.uid}` }
            text={ news[nodeName].main_content[0].type === "paragraph" ? news[nodeName].main_content[0].text : "" }
            title={ news[nodeName].title[0].text }
          />
        )
      })}
    </MainContent>
  )
}

export default NewsList