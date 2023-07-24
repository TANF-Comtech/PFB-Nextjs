import React from 'react';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { linkResolver } from '~/utils';

import MainContent from '~/components/main-content';

const RedBlueBG = styled.section`
  background-color: ${(props) => props.theme.midnightBlue} !important;
`;

const GrayBG = styled.section`
  background-color: ${(props) => props.theme.lightestGray} !important;

  iframe {
    display: block !important;
    height: 300px !important;
    margin: 0 auto !important;
    max-width: 900px !important;
    padding: 25px !important;
    width: 100% !important;

    @media (min-width: ${(props) => props.theme.xs}) {
      height: 500px !important;
    }
  }
`;

const Container = styled.section`
  align-items: flex-start !important;
  border-bottom: 1px solid rgb(216, 216, 216) !important;
  display: flex !important;
  flex-direction: column !important;
  margin-bottom: 25px !important;
  padding-bottom: 25px !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    flex-direction: row !important;
  }

  &:last-child {
    border-bottom: none !important;
    padding-bottom: 0 !important;
  }
`;

const ContentContainer = styled.div`
  flex: 1 1 0px !important;
  margin: 4vh 0 !important;

  a,
  a:visited,
  a:active,
  a:focus,
  a:hover {
    text-decoration: none !important;
  }
`;

const ColorWrap = styled.div`
  color: ${(props) => props.textColor} !important;
  margin: 0 !important;
`;

const Title = styled.h2`
  color: ${(props) => props.textColor} !important;
  margin: 0 !important;
`;

const Position = styled.h3`
  color: ${(props) => props.theme.blueBright} !important;
  margin: 5px 0 10px 0 !important;
`;

const Description = styled.p`
  font-size: 18px !important;
  line-height: 24px !important;
  margin-bottom: 25px !important;
`;

const Image = styled.img`
  flex: 1 1 0px !important;
  height: auto !important;
  margin: 25px 0 0 0 !important;
  max-width: 200px !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 25px 25px 25px 0 !important;
  }
`;

const EmailButton = styled.a`
  background-color: ${(props) => props.theme.red} !important;
  border-radius: 10px !important;
  box-shadow: ${(props) => props.theme.buttonBoxShadow} !important;
  color: white !important;
  cursor: pointer !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  min-width: 100px !important;
  margin: 0 !important;
  padding: 10px 35px !important;
  text-align: center !important;
  text-decoration: none !important;
  text-transform: uppercase !important;
  transform: translateY(0) !important;
  transition: all 0.25s ease !important;

  &:hover,
  &:visited,
  &:focus,
  &:active {
    background-color: ${(props) => props.theme.red};
    color: white !important;
    text-decoration: none !important;
  }

  &:hover {
    transform: translateY(-2px) !important;
  }
`;

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
  isCeo = 'No',
  path,
  position,
  textColor = 'black',
  title,
}) => {
  return (
    <>
      {isCeo === 'No' && (
        <Container>
          {image && (
            <Image
              alt={image.alt ? image.alt : 'Bike-oriented image'}
              loading="lazy"
              src={image['1x'] ? image['1x'].url : image.url}
            />
          )}
          <ContentContainer>
            {title && <Title textColor={textColor}>{title}</Title>}
            {position && <Position>{position}</Position>}
            {description && (
              <ColorWrap textColor={textColor}>
                <PrismicRichText field={description} />
              </ColorWrap>
            )}
            {path && <EmailButton href={linkResolver(path, true)}>Email Me</EmailButton>}
          </ContentContainer>
        </Container>
      )}
    </>
  );
};

/**
 * <TeamList>
 *
 * Provides full list of Team members, with CEO offset at the top
 *
 * @param { array } ceoPayload - single CEO block
 * @param { array } teamPayload - list of team members from Prismic API
 */
const TeamList = ({ ceoPayload, teamPayload }) => {
  return (
    <>
      <RedBlueBG>
        <MainContent maxWidth="900px">
          <TeamMember
            description={ceoPayload.team_member.description}
            image={ceoPayload.team_member.headshot && ceoPayload.team_member.headshot}
            path={ceoPayload.team_member.email}
            position={ceoPayload.team_member.position}
            textColor="white"
            title={ceoPayload.team_member.title[0].text}
          />
        </MainContent>
      </RedBlueBG>
      <GrayBG>
        <iframe
          src="https://www.youtube.com/embed/txmmOKBgSO4"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </GrayBG>

      <MainContent maxWidth="900px">
        {teamPayload.map((person) => {
          const { node } = person;
          return (
            <TeamMember
              description={node.description}
              key={node._meta.id}
              image={node.headshot && node.headshot}
              isCeo={node.ceo}
              path={node.email}
              position={node.position}
              title={node.title[0].text}
            />
          );
        })}
      </MainContent>
    </>
  );
};

export default TeamList;
