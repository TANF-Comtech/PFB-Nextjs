import { Date as ParseDate } from 'prismic-reactjs'

import MainContent from '../global/main-content'
import EventItem from '../content/event-item'

/**
 * <EventsList>
 * 
 * Provides topics landing page list content (all locations)
 *
 * @param { array } eventTitle - title of the event
 * @param { array } payload - response from Prismic API
 */
const EventsListTemp = ({
  eventTitle,
  payload
}) => {
  console.log(payload)
  return (
    <MainContent maxWidth="800px">
      { eventTitle && <h2>{ eventTitle }</h2> }
      { payload.map( (event) => {     
        // Get date
        const newEventDate = new Date(ParseDate( event.node.date ))
        return( 
          <EventItem
            day={ newEventDate.toLocaleString('en-us', { day: "2-digit" } ) }
            month={ newEventDate.toLocaleString('en-us', { month: 'short' } ) }
            year={ newEventDate.getFullYear() }
            key={ event.node._meta.id }
            // path={ `/events/${event.node._meta.uid}` }
            text={ event.node.main_content ? event.node.main_content : "" }
            title={ event.node.title[0].text }
          />
        )
      } )}
    </MainContent>
  )
}

export default EventsListTemp