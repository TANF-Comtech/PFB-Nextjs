import Head from 'next/head'
import styled from 'styled-components'

import Wrapper from '../components/global/wrapper'
import GridWide from '../components/layout/grid-wide'
import ImageTextOverlay from '../components/content/image-text-overlay'
import Graphic from '../components/global/graphic'

import { getLocations } from '../lib/queries/locations'

const LandingBar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 3vh;

  @media (min-width: ${props => props.theme.sm}) {
    flex-direction: row;
    justify-content: space-between;
  }


  h1 {
    margin: 0 0 2vh 0;
    text-align: center;
    text-transform: uppercase;

    @media (min-width: ${props => props.theme.sm}) {
      margin: 0 20px 0 0;
      text-align: left;
      width: calc(100% - 420px);
    }
  }
`

export default function LocationsLanding({ page }) {
  
  return (
    <>
      <Head>
        <title>Locations | People for Bikes</title>
      </Head>
      <Wrapper 
        postTitle="Locations"
        isWide={ false }
      >
        <LandingBar>
          <h1>Locations</h1>
          <Graphic />
        </LandingBar>
        <p>Explore the locations where People for Bikes is improving biking for everyone. Faucibus et molestie ac feugiat. Mauris a diam maecenas sed. Mi sit amet mauris commodo quis. Purus in mollis nunc sed id semper risus in. Gravida cum sociis natoque penatibus. Imperdiet proin fermentum leo vel orci porta non. Massa tincidunt dui ut ornare lectus sit amet. Curabitur gravida arcu ac tortor dignissim convallis aenean et. Platea dictumst quisque sagittis purus sit amet volutpat.</p>
        <GridWide>
          { page.map( (location) => {
            return(
              <ImageTextOverlay
                imageLink={ `/locations/${location.node._meta.uid}` }
                source1X={ location.node.header_image?.main1x.url }
                source2X={ location.node.header_image?.url }
                title={ location.node.location[0].text }
                key={ location.node._meta.id }
              />
            )
          }) }
        </GridWide>
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getLocations()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}
