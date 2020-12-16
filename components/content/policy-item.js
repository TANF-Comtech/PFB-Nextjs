import React from "react";
import Link from "next/link"
import styled from "styled-components";
import RichText from "prismic-reactjs"

import { linkResolver } from '../../lib/utils'

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
    color: #333;
    text-decoration: none;
  }

  a:hover {
    color: ${props => props.theme.redAccent};
  }
`

const Text = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 25px;
`

const Metadata = styled.div`
  align-items: center;
  display: flex;
`

const MetaText = styled.h3`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 2vh 0 ;

  &:after {
    content: "|";
    padding: 0 10px;
  }

  &:last-child:after {
    content: "";
    padding: 0;
  }
`

/**
 * <ContentItem>
 * 
 * A simple presentation for content items that show up in lists
 *
 * @param { string } city - place (if local)
 * @param { number } date - year when law took place
 * @param { string } govLevel - zone of policy (federal || state || local)
 * @param { string } location - place (if state)
 * @param { string } path - relative string to policy page
 * @param { string } text - content to be shown
 * @param { string } title - title that goes next to the icon
 */
const PolicyItem = ({
  city,
  date,
  govLevel,
  location,
  path,
  title,
  text,
}) => {
  return (
    <Container>
      <ContentContainer>
        { !path ? 
          ( <h2>{ title }</h2> )  :
          (
            <Link href={ path }>
              <a>
                <h2>{ title }</h2>
              </a>
            </Link>
          )
        }
        <Metadata>
          { date && <MetaText>{ date }</MetaText> }
          { govLevel === 'Federal' && <MetaText>{ govLevel }</MetaText> }
          { govLevel === 'State' && <MetaText>{ `${govLevel} - ${location}` }</MetaText> }
          { govLevel === 'Local' && <MetaText>{ `${govLevel} - ${city}` }</MetaText> }
        </Metadata>
        { text && <Text>{ text }</Text> }
        { path && 
          <Button
            buttonBg="#D23823"
            buttonBgHover="rgb(216,216,216)"
            buttonBorder="none"
            buttonColor="white"
            buttonPadding="10px 20px"
            buttonTextTransform="uppercase"
            href={ path }
          >
            Read More
          </Button>
        }
      </ContentContainer>
    </Container>
  )
}

export default PolicyItem