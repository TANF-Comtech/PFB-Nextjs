import React, {useState} from "react";
import styled from "styled-components";
import Wrapper from '../components/global/wrapper'
import InputButton from "../components/primitives/input-button";
import {RedTextField} from '../components/primitives/text'



const LoginForm = styled.form`
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
  h5 {
    font-size: 16px;
  }
  @media screen and (min-width: 320px) {
    h5 {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880));
      line-height: calc(36px + 20 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h5 {
      font-size: 32px;
    }
  }  
`
const WhiteButton = styled(InputButton)`
  margin-top: 2vh;
`;

const LoginLoading = styled.div`
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: center;
`

function LoginPage() {
  const [email, updateEmail] = useState("")
  
  const [loginLoading, setLoginLoading] = useState(false)

  const submitEmail = async (email) => {
    setLoginLoading(true)
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

  const onLoginSubmit = (email)=>{
    submitEmail(email).then(data => {
      console.log("DATA",data)
    })
  }

  return (
    <>
      <Wrapper 
        postTitle="People for Bikes Homepage"
        isWide={ false }
      >
        {!loginLoading && (
        <>
        <h1>Login</h1>
        <h2>Access the PeopleForBikes Member Center</h2>

        <LoginForm>
        <h5>Enter Your Email Below.</h5>
        <p>If you are a member you will be emailed an access code to login.</p>
        <RedTextField onChange={(e)=>updateEmail(e.target.value)} placeholder="email"/>
        <WhiteButton
          buttonBg="rgba(255,255,255,0)"
          buttonBgHover="rgba(255,255,255,1)"
          buttonBorder="1px solid black"
          buttonColor="black"
          buttonColorHover="#404040"
          buttonText="Submit"
          onClick={()=>{onLoginSubmit(email)}}
        />
        </LoginForm>
        </>
        )}
        {loginLoading && (
        <>
        <LoginLoading>
        <h5>Check Your Email For An Access Code And Enter It Below</h5>
        <p>Don't close this tab!</p>
        </LoginLoading>
        </>
        )}
        
      </Wrapper>
    </>
  )
}

export default LoginPage
