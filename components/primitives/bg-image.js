import Image from "next/image"
import styled from 'styled-components'

const Container = styled.section`
  display: block;
  position: relative;
  height: ${ props => props.height };
  width: ${ props => props.width };
`;

/**
 * <BgImage>
 *
 * The new next/image optimization setup handles background images oddly
 * It requires they be foreground images placed inside of a container
 * This component abstracts that logic away for better DX
 * 
 * Note: all images get processed through Webpack so you must import! 
 * No absolute URLs as they will break during site generation
 *
 * @param { string } imgalt - text description of the image
 * @param { string } imgsrc - url of the image, should be a JS module import
 * @param { number } height - how tall the background image should be (default: 50vh)
 * @param { number } width - how wide image should be (default: 100%)
 */
const BgImage = ({ 
  imgalt = 'Background Image',
  imgsrc,
  height = '50vh',
  width = '100%'
}) => {

  return(
    <Container
      height={ height }
      width={ width }
    >
      <Image
        alt={ imgalt }
        src={ imgsrc }
        layout="fill"
        objectFit="cover"
        quality={ 80 }
      />
    </Container>
  )
}

export default BgImage