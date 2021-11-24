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

  span {
    color: rgba(
      ${(props) => (props.headingRGBA ? props.headingRGBA : "255,255,255,1")}
    );
    font-family: ${(props) => props.theme.dharma};
    font-size: 40px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 1px;
    margin: 0;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(40px + 20 * ((100vw - 320px) / 880));
      line-height: calc(30px + 20 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 60px;
      line-height: 50px;
    }
  }

  h1 {
    color: rgba(
      ${(props) => (props.headingRGBA ? props.headingRGBA : "255,255,255,1")}
    ) !important;
    text-align: center !important;
    text-transform: uppercase !important;
  }
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
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } imgalt - text description of the image
 * @param { string } imgsrc - url of the image, should be a JS module import
 * @param { string } justifyContent - horizontal alignment of inner content
 * @param { string } height - how tall the background image should be (default: 50vh)
 * @param { string } width - how wide image should be (default: 100%)
 */
const BgImage = ({ 
  alignItems = 'center',
  children,
  headingRGBA = "255,255,255,1",
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
        <InnerContainer
          headingRGBA={ headingRGBA }
        >
          { children }
        </InnerContainer>
      }
    </Container>
  )
}

export default BgImage