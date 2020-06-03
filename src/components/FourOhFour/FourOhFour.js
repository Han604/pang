import React from 'react';
import styled from 'styled-components';

import {useHistory} from 'react-router-dom';

const FourOhFour = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <StyledDiv>
        404 SORRY PAGE NOT FOUND
      </StyledDiv>
      <StyledDiv onClick = {() => history.push('/home')}>
        CLICK TO RETURN TO HOME
      </StyledDiv>
      <StyledDiv onClick = {() => history.goBack()}>
        CLICK TO GO BACK TO WHAT YOU WERE LOOKING AT
      </StyledDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`

const StyledDiv = styled.div`
  margin-bottom: 10px;
`

export default FourOhFour