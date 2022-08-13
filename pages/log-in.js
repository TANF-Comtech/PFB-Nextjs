import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled, { ThemeContext } from 'styled-components';
import { Markup } from 'interweave';

import AuthContext from '~/context/auth/auth-context';

import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';
import Spinner from '~/components/spinner';
import BigTitleBanner from '~/components/big-title-banner';
import SiteMetaCustom from '~/components/site-meta-custom';
import Header1 from '~/components/h1';
import BgImage from '~/components/bg-image';

import SigninBG from '~/public/promo/signin-bg.jpg';

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 50px;

  p {
    text-align: center;
  }

  span {
    color: ${(props) => props.theme.redAccent};
    font-family: ${(props) => props.theme.montserrat};
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    margin: 20px 0 0 0;
    text-transform: none;
  }

  h2 {
    font-family: ${(props) => props.theme.montserrat};
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    text-align: center;
  }
`;

const ColorBox = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 50px;
`;

const LoginContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${(props) => props.theme.sm}) {
    align-items: center;
    flex-direction: row;
  }
`;

const TextField = styled.input.attrs({
  type: 'text',
})`
  border: none;
  color: white;
  display: block;
  font-family: ${(props) => props.theme.montserrat};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '1vh')};
  min-width: ${(props) => (props.minWidth ? props.minWidth : '300px')};
  padding: 10px 16px;

  @media (min-width: ${(props) => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    font-size: 18px;
  }
`;

const BasicTextField = ({ className, marginBottom, minWidth, placeholder, onChange }) => {
  return (
    <TextField
      className={className}
      marginBottom={marginBottom}
      minWidth={minWidth}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const Input = styled(BasicTextField)`
  color: ${(props) => props.theme.black};
  width: 100%;
`;

const Button = styled(InputButton)`
  margin-top: 10px;
  padding: 10px 20px;
  whitespace: nowrap;

  @media screen and (min-width: ${(props) => props.theme.sm}) {
    margin-left: 10px;
    margin-top: 0;
    max-width: 100px;
    width: inherit;
  }
`;

const Error = styled(Markup)`
  color: red !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-size: 16px !important;
  line-height: 24px !important;
  padding: 8px 0 !important;
  text-transform: none !important;
`;

const Disclaimer = styled.p`
  font-size: 14px;
  line-height: 18px;
  margin-top: 4vh;
`;

const InputButtonContainer = styled.div`
  display: block;
  text-align: ${(props) => props.buttonPosition || 'left'};
`;

const InputButtonElement = styled.input`
  background-color: ${(props) => props.buttonBg || 'rgba(255,255,255,1)'};
  border: ${(props) => props.buttonBorder || `1px solid ${props.theme.black}`};
  box-shadow: ${(props) => props.theme.buttonBoxShadow};
  color: ${(props) => props.buttonColor || props.theme.black};
  cursor: pointer;
  display: inline-block;
  font-family: ${(props) => props.theme.montserrat};
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transform: translateY(0);
  transition: all 0.25s ease;

  &:hover {
    background-color: ${(props) => props.buttonBgHover || props.theme.black};
    color: ${(props) => props.buttonColorHover || 'white'};
    text-decoration: none;
    transform: translateY(-2px);
  }

  @media (min-width: ${(props) => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    font-size: 18px;
  }
`;

/**
 * <BasicButton>
 *
 * Simple button that optionally takes props to modify it
 * The construction wraps two styled-components with a regular React component
 * Then we pass the props from <BasicButton> down to <Container> and <Anchor> in this file
 * <Container> controls button position <Button> controls button look and feel
 * See how it works: https://styled-components.com/docs/basics#passed-props
 *
 * @param {string} buttonBg - override for button background
 * @param {string} buttonBgHover - override for button background on hover
 * @param {string} buttonBorder - override for button border
 * @param {string} buttonColor - override for button color
 * @param {string} buttonColorHover - override for button text color on hover
 * @param {string} buttonPosition - uses { left | center | right } to move button container
 * @param {string} buttonText - because <input> is a void element, we can't pass in text, must be a prop instead
 * @param {string} className - helps styled-components extend, and obviously passes a class
 * @param {string} margin - how much margin (default is 1vh on bottom)
 * @param {string} minWidth - how wide should it go (default is 300px)
 * @param {string} name - input name param, just passed down
 *
 * #################!!!!!!!!####################
 * readOnly flag on component in place because no real data handling has been set up
 * #################!!!!!!!!####################
 */
function InputButton({
  buttonBg,
  buttonBgHover,
  buttonBorder,
  buttonColor,
  buttonColorHover,
  buttonPosition,
  buttonText,
  className,
  minWidth,
  name,
  onClick,
}) {
  return (
    <>
      <InputButtonContainer buttonPosition={buttonPosition}>
        <InputButtonElement
          buttonBg={buttonBg}
          buttonBgHover={buttonBgHover}
          buttonBorder={buttonBorder}
          buttonColor={buttonColor}
          buttonColorHover={buttonColorHover}
          className={className}
          minWidth={minWidth}
          name={name}
          value={buttonText}
          readOnly
          onClick={onClick}
        />
      </InputButtonContainer>
    </>
  );
}

const RedInput = styled(BasicTextField)`
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
`;

const RedTextField = ({ className, marginBottom, placeholder, onChange }) => {
  return (
    <RedInput
      className={className}
      marginBottom={marginBottom}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

function LoginPage() {
  const authContext = useContext(AuthContext);
  const themeProps = useContext(ThemeContext);

  const [loading, updateLoading] = useState(false);

  const [errorState, updateErrorState] = useState('');

  const [email, updateEmail] = useState('');

  const [code, updateLoginCode] = useState('');

  const [loginPending, updateLoginPending] = useState(false);

  useEffect(() => {
    authContext.checkLogin();
  }, [authContext]);

  const submitEmail = async (email) => {
    const response = await fetch(`/api/auth/member_center/login`, {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  };

  const submitLoginCode = async (code, email) => {
    const response = await fetch(`/api/auth/member_center/login`, {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }),
    });
    return response.json();
  };

  const onLoginEmailSubmit = (email) => {
    updateLoading(true);
    updateErrorState('');
    submitEmail(email).then((data) => {
      updateLoading(false);
      if (data.status) {
        updateLoginPending(true);
      } else {
        updateErrorState(data.error);
      }
    });
  };

  const onLoginCodeSubmit = (code, email) => {
    updateLoading(true);
    updateErrorState('');
    submitLoginCode(code, email).then((data) => {
      if (data.status === true) {
        authContext.updateAuthContext({
          user: {
            email: data?.email,
            name: data?.name,
            affiliation: data?.affiliation,
          },
          loggedIn: true,
        });
        Router.push('/members/member-home');
      } else {
        updateErrorState(data.error);
        updateLoading(false);
      }
    });
  };

  return (
    <>
      <SiteMetaCustom
        desc="Login To the PeopleForBikes Corporate Member Center"
        title="Login | PeopleForBikes Corporate Member Center"
        path="https://www.peopleforbikes.org/log-in"
      />
      <Wrapper postTitle="Log In to the PeopleForBikes Corporate Member Center" isWide={true}>
        <BigTitleBanner>
          <Header1>Sign In</Header1>
        </BigTitleBanner>
        <BgImage imgsrc={SigninBG}>
          <MainContent maxWidth="600px">
            {!loading ? (
              <>
                {!loginPending ? (
                  <LoginForm>
                    <p>
                      If you are employed by a{' '}
                      <Link href="/corporate-members">
                        <a>coalition member company</a>
                      </Link>
                      *, enter your company email and you will be{' '}
                      <strong>emailed an access code to sign in</strong>.
                    </p>
                    <LoginContainer>
                      <Input
                        onChange={(e) => updateEmail(e.target.value)}
                        marginBottom="0"
                        minWidth="200px"
                        placeholder="Email Address"
                      />
                      <Button
                        buttonBg={themeProps.blue}
                        buttonBgHover="rgba(255,255,255,1)"
                        buttonBorder="none"
                        buttonColor="#fff"
                        buttonColorHover={themeProps.blue}
                        buttonText="Send"
                        minWidth="25px"
                        onClick={() => {
                          onLoginEmailSubmit(email);
                        }}
                      />
                    </LoginContainer>
                    {Boolean(errorState.length) && <Error content={errorState} />}
                    <Disclaimer>
                      * If you don’t work for a PeopleForBikes Coalition member company, you can
                      sign up for our newsletter at the bottom of this page,{' '}
                      <a href="https://ridespot.org/register">download our free Ride Spot app</a>{' '}
                      and <a href="https://www.classy.org/give/117371">donate</a> on our individual
                      supporter page.
                    </Disclaimer>
                  </LoginForm>
                ) : (
                  <MainContent>
                    <LoginForm>
                      <h2>Check Your Email For An Access Code And Enter It Below</h2>
                      <LoginContainer>
                        <Input
                          onChange={(e) => updateLoginCode(e.target.value)}
                          marginBottom="0"
                          minWidth="200px"
                          placeholder="Login Code"
                        />
                        <Button
                          buttonBg={themeProps.blue}
                          buttonBgHover="rgba(255,255,255,1)"
                          buttonBorder="none"
                          buttonColor="#fff"
                          buttonColorHover={themeProps.blue}
                          buttonText="Login"
                          minWidth="25px"
                          onClick={() => {
                            onLoginCodeSubmit(code, email);
                          }}
                        />
                      </LoginContainer>
                      {Boolean(errorState.length) ? (
                        <Markup content={errorState} />
                      ) : (
                        <span style={{ textAlign: 'center' }}>Don&apos;t Close This Tab!</span>
                      )}
                    </LoginForm>
                  </MainContent>
                )}
              </>
            ) : (
              <ColorBox>
                <Spinner bgColor="rgba(255,255,255,0)" minHeight="20vh" />
              </ColorBox>
            )}
          </MainContent>
        </BgImage>
      </Wrapper>
    </>
  );
}

export default LoginPage;
