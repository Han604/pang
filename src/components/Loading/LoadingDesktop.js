import React from 'react';
import styled, {keyframes} from 'styled-components';

const LoadingDesktop = () => {
  return (
    <Wrapper>
      <div>pang</div>
      <Ripple/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.5); 

`
  const ripple = keyframes`
    from {
      opacity: 1;
      transform: scale(0.5)
    }
    to {
      opacity: 0;
      transform: scale(1.2)
    }
  `

const Ripple = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  animation: ${ripple} 1s ease-in-out infinite;
`


export default LoadingDesktop