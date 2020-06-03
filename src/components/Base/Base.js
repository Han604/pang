import React from 'react';
import styled from 'styled-components';

import DesktopSidebar from '../DesktopSidebar/DesktopSidebar'
import {useSelector} from 'react-redux';

const Base = () => {
  const sidebar = useSelector(state => state.sidebar)
  if(sidebar.toggle === true) {
    return (
      <DesktopSidebar/>
    )
  } else {
    return (
      <Wrapper>
        <StyledDiv>pang</StyledDiv>
        <StyledDiv>by</StyledDiv>
        <StyledDiv>ERIC HAN</StyledDiv>
      </Wrapper>
    )
  }
}

const StyledDiv = styled.div`
  color: grey;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-right: 1px solid lightgrey;
`

export default Base