import React from "react";
import styled from "styled-components";
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../lib/utils'

const Container = styled.section`
  align-items: flex-start;
  border-bottom: 1px solid rgb(216,216,216);
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  padding-bottom: 25px;

  @media (min-width: ${props => props.theme.sm}) {
    flex-direction: row;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const ContentContainer = styled.div`
  flex: 1 1 0px;
  margin: 4vh 0;

  a, a:visited, a:active, a:focus, a:hover {
    text-decoration: none;
  }
`

const ColorWrap = styled.div`
  color: ${props => props.textColor };
  margin: 0;
`

const Title = styled.h2`
  color: ${props => props.textColor };
  margin: 0;
`

const Position = styled.h3`
  color: ${props => props.theme.blueBright };
  margin: 5px 0 10px 0;
`

const Description = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 25px;
`

const Image = styled.img`
  flex: 1 1 0px;
  height: auto;
  margin: 25px 0 0 0;
  max-width: 200px;

  @media (min-width: ${props => props.theme.sm}) {
    margin: 25px 25px 25px 0;
  }

  @media (min-width: ${props => props.theme.md}) {
  
  }
`

const EmailButton = styled.a`
  background-color: ${props => props.theme.red };
  border-radius: 10px;
  box-shadow: ${props => props.theme.buttonBoxShadow};
  color: white !important;
  cursor: pointer;
  font-family: ${props => props.theme.montserrat};
  font-size: 18px;
  font-weight: 700;
  min-width: 100px;
  margin: 0;
  padding: 10px 35px;
  text-align: center;
  text-decoration: none !important;
  text-transform: uppercase;
  transform: translateY(0);
  transition: all 0.25s ease;
  
  &:hover, &:visited, &:focus, &:active {
    background-color: ${props => props.theme.red };
    color: white !important;
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-2px);
  }
`

/**
 * <TeamMember>
 * 
 * A simple presentation for team members that show up in lists
 *
 * @param { string } description - short text block we don't cap (optional)
 * @param { object } image - headshot
 * @param { string } isCeo - yes/no value for CEO status
 * @param { string } path - tells us the email to the member
 * @param { string } position - what job a PFB person does (for Team Members)
 * @param { string } textColor - determine text color
 * @param { string } title - title that goes next to the icon
 */
const TeamMember = ({
  description,
  image,
  isCeo = "No",
  path,
  position,
  textColor = "black",
  title
}) => {
  
  return (
    <>
    { isCeo === "No" && (
      <Container>
        { image && 
          <Image 
            alt={ image.alt ? image.alt : 'Bike-oriented image' }
            loading="lazy"
            src={ image['1x'] ? image['1x'].url : image.url } 
          /> 
        }
        <ContentContainer>
          { title && <Title textColor={textColor}>{ title }</Title> }
          { position && <Position>{ position }</Position> }
          { description && 
            <ColorWrap textColor={ textColor }>
              <RichText render={description} />  
            </ColorWrap>
          }
          { path && 
            <EmailButton href={ linkResolver(path, true) }>
              Email Me
            </EmailButton>
          }
        </ContentContainer>
      </Container>
    )}
    </>
  )
}

export default TeamMember