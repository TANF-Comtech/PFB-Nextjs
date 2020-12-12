import styled from 'styled-components'

import MainContent from '../global/main-content'
import TeamMember from './team-member'

const RedBlueBG = styled.section`
  background-color: ${ props => props.theme.midnightBlue };
`

const GrayBG = styled.section`
  background-color: ${ props => props.theme.lightestGray };

  iframe {
    display: block;
    height: 300px;
    margin: 0 auto;
    max-width: 900px;
    padding: 25px;
    width: 100%;
    
    @media (min-width: ${props => props.theme.xs}) {
      height: 500px;
    }
  }
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

  return (
    <>
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
      <GrayBG>
        <iframe  
          src="https://www.youtube.com/embed/txmmOKBgSO4" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </GrayBG>

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