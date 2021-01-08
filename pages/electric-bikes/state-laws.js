import { useContext } from 'react'
import ErrorPage from 'next/error' 
import styled from 'styled-components'

import { getEBikeLaws } from '../../lib/queries/electric-bikes'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Promo from '../../components/slices/promo'
import Grid from '../../components/global/grid'

import EBikesPromo from '../../public/promo/electric-bikes-shaded.jpg'
import WhiteArrow from '../../public/white-arrow.svg'

const GridWrapper = styled.section`
  margin: 2vh 0;
`

const Box = styled.div`
  align-items: center;
  background-color: ${props => props.theme.midnightBlue};
  display: flex;
  justify-content: center;
  min-height: 190px;
  padding: 25px;
`

const Text = styled.h4`
  color: ${props => props.theme.blueBright};
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  margin: 0 0 10px 0;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880));
    line-height: calc(36px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px;
    line-height: 44px;
  }  
`

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

export default function EBikesLaws({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ meta.desc }
        title="State by State Electric Bike Laws | People for Bikes"
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path="https://www.peopleforbikes.org/electric-bikes/state-laws"
      />    
      <Wrapper 
        postPath="/topics/electric-bikes"
        postTitle="Electric Bikes"
        isWide="true"
      >        
        <MainContent maxWidth="800px">
          <h2>
            Electric Bike Laws - State by State
          </h2>
          <p>
            Electric bicycle (e-bike) laws are different in every state, and can be confusing for riders, retailers, and suppliers. PeopleForBikes is making riding an electric bicycle easy and accessible for all. Find your state's specific rules below.
          </p>

          { page && 
            <GridWrapper>
              <Grid>
                { page.map( (PDF) => {
                  return(
                    PDF.node.ebike_laws &&
                    <Box key={ PDF.node.ebike_laws.size }>
                      <a href={ PDF.node.ebike_laws.url } target="_blank" rel="noopener">
                        <Text>
                          { PDF.node.location && PDF.node.location[0].text }
                        </Text>
                        <Arrow src={ WhiteArrow } width="46px" />
                      </a>
                    </Box>
                  )
                })}
              </Grid>
            </GridWrapper>
          }
          
        </MainContent>

        <Promo 
          bigWords="Electric Bikes"
          path="/topics/electric-bikes"
          smallWords="Explore More About"
          source={ EBikesPromo }
        /> 

      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the Page component above for rendering */
/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getEBikeLaws()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}