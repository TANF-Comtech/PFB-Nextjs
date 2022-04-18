import { useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import Script from 'next/script'
import styled from "styled-components";

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
  padding: 0;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 0;
  }

  dt {
    display: none;
  }

  label[for=cf-privacy-terms7104], 
  label[for=cf-general-consent1667] {
    display: inline;
  }

  input[type=text],
  input[type=email],
  select {
    background-color: ${(props) => props.theme.redAccent};
    color: white;

    /* Changing placeholder text remain surreal, even in 2020 */
    ::-webkit-input-placeholder {
      color: white;
    }
    ::-moz-placeholder {
      color: white;
    }
    ::-ms-input-placeholder {
      color: white;
    }
    ::placeholder {
      color: white;
    }
    border: none;
    display: block;
    font-family: ${props => props.theme.montserrat};
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 1vh;
    min-width: 300px;
    padding: 10px 16px;
    text-transform: capitalize;

    @media (min-width: ${props => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880));
    }

    @media (min-width: ${props => props.theme.lg}) {
      font-size: 18px;
    }
  }

  select {
    width: 95%;
  }

  input[type=submit] {
    background-color: transparent; 
    border: 1px solid white;
    border-radius: 0px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: ${props => props.theme.montserrat};
    font-size: 14px;
    font-weight: 700;
    min-width: 200px;
    margin: 2vh 0 0 0;
    padding: 10px 35px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transform: translateY(0);
    transition: all 0.25s ease;
    
    &:hover {
      background-color: white;
      color: ${props => props.theme.black};
      text-decoration: none;
      transform: translateY(-2px);
    }

    @media (min-width: ${props => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880));
      padding: 10px calc(35px + 15 * ((100vw - 320px) / 880));
    }

    @media (min-width: ${props => props.theme.lg}) {
      font-size: 18px;
      padding: 10px 60px;
    }
  }
`;

/**
 * FooterSignUpForm
 * 
 * The logic to this is counter-intuitive. 
 * 3rd party scripts should be loaded onto the page and you move along with your life.
 * But with Next, you have to think about 'pages' differently.
 * Since all pages are synthetic, and this script is global with dependencies, we need a lot of control to make this work
 * 
 * What we're doing is leveraging Next's Script component and setting the jQuery dependency to load before the rest of the page
 * Then, we setup a ref that stores the state of this components loading - we only want to inject the Spark form
 * But we want to make sure this logic fires every time a synthetic page is loaded
 * So useEffect watches router.pathname for changes, and gets us what we need
 * 
 * @returns <FormContainer />
 */
function FooterSignUpForm() {
  const router = useRouter()
  const isFirstRenderOfSparkScript = useRef(true)

  useEffect(() => {
    if (isFirstRenderOfSparkScript.current) {
      isFirstRenderOfSparkScript.current = false
    }
  }, [router.pathname])

  return (
    <>
      <FormContainer>
        <div id="pfb-site-footer" className="spkactionform"></div>
        <Script 
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          strategy="beforeInteractive"
        />
        { isFirstRenderOfSparkScript.current && 
          <Script 
            src="https://action.peopleforbikes.org/assets/js/widget.js/?id=111276"
            strategy="afterInteractive"
          />
        }
      </FormContainer> 
    </>
  );
}

export default FooterSignUpForm;
