import React, {useContext, useEffect, useState} from "react";
import Link from "next/link"
import Router from 'next/router'
import styled, { ThemeContext } from "styled-components";
import { Markup } from 'interweave'

import AuthContext from "../context/auth/auth-context"

import Wrapper from '../components/global/wrapper'
import MainContent from '../components/global/main-content'
import InputButton from "../components/primitives/input-button";
import { BasicTextField } from '../components/primitives/text'
import Spinner from '../components/global/spinner'
import BigTitleBanner from '../components/content/big-title-banner'
import SiteMetaCustom from "../components/meta/site-meta-custom";
import Header1 from "../components/primitives/h1"
import BgImage from "../components/primitives/bg-image"

import SigninBG from "../public/promo/signin-bg.jpg"

const LoginForm = styled.form`
  background-color: rgba(255,255,255,0.85);
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 50px;

  p {
    text-align: center;
  }
`

const ColorBox = styled.div`
  background-color: rgba(255,255,255,0.85);
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 50px;
`

const LoginContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${ props => props.theme.sm}) {
    align-items: center;
    flex-direction: row;
  }
`

const Input = styled(BasicTextField)`
  color: ${ props => props.theme.black };
  width: 100%;
`

const Button = styled(InputButton)`
  margin-top: 10px;
  padding: 10px 20px;
  width: 100%;

  @media screen and (min-width: ${ props => props.theme.sm}) {
    margin-left: 10px;
    margin-top: 0;
    max-width: 100px;
    width: inherit;
  }
`;

const Error = styled(Markup)`
  color: red !important;
  font-family: ${ props => props.theme.montserrat } !important;
  font-size: 16px !important;
  line-height: 24px !important;
  padding: 8px 0 !important;
  text-transform: none !important;
`;

const Disclaimer = styled.p`
  font-size: 14px;
  line-height: 18px;
  margin-top: 4vh;
`

function LoginPage() {

  const authContext = useContext(AuthContext)
  const themeProps = useContext(ThemeContext)

  const [loading, updateLoading] = useState(false)

  const [errorState, updateErrorState] = useState("")

  const [email, updateEmail] = useState("")

  const [code, updateLoginCode] = useState("")
  
  const [loginPending, updateLoginPending] = useState(false)

  useEffect(() => {
    authContext.checkLogin()
  },[])

  const submitEmail = async (email) => {
    const response = await fetch (`/api/auth/member_center/login`,{
      method:'POST',
      mode:'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})

    })
    return response.json()
  }

  const submitLoginCode = async (code,email) => {
    const response = await fetch (`/api/auth/member_center/login`,{
      method:'POST',
      mode:'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code, email})

    })
    return response.json()
  }

  const onLoginEmailSubmit = (email) =>{
    updateLoading(true)
    updateErrorState("")
    submitEmail(email).then(data => {
      updateLoading(false)
      if(data.status){
        updateLoginPending(true)
      }
      else{
        updateErrorState(data.error)
      }
    })
  }

  const onLoginCodeSubmit = (code, email) =>{
    updateLoading(true)
    updateErrorState("")
    submitLoginCode(code, email).then(data => {
      if(data.status===true){
        authContext.updateAuthContext({"user":{
            "email": data?.email,
            "name": data?.name,
            "affiliation":data?.affiliation,
        },
        "loggedIn":true
      });
      Router.push('/members/member-home')
      }
      else{
        updateErrorState(data.error)
        updateLoading(false)
      }     
    })
  }

  return (
    <>
      <SiteMetaCustom 
        desc="Login To the PeopleForBikes Corporate Member Center"
        title="Login | PeopleForBikes Corporate Member Center"
        path="https://www.peopleforbikes.org/log-in"
      />
      <Wrapper 
        postTitle="Log In to the PeopleForBikes Corporate Member Center"
        isWide={ true }
      >
        <BigTitleBanner>
          <Header1>Sign In</Header1>
        </BigTitleBanner>
        <BgImage
          imgsrc={ SigninBG }
        >
          <MainContent maxWidth="600px">
          { !loading ? (
          <>
            { !loginPending ? (        
            <LoginForm>
              <p>If you are employed by a <Link href="/corporate-members"><a>coalition member company</a></Link>*, enter your company email to be sent an access code to sign in.</p>
              <LoginContainer>
                <Input
                  onChange={ (e) => updateEmail(e.target.value) } 
                  marginBottom="0"
                  minWidth="200px"
                  placeholder="Email Address"
                />
                <Button
                  buttonBg={ themeProps.blue }
                  buttonBgHover="rgba(255,255,255,1)"
                  buttonBorder="none"
                  buttonColor="#fff"
                  buttonColorHover={ themeProps.blue }
                  buttonText="Send"
                  minWidth="25px"
                  onClick={ () => { onLoginEmailSubmit(email) }}
                />
              </LoginContainer>
              { Boolean(errorState.length) && (
                <Error content={ errorState } />
              ) }
              <Disclaimer>
                * If you don’t work for a PeopleForBikes Coalition member company, you can sign up for our newsletter at the bottom of this page, <a href="https://ridespot.org/register">download our free Ride Spot app</a> and <a href="https://www.classy.org/give/117371">donate</a> on our individual supporter page.
              </Disclaimer>
            </LoginForm>
            ) : (
            <MainContent>
            <LoginForm>
              <h5>Check Your Email For An Access Code And Enter It Below</h5>
              <p>Don't close this tab!</p>
              <LoginContainer>
                <Input 
                  onChange={ (e)=>updateLoginCode(e.target.value) } 
                  marginBottom="0"
                  minWidth="200px"
                  placeholder="Login Code"
                />
                <Button
                  buttonBg={ themeProps.blue }
                  buttonBgHover="rgba(255,255,255,1)"
                  buttonBorder="none"
                  buttonColor="#fff"
                  buttonColorHover={ themeProps.blue }
                  buttonText="Login"
                  minWidth="25px"
                  onClick={()=>{onLoginCodeSubmit(code, email)}}
                />
              </LoginContainer>
              {Boolean(errorState.length) && (
                <Markup content={ errorState } />
              )}
            </LoginForm>
          </MainContent>
          )}
          </>
          ) : (
            <ColorBox>
            <Spinner 
              bgColor="rgba(255,255,255,0)"
              minHeight="20vh"
            />
            </ColorBox>
          )}
          </MainContent>
        </BgImage>
      </Wrapper>
    </>
  )
}

export default LoginPage
