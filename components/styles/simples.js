import styled from 'styled-components'

/**
 * <PrimaryHeading>
 * 
 * Big H1s for everyone
 *
 * @param { string } color - text color
 * @param { string } margin - give it some space
 * @param { string } maxWidth - you might want a title to end or be boxed in
 * @param { string } padding - pad things out
 * @param { string } weight - how bold do you want your heading?
 * 
 */ 
export const PrimaryHeading = styled.h1`
  color: ${ props => props.color ? props.color : '#fff'};
  font-size: 80px;
  font-weight: ${ props => props.weight ? props.weight : '400'};
  line-height: 1.1;
  margin: ${ props => props.margin ? props.margin : '2vh 2vw'};
  max-width: ${ props => props.maxWidth ? props.maxWidth : 'inherit'};
  padding: ${ props => props.padding ? props.padding : '10px 20px'};
  text-align: ${ props => props.textAlign ? props.textAlign : 'center'};;
  text-transform: inherit !important;

  @media screen and (min-width: 1200px) {
    font-size: 100px;
  }
`
/**
 * <SecondaryHeading>
 * 
 * Sometimes you want a flexible H2, I got your back
 *
 * @param { string } color - text color
 * @param { string } fontFamily - either send in montserrat or dharma please
 * @param { string } fontSize - will scale for mobile automatically, px please
 * @param { string } margin - give it some space
 * @param { string } textTransform - you want uppercase? Ok then do it.
 * @param { string } weight - how bold do you want your heading?
 * 
 */ 
export const SecondaryHeading = styled.h2`
  color: ${ props => props.color ? props.color : '#fff'};
  font-family: ${ props => props.fontFamily ? props.fontFamily : props.theme.dharma };
  font-weight: ${ props => props.weight ? props.weight : '300'};
  font-size: ${ props => props.fontSize ? props.fontSize + 'px': '68px'};
  letter-spacing: 1px;
  line-height: ${ props => props.fontSize ? (props.fontSize * .88 + 'px') : '60px'};
  margin: ${ props => props.margin ? props.margin : '10px'};
  text-transform: ${ props => props.textTransform ? props.textTransform : 'none'};
  
  @media screen and (min-width: 320px) {
    font-size: calc(${ props => props.fontSize ? (props.fontSize * .88 + 'px') : '68px'} + 20 * ((100vw - 320px) / 880));
    line-height: calc(${ props => props.fontSize ? (props.fontSize + 'px') : '60px'} + 20 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: ${ props => props.fontSize ? (props.fontSize * 1.3 + 'px') : '88px'};
    line-height: ${ props => props.fontSize ? (props.fontSize * 1.4 + 'px') : '80px'};;
  }

  span {
    color: ${ props => props.color ? props.color : '#fff'};
    font-family: ${ props => props.fontFamily ? props.fontFamily : props.theme.dharma };
    font-weight: ${ props => props.weight ? props.weight : '300'};
    font-size: ${ props => props.fontSize ? props.fontSize + 'px': '68px'};
    letter-spacing: 1px;
    line-height: ${ props => props.fontSize ? (props.fontSize * .88 + 'px') : '60px'};
    
    @media screen and (min-width: 320px) {
    font-size: calc(${ props => props.fontSize ? (props.fontSize * .88 + 'px') : '68px'} + 20 * ((100vw - 320px) / 880));
    line-height: calc(${ props => props.fontSize ? (props.fontSize + 'px') : '60px'} + 20 * ((100vw - 320px) / 880));
    }
    @media screen and (min-width: 1200px) {
      font-size: ${ props => props.fontSize ? (props.fontSize * 1.3 + 'px') : '88px'};
      line-height: ${ props => props.fontSize ? (props.fontSize * 1.4 + 'px') : '80px'};;
    }
  }
`

