import styled, { keyframes } from 'styled-components'

const skChase = keyframes`
  100% { transform: rotate(360deg); } 
`;

const skChaseDot = keyframes`
  80%, 100% { transform: rotate(360deg); } 
`

const skChaseDotBefore = keyframes`
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
`

const Background = styled.main`
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  min-height: 80vh;
`

const Container = styled.section`
  animation: ${skChase} 2.5s infinite linear both; 
  height: 40px;
  position: relative;
  width: 40px;
`

const Dot = styled.div`
  animation: ${skChaseDot} 2.0s infinite ease-in-out both; 
  height: 100%;
  left: 0;
  position: absolute;
  top: 0; 
  width: 100%;

  &:before {
    animation: ${skChaseDotBefore} 2.0s infinite ease-in-out both; 
    background-color: #333;
    border-radius: 100%;
    content: '';
    display: block;
    height: 25%;
    width: 25%;
  }

  &:nth-child(1) { animation-delay: -1.1s; }
  &:nth-child(2) { animation-delay: -1.0s; }
  &:nth-child(3) { animation-delay: -0.9s; }
  &:nth-child(4) { animation-delay: -0.8s; }
  &:nth-child(5) { animation-delay: -0.7s; }
  &:nth-child(6) { animation-delay: -0.6s; }
  &:nth-child(1):before { animation-delay: -1.1s; }
  &:nth-child(2):before { animation-delay: -1.0s; }
  &:nth-child(3):before { animation-delay: -0.9s; }
  &:nth-child(4):before { animation-delay: -0.8s; }
  &:nth-child(5):before { animation-delay: -0.7s; }
  &:nth-child(6):before { animation-delay: -0.6s; }  
`

/**
 * <Spinner>
 * 
 * Add a loading spinner to any template you need.
 * The spinner is based off of the SpinKit project
 * https://github.com/tobiasahlin/SpinKit
 *
 */

const Spinner = () => {
  return (
    <Background>
      <Container>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </Container>
    </Background>
  )
}

export default Spinner
