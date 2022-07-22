import AlchemerSurvey from '../components/content/alchemer-survey';
import SiteMetaCustom from '../components/meta/site-meta-custom';
import Wrapper from '../components/global/wrapper';

export default function CustomErrorPage() {
  return (
    <Wrapper>
      <SiteMetaCustom title="Biking Survey | PeopleForBikes" />
      <AlchemerSurvey />
    </Wrapper>
  );
}