import styled from 'styled-components'

import MainContent from '../global/main-content'
import TeamMember from './team-member'

const RedBlueBG = styled.section`
  background: 
    linear-gradient(
      90deg, 
      rgba(210,56,35,1) 0%, 
      rgba(210,56,35,1) 25%, 
      rgba(0,44,64,1) 25%,
      rgba(0,44,64,1) 100%);
`

/**
 * <TeamList>
 * 
 * Provides full list of Team members, with CEO offset at the top
 *
 * @param { array } ceoPayload - single CEO block
 * @param { array } teamPayload - list of team members from Prismic API
 */
const TeamList = ({
  ceoPayload,
  teamPayload
}) => {
  console.log(ceoPayload)
  return (
    <>
      <div>
      <RedBlueBG>
        <MainContent maxWidth="900px">
          <TeamMember
            description={ ceoPayload.team_member.description }
            image={ ceoPayload.team_member.headshot && ceoPayload.team_member.headshot }
            path={ ceoPayload.team_member.email }
            position={ ceoPayload.team_member.position }
            textColor="white"
            title={ ceoPayload.team_member.title[0].text }
          />
        </MainContent>       
      </RedBlueBG>


      </div>
      <MainContent maxWidth="900px">
        { teamPayload.map( (person) => { 
          const { node } = person 
          return (
            <TeamMember
              description={ node.description }
              key={ node._meta.id }
              image={ node.headshot && node.headshot }
              isCeo={ node.ceo }
              path={ node.email }
              position={ node.position }
              title={ node.title[0].text }
            />
          )
        })}
      </MainContent>
    </>
  )
}

export default TeamList