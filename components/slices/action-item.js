import React from "react";
import styled from "styled-components";
import Link from "next/link"

import { linkResolver } from '../../lib/utils'

import LinkIcon from '../../public/icons/link.svg'
import NewsIcon from '../../public/icons/news.svg'
import EventIcon from '../../public/icons/event.svg'

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

  a, a:focus, a:hover, a:visited {
    text-decoration: none;
  }
`

const Title = styled.h2`
  color: ${props => props.theme.red };
  font-weight: 700;
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
 * @param { string } path - where the title goes
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ActionItem = ({
  icon,
  path,
  title,
  text
}) => {
  return (
    <Container>
      { icon === 'Event (calendar icon)' && <Icon src={ EventIcon } alt="Event Icon" /> }
      { icon === 'News (newspaper icon)' && <Icon src={ NewsIcon } alt="News Icon" /> }
      { icon === 'Join (link icon)' && <Icon src={ LinkIcon } alt="Link Icon" /> }
      <ContentContainer>
        <Link href={ linkResolver(path, false) } passHref>
          <a>
            <Title>{ title }</Title>
          </a>
        </Link>
        <Text>{ text }</Text>
      </ContentContainer>
    </Container>
  )
}

export default ActionItem