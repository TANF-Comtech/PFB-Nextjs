import styled from 'styled-components'

import MainContent from '../global/main-content'
import Promo from '../slices/promo'

const PageHeading = styled.h2`
  color: ${ props => props.theme.red };
  font-weight: 700;
  margin-top: 5vh;
  text-transform: uppercase;
`

/**
 * <ResearchBanners>
 * 
 * Grid of all stats pages for the research landing page
 *
 * @param { array } payload - list of locations from Prismic API
 */
const ResearchBanners = ({
  payload
}) => {
  return (
    <MainContent>
      <PageHeading>Featured</PageHeading>
      <hr />
      { payload.map((campaign) => {
        return(
          <Promo 
            bigWords={ campaign.campaign.big_text }
            path={ campaign.campaign.link }
            smallWords={ campaign.campaign.small_text }
            source={ campaign.campaign.banner_image.url }
          />
        )
      })}
    </MainContent>
  )
}

export default ResearchBanners