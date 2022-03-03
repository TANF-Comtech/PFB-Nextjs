import DoubleTheDonation from '../components/content/double-the-donation'
import SiteMetaCustom from '../components/meta/site-meta-custom'
import Wrapper from '../components/global/wrapper'


export default function DoubleYourDonation() {
  return (
    <Wrapper>
      <SiteMetaCustom
        title="Double Your Donation to PeopleForBikes"
      />  
      <DoubleTheDonation />
    </Wrapper>
  )
}