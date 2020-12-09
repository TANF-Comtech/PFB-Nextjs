import React from "react";
import styled from "styled-components";
import { RichText } from 'prismic-reactjs'

import Button from "../primitives/button"

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

const Title = styled.h2`

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

/**
 * <TeamMember>
 * 
 * A simple presentation for team members that show up in lists
 *
 * @param { string } description - short text block we don't cap (optional)
 * @param { object } image - headshot
 * @param { string } path - tells us the email to the member
 * @param { string } position - what job a PFB person does (for Team Members)
 * @param { string } title - title that goes next to the icon
 */
const TeamMember = ({
  description,
  image,
  path,
  position,
  title
}) => {
  return (
    <Container>
      { image && 
        <Image 
          alt={ image.alt ? image.alt : 'Bike-oriented image' }
          src={ image['1x'] ? image['1x'].url : image.url } 
        /> 
      }
      <ContentContainer>
        { title && <Title>{ title }</Title> }
        { position && <Position>{ position }</Position> }
        { description && 
          <Description>
            <RichText render={description} />
          </Description> 
        }
        { path && 
          <Button
            buttonBorder="none"
            buttonBg="#D23823"
            buttonBgHover="#D0021B"
            buttonColor="white"
            buttonPadding="10px 20px"
            buttonTextTransform="uppercase"
            href={ path }
          >
            Email Me!
          </Button>
        }
      </ContentContainer>
    </Container>
  )
}

export default TeamMember