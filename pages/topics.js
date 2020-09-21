import Head from 'next/head'
import styled from 'styled-components'

import Wrapper from '../components/global/wrapper'
import Grid from '../components/global/grid'
import ImageSquare from '../components/global/image-square'
import Graphic from '../components/global/graphic'

import { getTopics } from '../lib/taxonomy/topics'

const LandingBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vh;

  h1 {
    margin-right: 20px;
    width: calc(100% - 420px);
  }
`

function TopicsLanding({ page }) {
  return (
    <>
      <Head>
        <title>Biking Topics | People for Bikes</title>
      </Head>
      <Wrapper postTitle="Topics">
        <LandingBar>
          <h1>Biking Topics</h1>
          <Graphic />
        </LandingBar>
        <p>{}</p>
        <Grid>
          { page.map( (topic) => {
            return(
              <ImageSquare
                imageSquareLink={ `/topics/${topic.node._meta.uid}` }
                source1X={ topic.node.square_image?.mobile.url }
                source2X={ topic.node.square_image?.url }
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

export default TopicsLanding

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getTopics()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}
