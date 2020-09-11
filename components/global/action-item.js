import React from "react";
import styled from "styled-components";

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3vh 0;
  text-decoration: none;

  @media( min-width: ${ props => props.theme.sm}) {
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    margin: 4vh 0;
  }

  &:hover {
    text-decoration: none;
  }
`

const Icon = styled.img`
  flex-basis: 50px;
`

const ContentContainer = styled.div`
  margin: 2vh 0 0 0;
  text-align: center;

  @media( min-width: ${ props => props.theme.sm}) {
    margin: 0 0 0 2vw;
    text-align: left;
  }
`

const Title = styled.h2`
  color: ${props => props.theme.red };
`

const Text = styled.p`
  margin-bottom: 0;
`

/**
 * <ActionItem>
 * 
 * This creates an icon with a title and text next to it.
 * 
 * @param { string } icon - img icon source string
 * @param { string } iconAlt - icon alt text
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ActionItem = ({
  icon,
  iconAlt,
  title,
  text
}) => {
  return (
    <Container>
      <Icon
        src={ icon }
        alt={ iconAlt }
      />
      <ContentContainer>
        <Title>{ title }</Title>
        <Text>{ text }</Text>
      </ContentContainer>
    </Container>
  )
}

export default ActionItem