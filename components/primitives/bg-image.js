import Image from "next/image"
import styled from 'styled-components'

const Container = styled.section`
  align-items: ${ props => props.alignItems };
  display: flex;
  justify-content: ${ props => props.justifyContent };
  position: relative;
  height: ${ props => props.height };
  width: ${ props => props.width };

  @media screen and (min-width: ${(props) => props.theme.sm}) {
    height: calc(${ props => props.height } * 1.4);
  }

  @media screen and (min-width: ${(props) => props.theme.lg}) {
    height: calc(${ props => props.height } * 1.6);
  }
`;

const InnerContainer = styled.div`
  z-index: ${ props => props.theme.zIndex01 };
`

/**
 * <BgImage>
 *
 * The new next/image optimization setup handles background images oddly
 * It requires they be foreground images placed inside of a container
 * This component abstracts that logic away for better DX
 * 
 * You can layer text and imagery on top of the background image
 * All you have to do is pass that text or imagery into this component
 * 
 * Note: all images get processed through Webpack so you must import! 
 * No absolute URLs as they will break during site generation
 *
 * @param { string } alignItems - vertical alignment of inner content
 * @param { string } imgalt - text description of the image
 * @param { string } imgsrc - url of the image, should be a JS module import
 * @param { string } justifyContent - horizontal alignment of inner content
 * @param { number } height - how tall the background image should be (default: 50vh)
 * @param { number } width - how wide image should be (default: 100%)
 */
const BgImage = ({ 
  alignItems = 'center',
  children,
  imgalt = 'Background Image',
  imgsrc,
  height = '50vh',
  justifyContent = 'center',
  width = '100%'
}) => {

  return(
    <Container
      alignItems={ alignItems }
      height={ height }
      justifyContent={ justifyContent }
      width={ width }
    >
      <Image
        alt={ imgalt }
        src={ imgsrc }
        layout="fill"
        objectFit="cover"
        quality={ 80 }
      />
      { children && 
        <InnerContainer>
          { children }
        </InnerContainer>
      }
    </Container>
  )
}

export default BgImage