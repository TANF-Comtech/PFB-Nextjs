import React, {useContext, useState} from "react";
import Router from 'next/router'
import styled from "styled-components";
import Wrapper from '../components/global/wrapper'
import InputButton from "../components/primitives/input-button";
import {RedTextField} from '../components/primitives/text'
import Spinner from '../components/global/spinner'

import AuthContext from "../context/auth/auth-context"

const LoginForm = styled.form`
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media screen and (min-width: ${ props => props.theme.xs}) {
    width: 75%;
  }

  @media screen and (min-width: ${ props => props.theme.sm}) {
    width: 50%;
  }  
`
const WhiteButton = styled(InputButton)`
  margin-top: 2vh;
`;

const Error = styled.p`
  color:red;
`;

const LoginPending = styled.div`
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: center;
  width:50%;
`

function LoginPage() {

  const authContext = useContext(AuthContext)

  const [loading, updateLoading] = useState(false)

  const [errorState, updateErrorState] = useState("")

  const [email, updateEmail] = useState("")

  const [code, updateLoginCode] = useState("")
  
  const [loginPending, updateLoginPending] = useState(false)

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

  const onLoginEmailSubmit = (email)=>{
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

  const onLoginCodeSubmit = (code, email)=>{
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
      Router.push('/members')
      }else{
        updateErrorState(data.error)
        updateLoading(false)
      }     
      })
  }

  return (
    <>
      <Wrapper 
        postTitle="People for Bikes Homepage"
        isWide={ false }
      >
        {!loading ? (
        <>
          {!loginPending ? (
          <>
            <h1>Login</h1>
            <h2>Access the PeopleForBikes Member Center</h2>

            <LoginForm>
              <h3>Enter Your Email Below.</h3>
              <p>If you are a member you will be emailed an access code to login.</p>
              <RedTextField onChange={(e)=>updateEmail(e.target.value)} placeholder="email"/>
              {Boolean(errorState.length) && (
                <Error>{errorState}</Error>
              )}
              <WhiteButton
                buttonBg="rgba(255,255,255,0)"
                buttonBgHover="rgba(255,255,255,1)"
                buttonBorder="1px solid black"
                buttonColor="black"
                buttonColorHover="#404040"
                buttonText="Submit"
                onClick={()=>{onLoginEmailSubmit(email)}}
              />
            </LoginForm>
          </>
          ) : (
          <>
            <LoginPending>
              <h5>Check Your Email For An Access Code And Enter It Below</h5>
              <p>Don't close this tab!</p>
              <RedTextField onChange={(e)=>updateLoginCode(e.target.value)} placeholder="Login Code"/>
              {Boolean(errorState.length) && (
                <Error>{errorState}</Error>
              )}
              <WhiteButton
                buttonBg="rgba(255,255,255,0)"
                buttonBgHover="rgba(255,255,255,1)"
                buttonBorder="1px solid black"
                buttonColor="black"
                buttonColorHover="#404040"
                buttonText="Login Now"
                onClick={()=>{onLoginCodeSubmit(code, email)}}
              />
            </LoginPending>
          </>
          )}
        </>) : (
          <Spinner />
      )}
      </Wrapper>
    </>
  )
}

export default LoginPage
