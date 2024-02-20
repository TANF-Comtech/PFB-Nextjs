import { Page } from '~/components/new/page';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function BIH() {
  return (
    <Page title="Business Intelligence Hub" hasHero showDonate={false} className="min-h-[100vh]">
      <TextHero />
      <TabSection />
    </Page>
  );
}

// Radial Gradient with thin text overlay
const TextHero = () => {
  return (
    <>
      <div className="pfb-gradient h-100vh mt-36 flex min-h-[200px] flex-col items-center justify-center px-5 sm:px-10">
        <div className="m-0 text-center font-dharma text-[50px] uppercase leading-[60px] text-white sm:text-[70px] sm:leading-[90px]">
          Business Intelligence Hub
        </div>
        <div className="text-center font-montserrat text-[1rem] font-[700] uppercase text-white">
          Insights and Industry Trends
        </div>
      </div>
      <div className="mx-auto my-10 max-w-6xl px-5 text-base leading-[36px] sm:px-10 sm:text-xl">
        The Business Intelligence Hub provides a comprehensive and timely package of data
        representing the current state of the bike business and bicycling participation in the U.S.
        If you have feedback or questions, please reach out to our Deputy Director of Research
        Patrick Hogan at{' '}
        <a className="text-blue" href="mailto:patrick@peopleforbikes.org">
          patrick@peopleforbikes.org
        </a>
        .
      </div>
    </>
  );
};

const TabSection = () => {
  return (
    <Tabs className="mx-auto my-10 max-w-6xl px-5 text-base leading-[36px] sm:px-10 sm:text-xl">
      <TabList className="bg-gray-100 flex justify-center space-x-4 p-4">
        <Tab
          className="rounded px-4 py-2 focus:outline-none"
          selectedClassName="font-bold rounded focus:outline-none"
          style={{ color: 'white', backgroundColor: '#3E9FDC' }}
        >
          Ridership Trends
        </Tab>
        <Tab
          className="rounded bg-blue px-4 py-2 focus:outline-none"
          selectedClassName="font-bold rounded focus:outline-none"
          style={{ color: 'white', backgroundColor: '#3E9FDC' }}
        >
          Retail Sales
        </Tab>
        <Tab
          className="rounded bg-blue px-4 py-2 focus:outline-none"
          selectedClassName="font-bold rounded focus:outline-none"
          style={{ color: 'white', backgroundColor: '#3E9FDC' }}
        >
          Consumer Insights
        </Tab>
      </TabList>
      <TabPanel className="p-4">
        <div className="aspect-w-16 aspect-h-32 mx-auto max-w-6xl">
          <iframe
            width="1100"
            height="2020"
            src="https://lookerstudio.google.com/embed/reporting/7f05171f-9a01-4a69-9db4-4b6ae6cc659b/page/p_40qpv2u8dd"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </TabPanel>
      <TabPanel className="p-4">
        <div className="aspect-w-16 aspect-h-32 mx-auto max-w-6xl">
          <iframe
            className="max-w-6xl"
            width="1100"
            height="6790"
            src="https://lookerstudio.google.com/embed/reporting/f3afc5fc-b89a-4e09-8069-889b3ca5dffe/page/p_vvin4n28dd"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </TabPanel>
      <TabPanel className="p-4">
        <div className="aspect-w-16 aspect-h-32 mx-auto max-w-6xl">
          <iframe
            width="1100"
            height="6340"
            src="https://lookerstudio.google.com/embed/reporting/320e4415-5629-4241-ba78-5b466d2562d9/page/p_gxnh8r5hed"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </TabPanel>
    </Tabs>
  );
};
