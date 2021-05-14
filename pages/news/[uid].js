import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { RichText, Date as ParseDate } from "prismic-reactjs";

import { getAllNews, getSingleNewsPage } from "../../lib/queries/news";
import { linkResolver, setDateSuffix } from "../../lib/utils";
import { htmlSerializer } from "../../lib/prismic/htmlSerializer";
import { paraFinder } from "../../lib/utils/paraFinder";

import DefaultContext from "../../context/default/default-context";

import Wrapper from '../../components/global/wrapper'
import SiteMetaCustom from '../../components/meta/site-meta-custom'
import MainContent from '../../components/global/main-content'
import Promo from '../../components/slices/promo'
import Donate from '../../components/global/donate'
import FallbackImage from '../../components/content/fallback-image'

import TakeActionPromo from "../../public/promo/take-action-banner.jpg";

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
  const { meta } = useContext(DefaultContext);

  // Set fallback index, one of six possible images 
  const [fi, setFi] = useState(Math.floor(Math.random(5)))

  // Every time a new path comes up we shuffle the images
  // useEffect 'watch' dependency is where we watch the router's path
  useEffect(() => {
    setFi(Math.floor(Math.random(5)));
  }, [router.pathname]);

  // Set SEO data to defaults
  const [theTitle, setTheTitle] = useState(meta.title)
  const [theByline, setTheByline] = useState('PeopleForBikes Staff')
  const [theDesc, setTheDesc] = useState(meta.desc)
  const [thePath, setThePath] = useState(meta.path)
  const [theDate, setTheDate] = useState(new Date(ParseDate( news._meta.lastPublicationDate )))
  const [theImage, setTheImage] = useState(meta.imgSrc)
  const [theImageWidth, setTheImageWidth] = useState(meta.imgWidth)
  const [theImageHeight, setTheImageHeight] = useState(meta.imgHeight)

  // Check for SEO-specific overrides, set if they are present (only run once)
  useEffect(() => {
    
    // Title
    if ( news.title ) {
      setTheTitle(news.title[0].text)
    } else {
      setTheTitle(meta.title)
    }

    // Byline
    if ( news.byline ) {
      setTheByline( news.byline )
    }

    // Description
    if ( news.seo_text ) {
      setTheDesc(news.seo_text)
    } else if ( news.main_content ) {
      setTheDesc(paraFinder(news.main_content).text)
    }

    // Path
    if ( news ) {
      setThePath(`https://www.peopleforbikes.org/news/${news._meta.uid}`)
    }

    // Date  
    if (news.publication_date) {
      setTheDate(new Date(ParseDate( news.publication_date )))
    }
    
    // Image
    if ( news.seo_image ) {
      setTheImage( news.seo_image.url )
      setTheImageWidth( news.seo_image.dimensions.width )
      setTheImageHeight( news.seo_image.dimensions.height )
    } else if ( news.header_image ) {
      setTheImage( news.header_image.url )
      setTheImageWidth( news.header_image.dimensions.width )
      setTheImageHeight( news.header_image.dimensions.height )
    }

  }, [])
 
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
    "mainEntityOfPage": thePath,
    "url": thePath,
    "inLanguage": "en",
    "author": [{
      "@context": "http://schema.org",
      "@type": "Person",
      "url": "https://www.peopleforbikes.org",
      "name": theByline
    }],
    "datePublished": theDate,
    "headline": theTitle,
    "publisher": {
      "@id": "https://www.peopleforbikes.org/#publisher"
    },
    "copyrightHolder": {
      "@id": "https://www.peopleforbikes.org/#publisher"
    },
    "sourceOrganization": {
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
          <DateBox>
          { `${theDate.toLocaleString('en-us', { month: 'long' } )} 
              ${setDateSuffix(theDate.getDate())}, 
              ${theDate.getFullYear()}` }
          </DateBox>
          <h2>{ theTitle }</h2>       
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
                render={news.main_content}
                linkResolver={linkResolver}
                htmlSerializer={htmlSerializer}
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

  return {
    props: {
      preview,
      page: pageData ?? null,
      fallback: FallbackImage(),
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getAllNews();
  return {
    paths: pages?.map(({ node }) => `/news/${node._meta.uid}`) || [],
    fallback: false,
  };
}
