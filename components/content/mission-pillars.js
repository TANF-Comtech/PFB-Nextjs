import styled from 'styled-components'
import numWords from 'num-words'

import MainContent from '../global/main-content'
import RedActionItem from '../slices/action-item-red'

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
  font-family: ${props => props.theme.tungsten };
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
 * 
 * @param { array } payload - array of the mission pillars
 */
const MissionPillars = ({
  payload
}) => {
  return (
    <>
      <DeepBlue>
        <MainContent>
          <SectionTitle>Our Mission Pillars</SectionTitle>
          { payload.map( (item, i) => {
            return (
              <Item
                key={ i }
              >
                <Title>
                  <span>{ numWords(i+1) }</span>
                  &nbsp;
                  { item.pillar_title }
                </Title>
                <Text>
                  { item.pillar_content }
                </Text>
              </Item>
            )
          })}
        </MainContent>
      </DeepBlue>
      <MainContent>
        <h2>How To Get Involved</h2>
        <RedActionItem 
          path="/team"
          title="Meet Our Team"
          text="Learn who is helping to deliver your next ride."
        /> 
        <RedActionItem 
          path="/subcommittees"
          title="Join a PeopleForBikes Subcommittee"
          text="Help guide the world of bicycling forward."
        />
        <RedActionItem 
          path="/board"
          title="Discover our Board"
          text="Our advisors come from all over the world of biking."
        />            
      </MainContent>
    </>
  )
}

export default MissionPillars