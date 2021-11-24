import Image from "next/image"
import styled from "styled-components";
import BgImage from "../primitives/bg-image"

const ForegroundImg = styled(Image)`
  margin-bottom: 2vh;
  max-height: 70vh;
  object-fit: cover;
  width: 100%;
`;

/**
 * <HeaderImage>
 *
 * This produces the ultra-wide banners around the site.
 * It can handle background imagery with text or just foreground images
 *
 * @param { object } children - React child components, content for this component
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } source - single image to display as a banner/hero in background
 * @param { object } srcSet - set of images to display across responsive viewports in foreground
 */

const HeaderImage = ({ children, headingRGBA, source, srcSet }) => {
  return (
    <>
      {source && (
        <BgImage
          headingRGBA={headingRGBA} 
          imgsrc={source}
        >
          {children}
        </BgImage>
      )}
      {srcSet && (
        <ForegroundImg
          alt={ srcSet.alt ? srcSet.alt : "Bike-oriented image" }
          src={ srcSet.url ? srcSet.url : null }
          height={ srcSet.dimensions.height }
          width={ srcSet.dimensions.width }
        />
      )}
    </>
  );
};

export default HeaderImage;
