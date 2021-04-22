import Link from 'next/link'
import styled from 'styled-components'

import MainContent from '../global/main-content'
import Grid from '../global/grid'
import { linkResolver } from '../../lib/utils'

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

const PageHeading = styled.h2`
  color: ${ props => props.theme.red };
  font-weight: 700;
  margin-top: 5vh;
  text-transform: uppercase;
`

/**
 * <StatsList>
 * 
 * Grid of all stats pages for the research landing page
 *
 * @param { array } payload - list of locations from Prismic API
 */
const StatsList = ({
  payload
}) => {
  
  return (
    <>
    { payload.length > 1 && 
      <MainContent>
        <PageHeading>Statistics Library</PageHeading>
        <hr />
        <GridWrapper>
          <Grid>
            { payload.map( (stat) => {
              return(
                <Box key={ stat.node._meta.id }>
                  <Link href={ linkResolver(stat.node._meta)}>
                    <a>
                      <Text>
                        { `${stat.node.title[0].text} Statistics` }
                      </Text>
                      <Arrow src={ WhiteArrow } width="46px" />
                    </a>
                  </Link>
                </Box>
              )
            })}
          </Grid>
        </GridWrapper>
      </MainContent>
    }
    </>
  )
}

export default StatsList