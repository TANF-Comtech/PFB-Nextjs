import Link from 'next/link'
import styled from "styled-components"

import BMXRider from '../public/bmx-rider.png'
import BMXRiderMobile from '../public/bmx-rider-mobile.png'

const Container = styled.section`
  align-items: center;
  background-color: ${ props => props.theme.redAccent };
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'proxima-nova', Helvetica, Arial, sans-serif;
  font-weight: 300;
  height: 850px;
  justify-content: center;
  padding: 10vh 0 0 0;
  margin-bottom: 25px;
  width: 100%;
`

const ImgContainer = styled.div`
  background-image: url(${ BMXRiderMobile });
  background-position: center center;
  background-repeat: none;
  height: 251px;
  position: relative;
  top: 50px;
  width: 300px;
  z-index: ${ props => props.theme.zIndex01 };

  @media (min-width: ${ props => props.theme.xs }) {
    background-image: url(${ BMXRider });
    height: 290px;
    width: 346px;
  }
`

const TextContainer = styled.div`
  padding: 0 15px;
  position: relative;
  top: -20px;

  @media (min-width: ${ props => props.theme.xs }) {
    top: -50px;
  }
`

const Title = styled.h1`
  font-size: 250px;
  font-weight: 700;
  line-height: .8;
  margin: 0;
  text-align: center;

  @media (min-width: ${ props => props.theme.xs }) {
    font-size: 380px;
  }
`

const Text = styled.h3`
  line-height: 1.6;
  text-align: center;

  a, a:visited, a:focus, a:hover {
    color: #fff;
    text-decoration: underline;
  }
`

export default function CustomErrorPage() {
  return (
    <Container>
      <ImgContainer />
      <TextContainer>
        <Title>404</Title>
        <Text>
          You took a wrong turn.
          <br />
          <Link href="/" passHref>
            <a>
              Click here to jump back in.
            </a>
          </Link>
        </Text>
      </TextContainer>
    </Container>
  )
}