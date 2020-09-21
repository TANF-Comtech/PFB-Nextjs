import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 4vh 0;
`

const Title = styled.h4`
  color: ${props => props.theme.red };
  font-size: 40px;
  line-height: 32px;
  margin: 0;
`

const Text = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 0;
`

const Datestamp = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
`

/**
 * <ContentItem>
 * 
 * A simple presentation for content items that show up in lists
 *
 * @param { string } date - when the content item occurred (optional)
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ContentItem = ({
  author,
  date,
  title,
  text
}) => {
  return (
    <Container>
      <Title>{ title }</Title>
      <Datestamp>{ date }</Datestamp>
      <Text>{ text }</Text>
    </Container>
  )
}

export default ContentItem