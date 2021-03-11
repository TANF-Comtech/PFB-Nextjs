import React from "react";
import Link from "next/link"
import styled from "styled-components";

import Button from "../primitives/button"

import StandinImage from '../../public/pfb-news-standin.jpg'

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

const Title = styled.h4`
  color: ${props => props.theme.red };
  font-size: 40px;
  line-height: 38px;
  margin: 0;
`

const Text = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 25px;
`

const Datestamp = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
`

const Image = styled.img`
  flex: 1 1 0px;
  height: auto;
  margin: 25px 0 0 0;
  max-width: 100%;

  @media (min-width: ${props => props.theme.sm}) {
    margin: 25px 25px 25px 0;
    max-width: 300px;
  }

  @media (min-width: ${props => props.theme.md}) {
    max-width: 500px;
  }
`

/**
 * <ContentItem>
 * 
 * A simple presentation for content items that show up in lists
 *
 * @param { string } date - when the content item occurred (optional)
 * @param { object } image - image to go with post (optional)
 * @param { string } path - tells us the URL to the item
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ContentItem = ({
  date,
  image,
  path,
  title,
  text
}) => {
  console.log(image)
  return (
    <Container>
      { image.url ? (
        <Image 
          alt={ image.alt ? image.alt : 'Bike-oriented image' }
          loading="lazy"
          src={ image['1x'] ? image['1x'].url : image.url } 
        /> 
        ) : (
        <Image 
          alt={ 'Two women riding their road bikes in spandex' }
          loading="lazy"
          src={ StandinImage } 
        /> 
        )
      }
      <ContentContainer>
        { !path ? 
          ( <Title>{ title }</Title> )  :
          (
            <Link href={ path }>
              <a>
                <Title>{ title }</Title>
              </a>
            </Link>
          )
        }
        { date && <Datestamp>{ date }</Datestamp> }
        { text && <Text>{ `${text.substring(0,300)} ...` }</Text> }
        { path && 
          <Button
            buttonBg="#404040"
            buttonBgHover="rgb(216,216,216)"
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

export default ContentItem