/**
 * <SmallerHeading>
 * 
 * A lot like a SecondaryHeading just smaller, this component kinda sucks TBH
 *
 * @param { string } color - text color
 * @param { string } textTransform - you want uppercase? Ok then do it.
 * @param { string } weight - how bold do you want your heading?
 * 
 */ 
export const SmallerHeading = styled.h2`
  color: ${ props => props.color ? props.color : '#fff'};
  font-weight: ${ props => props.weight ? props.weight : '400'};
  font-size: 40px;
  letter-spacing: 1px;
  line-height: 34px;
  margin: 10px;
  text-transform: ${ props => props.textTransform ? props.textTransform : 'none'};
  
  @media screen and (min-width: 320px) {
    font-size: calc(40px + 18 * ((100vw - 320px) / 880));
    line-height: calc(34px + 16 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 58px;
    line-height: 50px;
  }
`

/**
 * <TertiaryHeading>
 * 
 * Much like SecondaryHeading, just montserrat instead
 *
 * @param { string } color - text color
 * 
 */ 
export const TertiaryHeading = styled.h3`
  color: ${ props => props.color ? props.color : '#fff'};
  font-size: 20px;
  line-height: 22px;
  margin: 1vh 0;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(20px + 10 * ((100vw - 320px) / 880));
    line-height: calc(22px + 10 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 30px;
    line-height: 32px;
  }
`


/**
 * <FlexContainer>
 * 
 * A simple flexbox container you can use almost anywhere, customize it up
 *
 * @param { string } alignItems - align items for desktop 
 * @param { string } alignItemsMobile - align-items for mobile viewports 
 * @param { string } breakpoint - you can set where you want the flexbox to break
 * @param { string } flexDirection = flex-direction for desktop
 * @param { string } flexDirectionMobile = flex-direction for mobile
 * @param { string } justifyContent - justify-content for desktop
 * @param { string } justifyContentMobile - justify-content for mobile
 * @param { string } margin - how much cushion do you want bro?
 * 
 */ 
export const FlexContainer = styled.section`
  align-items: ${ props => props.alignItemsMobile ? props.alignItemsMobile : 'center' };
  flex-direction: ${ props => props.flexDirectionMobile ? props.flexDirectionMobile : 'column' };
  justify-content: ${ props => props.justifyContentMobile ? props.justifyContentMobile : 'center'};
  display: flex;
  margin: ${ props => props.margin ? props.margin : '0'};

  @media(min-width: ${ props => props.breakpoint ? props.breakpoint : props.theme.sm } ) {
    align-items: ${ props => props.alignItems ? props.alignItems : 'center' };
    flex-direction: ${ props => props.flexDirection ? props.flexDirection : 'row' };
    justify-content: ${ props => props.justifyContent ? props.justifyContent : 'space-between'};
  }
`

/**
 * <UnderlinedText>
 * 
 * If you can't get this, you're NGMI
 */ 
export const UnderlinedText = styled.span`
  text-decoration: underline;
`


/**
 * <SimpleTitle>
 * 
 * An H4 for those moments when you just need a small title
 * 
 * @param { string } margin - how much cushion do you want bro?
 * 
 */ 
export const SimpleTitle = styled.h4`
  color: ${props => props.theme.black  };
  font-family: ${props => props.theme.montserrat };
  font-size: 30px;
  line-height: 48px;
  margin: ${ props => props.margin ? props.margin : '0'};
  text-transform: 'uppercase';
`

/**
 * <SimpleText>
 * 
 * About as simple as it gets, right?
 * 
 * @param { string } margin - how much cushion do you want bro?
 *
 */ 
export const SimpleText = styled.p`
  font-size: 18px;
  line-height: 28px;
  margin: ${ props => props.margin ? props.margin : '0 0 25px 0'};
`

/**
 * <ColorSpan>
 * So self-explanatory, what a tag should be.
 * 
 * @param { string } color - drop your color in and out it comes, that's it
 */
export const ColorSpan = styled.span`
  color: ${ props => props.color ? props.color : props.theme.blue } !important;
`