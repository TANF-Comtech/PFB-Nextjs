import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import { getSingleActionPage } from '../../lib/queries/take-action';

import DefaultContext from '../../context/default/default-context';

import Wrapper from '../../components/global/wrapper';
import SiteMetaCustom from '../../components/meta/site-meta-custom';
import MainContent from '../../components/global/main-content';
import Promo from '../../components/slices/promo';

import ResearchPromo from '../../public/RidespotBg.jpg';

import FormImg01 from '../../public/form-images/PFB_Forms_01.jpg';
import FormImg02 from '../../public/form-images/PFB_Forms_02.jpg';
import FormImg03 from '../../public/form-images/PFB_Forms_03.jpg';
import FormImg04 from '../../public/form-images/PFB_Forms_04.jpg';
import FormImg05 from '../../public/form-images/PFB_Forms_05.jpg';
import FormImg06 from '../../public/form-images/PFB_Forms_06.jpg';
import FormImg07 from '../../public/form-images/PFB_Forms_07.jpg';
import FormImg08 from '../../public/form-images/PFB_Forms_08.jpg';
import FormImg09 from '../../public/form-images/PFB_Forms_09.jpg';
import FormImg10 from '../../public/form-images/PFB_Forms_10.jpg';
import FormImg11 from '../../public/form-images/PFB_Forms_11.jpg';
import FormImg12 from '../../public/form-images/PFB_Forms_12.jpg';
import FormImg13 from '../../public/form-images/PFB_Forms_13.jpg';
import FormImg14 from '../../public/form-images/PFB_Forms_14.jpg';
import FormImg15 from '../../public/form-images/PFB_Forms_15.jpg';
import FormImg16 from '../../public/form-images/PFB_Forms_16.jpg';
import FormImg17 from '../../public/form-images/PFB_Forms_17.jpg';
import FormImg18 from '../../public/form-images/PFB_Forms_18.jpg';
import FormImg19 from '../../public/form-images/PFB_Forms_19.jpg';
import FormImg20 from '../../public/form-images/PFB_Forms_20.jpg';
import FormImg21 from '../../public/form-images/PFB_Forms_21.jpg';
import FormImg22 from '../../public/form-images/PFB_Forms_22.jpg';
import FormImg23 from '../../public/form-images/PFB_Forms_23.jpg';
import FormImg24 from '../../public/form-images/PFB_Forms_24.jpg';
import FormImg25 from '../../public/form-images/PFB_Forms_25.jpg';
import FormImg26 from '../../public/form-images/PFB_Forms_26.jpg';

const CenteredTitle = styled.h2`
  text-align: center;
  margin: 0 auto 3vh auto;
  max-width: 800px;
`;

const BigPara = styled.p`
  margin: 3vh auto;
  max-width: 800px;
  text-align: center;
`;

const FlexContainer = styled.section`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5vh;

  @media (min-width: ${(props) => props.theme.md}) {
    flex-direction: row;
  }
`;

const FormContainer = styled.div`
  flex: 0 1 calc(100% - 450px);
  min-height: 30vh;
`;

const ImageContainer = styled.div`
  flex: 0 1 450px;
  padding-right: 25px;
  margin: 0 auto;
  max-width: 450px;
`;

