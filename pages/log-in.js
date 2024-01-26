import { Step, LoadingSpinner } from '~/components/login';
import { Page } from '~/components/new/page';
import SiteMetaCustom from '~/components/site-meta-custom';

export default function LoginPage() {
  return (
    <Page>
      <SiteMetaCustom title="Log Into the PeopleForBikes Member Center" />
      <div className="mx-auto mt-[45%] min-h-[100vh] max-w-[800px] px-10 md:mt-[25%]">
        <LoadingSpinner />
        <Step />
      </div>
    </Page>
  );
}
