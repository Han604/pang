import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux'

const Header = ({title}) => {

    return(
        <Headerpiece>
            <TextDiv>{title}</TextDiv>
        </Headerpiece>
    )
}

const TextDiv = styled.div`
`

const Headerpiece = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-bottom: 3px solid lightgrey;
    z-index: 1;
`

export default Header