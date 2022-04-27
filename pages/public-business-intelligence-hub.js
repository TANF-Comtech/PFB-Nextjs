import PublicBusinessIntelligenceHub from '../components/content/public-business-intelligence-hub'
import SiteMetaCustom from '../components/meta/site-meta-custom'
import Wrapper from '../components/global/wrapper'


export default function PublicBusinessIntelligenceHubPage() {
  return (
    <Wrapper>
      <SiteMetaCustom
        title="Public Business Intelligence Hub | PeopleForBikes"
      />  
      <PublicBusinessIntelligenceHub />
    </Wrapper>
  )
}