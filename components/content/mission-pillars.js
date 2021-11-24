import styled from 'styled-components'
import numWords from 'num-words'

import MainContent from '../global/main-content'
import WayfindingItem from '../slices/wayfinding-item'

const DeepBlue = styled.section`
  background-color: ${props => props.theme.midnightBlue };
  color: #fff;
  margin-bottom: 2vh;
  padding: 4vh 0;
`

const SectionTitle = styled.h2`
  color: #fff;
  margin-bottom: 4vh;
`

const Title = styled.h3`
  color: ${props => props.theme.blueBright };
  font-family: ${props => props.theme.dharma };
  font-size: 40px;
  font-weight: 300px;
  line-height: 40px;
  margin-bottom: 0;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(40x + 20 * ((100vw - 320px) / 880));
    line-height: calc(40px + 20 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 50px;
    line-height: 50px;
  }     

  span {
    color: white;
    font-size: 40px;

    @media screen and (min-width: 320px) {
      font-size: calc(40x + 20 * ((100vw - 320px) / 880));
      line-height: calc(40px + 20 * ((100vw - 320px) / 880));
    }
    @media screen and (min-width: 1200px) {
      font-size: 50px;
      line-height: 50px;
    }       
  }
`

const Text = styled.p`
  color: white;
  margin-bottom: 0;
`

const Item = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightGray };
  margin-bottom: 2vh;
  padding-bottom: 2vh;

  &:last-child {
    border-bottom: none;
  }
`

/**
 * <MissionPillars>
 * 
 * This creates the container for MissionPillars
 * One day this will come from the backend...
 * 
 */
const MissionPillars = () => {
  return (
    <>
      <MainContent>
        <h2>How To Get Involved</h2>
        <WayfindingItem 
          path="/team"
          title="Meet Our Team"
          text="Discover who is helping to deliver your next ride."
        /> 
        <WayfindingItem 
          path="/subcommittees"
          title="Join a PeopleForBikes Subcommittee"
          text="Help guide the world of bicycling forward."
        />
        <WayfindingItem 
          path="/board-orientation"
          title="PeopleForBikes Board Orientation"
          text="Learn how to effectively contribute to our organization."
        />        
        <WayfindingItem 
          path="/board"
          title="Discover our Board"
          text="Our advisors come from all over the world of biking."
        />
        <WayfindingItem 
          path="/corporate-members"
          title="Meet Our Corporate Members"
          text="See which companies support our mission directly."
        />
      </MainContent>
    </>
  )
}

export default MissionPillars