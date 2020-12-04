import { Date as ParseDate } from 'prismic-reactjs'

import { setDateSuffix } from '../../lib/utils'

import MainContent from '../global/main-content'
import ContentItem from './content-item'

/**
 * <NewsList>
 * 
 * Provides news landing page list content
 *
 * @param { array } payload - list of news posts from Prismic API
 */
const NewsList = ({
  payload
}) => {
  return (
    <MainContent>
      { payload.map( (news) => { 
        
        const newDate = news.node.publication_date ? 
          ( new Date(ParseDate( news.node.publication_date ))) : 
          ( new Date(ParseDate( news.node._meta.lastPublicationDate )))
        return (
          <ContentItem 
            date={ `${newDate.toLocaleString('en-us', { month: 'long' } )} 
                    ${setDateSuffix(newDate.getDate())}, 
                    ${newDate.getFullYear()}` }
            key={ news.node._meta.id }
            image={ news.node.header_image && news.node.header_image }
            path={ `/news/${news.node._meta.uid}` }
            text={ news.node.main_content[0].type === "paragraph" ? news.node.main_content[0].text : "" }
            title={ news.node.title[0].text }
          />
        )
      })}
    </MainContent>
  )
}

export default NewsList