export default function ActionForms({ page, preview }) {
  // Destructure page payload and meta from global context
  const { action } = page;
  const { meta } = useContext(DefaultContext);

  // Image handling
  let imageSelection;
  if (action.image_selection) {
    switch (action.image_selection) {
      case '1':
        imageSelection = FormImg01;
        break;
      case '2':
        imageSelection = FormImg02;
        break;
      case '3':
        imageSelection = FormImg03;
        break;
      case '4':
        imageSelection = FormImg04;
        break;
      case '5':
        imageSelection = FormImg05;
        break;
      case '6':
        imageSelection = FormImg06;
        break;
      case '7':
        imageSelection = FormImg07;
        break;
      case '8':
        imageSelection = FormImg08;
        break;
      case '9':
        imageSelection = FormImg09;
        break;
      case '10':
        imageSelection = FormImg10;
        break;
      case '11':
        imageSelection = FormImg11;
        break;
      case '12':
        imageSelection = FormImg12;
        break;
      case '13':
        imageSelection = FormImg13;
        break;
      case '14':
        imageSelection = FormImg14;
        break;
      case '15':
        imageSelection = FormImg15;
        break;
      case '16':
        imageSelection = FormImg16;
        break;
      case '17':
        imageSelection = FormImg17;
        break;
      case '18':
        imageSelection = FormImg18;
        break;
      case '19':
        imageSelection = FormImg19;
        break;
      case '20':
        imageSelection = FormImg20;
        break;
      case '21':
        imageSelection = FormImg21;
        break;
      case '22':
        imageSelection = FormImg22;
        break;
      case '23':
        imageSelection = FormImg23;
        break;
      case '24':
        imageSelection = FormImg24;
        break;
      case '25':
        imageSelection = FormImg25;
        break;
      case '26':
        imageSelection = FormImg26;
        break;
    }
  }

  /**
   * useEffect() for Spark Form
   *
   * We look for sparkIframe ref (on a div), and clear all children nodes
   * Then we make a new script, with the src from the action form in Prismic
   * Finally, that is appended to the ref
   * This instance of useEffect watches `router.pathname`, so everytime the path changes this sequence will repeat
   *
   * Why do this? We have to force the script to reload because next pages are all synthetic
   * The browser doesn't know to go fetch and run the script from synthetic events
   */
  const router = useRouter();
  const sparkIframe = useRef();
  let frm = null;

  useEffect(() => {
    // detect first mount of this component,
    // if it's n+1, we know we need to clear out the old sparkIframe with removeChild()
    if (sparkIframe.current.hasChildNodes() === true) {
      sparkIframe.current.removeChild(sparkIframe.current.children[0]);
    }

    // implements spark script
    // eslint-disable-next-line react-hooks/exhaustive-deps
    frm = document.createElement('script');
    action.form_id &&
      (frm.src = `https://action.peopleforbikes.org/assets/js/widget.js/?id=${action.form_id.toString()}`);
    sparkIframe.current.appendChild(frm);
  }, [router.pathname]);

  return (
    <>
      <SiteMetaCustom
        desc={action.main_content ? `${action.main_content.substring(0, 180)} ... ` : meta.desc}
        title={action.title ? `${action.title[0].text} | PeopleForBikes` : meta.title}
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={action ? `https://www.peopleforbikes.org/take-action/${action._meta.uid}` : meta.path}
      />
      <Wrapper postPath="/take-action" postTitle="Take Action" isWide="true">
        <MainContent>
          {action.title && <CenteredTitle>{action.title[0].text}</CenteredTitle>}
          {action.main_content && <BigPara>{action.main_content}</BigPara>}
          {action.long_content && <RichText render={action.long_content} />}
          <FlexContainer>
            {action.image_selection && (
              <>
                <ImageContainer>
                  <Image
                    src={imageSelection}
                    alt="Bike centric image with people present"
                    height={450}
                    width={450}
                  />
                </ImageContainer>
              </>
            )}
            <FormContainer>
              {action.form_id && (
                <>
                  <div id="wsd-root" className="spkactionform" />
                  <div id="pb-root" className="spkactionform" />
                  <div ref={sparkIframe} />
                  {/* <Script src={`https://action.peopleforbikes.org/assets/js/widget.js/?id=${action.form_id.toString()}`} strategy="afterInteractive"/> */}
                </>
              )}
            </FormContainer>
          </FlexContainer>
        </MainContent>
        <Promo
          bigWords="Ride Spot"
          path="/rides"
          smallWords="Find Your Next Ride With"
          source={ResearchPromo}
        />
      </Wrapper>
    </>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getServerSideProps({ params, preview = false, previewData }) {
  const pageData = await getSingleActionPage(params.uid, previewData);

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
  };
}
