import MainContent from '../global/main-content'
import Promo from '../slices/promo'

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