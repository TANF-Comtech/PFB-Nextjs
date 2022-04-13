import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { RichText, Date as ParseDate } from "prismic-reactjs";
import { htmlSerializer } from "../../lib/prismic/htmlSerializer";

import { getAllNews, 
         getSingleNewsPage } from '../../lib/queries/news'
import { linkResolver } from '../../lib/utils'
import { setDateSuffix } from '../../lib/utils/setDateSuffix'

import useMetadata from "../../hooks/useMetadata";

import Wrapper from '../../components/global/wrapper'
import SiteMetaCustom from '../../components/meta/site-meta-custom'
import MainContent from '../../components/global/main-content'
import Promo from '../../components/slices/promo'
import Donate from '../../components/global/donate'
import FallbackImage from '../../components/content/fallback-image'

import TakeActionPromo from "../../public/promo/take-action-banner.jpg";
import logo from '../../public/PFB_Stacked_LOGO_512x512.jpg'

const DateBox = styled.div`
  font-size: 20px;
  font-family: ${(props) => props.theme.montserrat};
  font-weight: 700;
  margin-bottom: 1vh;
`;

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;
`;

const ParagraphOfLinks = styled.p`
  a,
  a:visited,
  a:focus,
  a:hover {
    &:after {
      color: black;
      content: "|";
      padding: 0 10px;
      text-decoration: none;
    }

    &:last-child:after {
      content: "";
      padding: 0;
    }
  }
`;

const ImgContainer = styled.section`
  display: block;
`;

const Caption = styled.div`
  font-size: 14px;
`;

export default function NewsPage({ fallback, page, preview }) {
  // Set up router
  const router = useRouter();

  // Destructure page payload and meta from global context
  const { news } = page;

  console.log(news)
  
  // Implement metadata hook
  const {
    theTitle,
    theByline,
    theDesc,
    theKeywords,
    thePath,
    theDate,
    theDateModified,
    theImage,
    theImageWidth,
    theImageHeight,
  } = useMetadata(news)

  // Set fallback index, one of six possible fallback images 
  const [fi, setFi] = useState(Math.floor(Math.random(5)))

  // Every time a new path comes up we shuffle the placeholder images
  // useEffect 'watch' dependency is where we watch the router's path
  useEffect(() => {
    setFi(Math.floor(Math.random(5)));
  }, [router.query.uid]);
 
  // Sets up article-specific JSON
  const newsJSONPayload = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "description": theDesc,
    "image": {
      "@context": "http://schema.org",
      "@type": "ImageObject",
      "url": theImage,
      "height": theImageHeight,
      "width": theImageWidth
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": thePath,
    },
    "url": thePath,
    "inLanguage": "en",
    "author": [{
      "@context": "http://schema.org",
      "@type": "Person",
      "url": "https://www.peopleforbikes.org",
      "name": theByline
    }],
    "datePublished": theDate,
    "dateModified": theDateModified,
    "headline": theTitle,
    "publisher": {
      "@type": "Organization",
      "name": "PeopleForBikes",
      "@id": "https://www.peopleforbikes.org/#publisher",
      "logo": {
        "@context": "http://schema.org",
        "@type": "ImageObject",
        "url": `${ logo }`,
      }
    },
    "copyrightHolder": {
      "@type": "Organization",
      "name": "PeopleForBikes",
      "@id": "https://www.peopleforbikes.org/#publisher"
    },
    "sourceOrganization": {
      "@type": "Organization",
      "name": "PeopleForBikes",
      "@id": "https://www.peopleforbikes.org/#publisher"
    },
    "isAccessibleForFree": true,
    "hasPart": {
      "@type": "WebPageElement",
      "isAccessibleForFree": true
    },
    "isPartOf": {
      "@type": "CreativeWork",
      "name": "PeopleForBikes"
    }
  }

  return (
    <>
    <script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=peopleforbikes"
      ></script>
      <SiteMetaCustom
        desc={ theDesc }
        keywords={ theKeywords }
        title={ theTitle }
        imgHeight={ theImageHeight }
        imgSrc={ theImage }
        imgWidth={ theImageWidth }
        ldJSON={ newsJSONPayload }
        path={ thePath }
      /> 
      <Wrapper 
        postPath="/news"
        postTitle="News"
        isWide="true"
      >        
        <MainContent maxWidth="700px">

          { /* For whatever reason, the JS date computes as one day behind every time 
             * So I take the output of toLocaleString and bump by one, very scientific ;)
             */
          
            theDate && 
            <DateBox>
              {
                `${theDate.toLocaleString('en-us', { month: 'long' } )} 
                ${setDateSuffix(Number(theDate.toLocaleString('en-us', { day: 'numeric' } )) + 1)}, 
                ${theDate.toLocaleString('en-us', { year: 'numeric' } )}` 
              }
            </DateBox>          
          }
          
          { news.title && <h2>{ news.title[0].text }</h2> }
          <p>By: { theByline }</p>
          {
            news.header_image ? (              
              <ImgContainer>
                <img loading="lazy" 
                    src={ news.header_image.url }
                    alt={ news.header_image.alt ? news.header_image.alt : "Biking related image" } />
                { news.header_image.alt && <Caption>{ news.header_image.alt }</Caption> }
              </ImgContainer>
            ) : (
              <ImgContainer>
                <img loading="lazy" 
                    src={ fallback[fi].path }
                    alt={ fallback[fi].alt } />
              </ImgContainer>              
            )
          }     
          { news.main_content && 
            <IntroWrapper>
              <RichText
                render={ news.main_content }
                linkResolver={ linkResolver }
                htmlSerializer={ htmlSerializer }
              />
            </IntroWrapper>
          }
          {news.topics.length > 1 && 
            <>
              {news.topics[0].topic !== null && 
                <strong>Related Topics:</strong>
              }
              <ParagraphOfLinks>
                {news.topics.map((topic) => {
                  if (topic.topic !== null) {
                    return (
                      <a
                        href={`/topics/${topic.topic._meta.uid}`}
                        key={topic.topic._meta.id}
                      >
                        <strong>{topic.topic.title[0].text}</strong>
                      </a>
                    );
                  }
                })}
              </ParagraphOfLinks>
            </>
          }
          {news.locations.length > 1 &&
            <>
              {news.locations[0].location !== null && 
                <strong>Related Locations:</strong>
              }
              <ParagraphOfLinks>
                {news.locations.map((location) => {
                  if (location.location !== null) {
                    return (
                      <a
                        href={`/locations/${location.location._meta.uid}`}
                        key={location.location._meta.id}
                      >
                        <strong>{location.location.location[0].text}</strong>
                      </a>
                    );
                  }
                })}
              </ParagraphOfLinks>
            </>
          }
        </MainContent>

        <Promo
          bigWords="Take Action"
          path="/take-action"
          smallWords="How You Can"
          source={TakeActionPromo}
        />
        <Donate />
      </Wrapper>
    </>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleNewsPage(params.uid, previewData);

  if( !pageData ) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
      fallback: FallbackImage(),
    },
    revalidate: 60,
  }
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getAllNews();
  return {
    paths: pages?.map(({ node }) => `/news/${node._meta.uid}`) || [],
    fallback: false,
  }
}
