import Head from 'next/head'
import styled from 'styled-components'

import Wrapper from '../components/global/wrapper'
import Grid from '../components/global/grid'
import ImageSquare from '../components/global/image-square'
import Graphic from '../components/global/graphic'

import { getTopicsLandingPage } from '../lib/queries/topics'

import genericSquare1x from '../public/PFB_Topics_450x450_generic.jpg'
import genericSquare2x from '../public/PFB_Topics_900x900_generic.jpg'

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

export default function TopicsLanding({ page }) {
  return (
    <>
      <Head>
        <title>{ page.topics.title[0].text } | People for Bikes</title>
      </Head>
      <Wrapper postTitle="Topics">
        <LandingBar>
          <h1>{ page.topics.title[0].text }</h1>
          <Graphic />
        </LandingBar>
        <p>{ page.topics.intro[0].text }</p>
        <Grid>
          { page.allTopics.edges.map( (topic) => {
            return(
              <ImageSquare
                imageSquareLink={ `/topics/${topic.node._meta.uid}` }
                source1X={ topic.node.square_image ? ( topic.node.square_image.mobile.url ) : ( genericSquare1x ) }
                source2X={ topic.node.square_image ? ( topic.node.square_image.url ) : ( genericSquare2x ) }
                title={ topic.node.title[0].text }
                key={ topic.node._meta.id }
              />
            )
          }) }
        </Grid>
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getTopicsLandingPage('topics', preview)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}
