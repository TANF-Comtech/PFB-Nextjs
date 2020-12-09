import MainContent from '../global/main-content'
import TeamMember from './team-member'

/**
 * <NewsList>
 * 
 * Provides full list of Team members, with CEO offset at the top
 *
 * @param { array } payload - list of news posts from Prismic API
 */
const TeamList = ({
  payload
}) => {

  return (
    <MainContent maxWidth="900px">
      { payload.map( (person) => { 
        console.log(person)
        const { node } = person
        return (
          <TeamMember
            description={ node.description }
            key={ node._meta.id }
            image={ node.headshot && node.headshot }
            path={ node.email }
            position={ node.position }
            title={ node.title[0].text }
          />
        )
      })}
    </MainContent>
  )
}

export default TeamList