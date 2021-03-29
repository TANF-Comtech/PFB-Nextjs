import styled from "styled-components"

import MainContent from "../global/main-content"
import SearchButton from "../primitives/search-button"

const Bar = styled.section`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 14px;
    margin-bottom: 0;
  }
`

const NetworkControl = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`
const SearchControl = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;

  span {
    margin-right: 8px;
  }
`

/**
 * <GlobalBar>
 *
 * @param { string } xyz - coming soon
 * 
 */
 const GlobalBar = () => {
  return (
    <MainContent 
      bgColor="#002C40"
      textColor="#fff"
    >
      <Bar>
        <NetworkControl>
          <span>Explore Our Network of Sites</span>
        </NetworkControl>
        <SearchControl>
          <span>Search</span>
          <SearchButton 
            color="#fff"
            size="18px"
          />
        </SearchControl>
      </Bar>

    </MainContent>
  )
}

export default GlobalBar