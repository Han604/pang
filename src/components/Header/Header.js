import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'

const Header = ({title}) => {
    const [sidebarToggle, setSidebarToggle] = React.useState('false')
    return(
        <>
            {sidebarToggle === 'true' ? <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/> : <Sidebar setSidebarToggle={setSidebarToggle} sidebarToggle={sidebarToggle}/>}
            <Headerpiece onClick = {() => setSidebarToggle('true')}>
                <TextDiv>{title.toUpperCase()}</TextDiv>
            </Headerpiece>
        </>
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