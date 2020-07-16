import React from "react";
/****
 * Next doesn't allow you to have a css file outside of _app.js file? I'm not really sure how to resolve this to be honest.
 ****/
import Accordion from "../components/global/accordion.js";

/****
 * My two image container isn't passing through the way I wanted it to. The background image isn't showing up and neither is the text. This def has something to do with how i'm passing through the props.
 ****/
import TwoImage from "../components/global/twoImg";
import Navbar from "../components/global/navbar";
/****
 *Blue Question Banner
 ****/
import QuestionBanner from "../components/global/blueQuestion";
import Footer from "../components/global/footer";
import H1 from "../components/global/h1";
import Bike from "../public/bikeSample.jpg";
import styled from "styled-components";

const PageContainer = styled.div`
  margin: 50px 100px;
`;

const Subtitle = styled.h3`
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Bold = styled.span`
  font-weight: bold;
`;

/****
 * The whole page requires styling in terms of margins and spacing. Other than that it's working well.
 ****/
export default function BasicPg() {
  return (
    <>
      <Navbar />
      <PageContainer>
        {/* The navbar that you built */}
        {/* Typography on H4 needs to be adjusted for this page */}
        <h4>Guidlines | Funding | Application | Awards</h4>
        <H1>Community Grants</H1>
        {/* Your text styling works btw */}
        <h2>Grant Guidlines</h2>
        <p>
          The PeopleForBikes Community Grant Program supports bicycle
          infrastructure projects and targeted advocacy initiatives that make it
          easier and safer for people of all ages and abilities to ride. Please
          review the following information carefully before submitting a grant
          application. Proposals that are incomplete or do not fall within our
          funding priority areas will not be considered. Visit the Get Local map
          and click on any state for examples of funded projects in each
          location.
        </p>
        <Accordion title="Can John be nice?">
          Answer: Ask a different question. It'll never happen
        </Accordion>
        <Accordion title="Can John be nice?">
          Answer: Ask a different question. It'll never happen
        </Accordion>
      </PageContainer>
      <QuestionBanner>
        <Bold>QUESTIONS? </Bold>For assistance in setting up your Employee Pro
        Purchase Program, please contact Erik Esborg at 303/449-4893 x103,
        erik@peopleforbikes.org.
      </QuestionBanner>
      <PageContainer>
        <Subtitle>View Our Most Recent Grants</Subtitle>
        <Description>
          Here's how you can take action right now to imporve cycling in your
          community
        </Description>
        <ImageContainer>
          <TwoImage overlayImg={Bike}>This works?</TwoImage>
          <TwoImage overlayImg={Bike}>This works?</TwoImage>
        </ImageContainer>
      </PageContainer>
      <Footer />
    </>
  );
}
