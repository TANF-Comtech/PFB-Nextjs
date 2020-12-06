import { Date as ParseDate } from 'prismic-reactjs'

import MainContent from '../global/main-content'
import EventItem from '../content/event-item'

/**
 * <EventsList>
 * 
 * Provides topics landing page list content (all locations)
 *
 * @param { array } payload - response from Prismic API
 */
const EventsList = ({
  payload
}) => {
  return (
    <MainContent maxWidth="800px">
      { payload.map( (event) => {     
        // Get date
        const newEventDate = new Date(ParseDate( event.event.date ))
        return( 
          <EventItem
            day={ newEventDate.toLocaleString('en-us', { day: "2-digit" } ) }
            month={ newEventDate.toLocaleString('en-us', { month: 'short' } ) }
            year={ newEventDate.getFullYear() }
            key={ event.event._meta.id }
            path={ `/events/${event.event._meta.uid}` }
            text={ event.event.main_content ? event.event.main_content : "" }
            title={ event.event.title[0].text }
          />
        )
      } )}
    </MainContent>
  )
}

export default EventsList