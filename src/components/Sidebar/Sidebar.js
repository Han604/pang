import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Sidebar = ({setSidebarToggle, sidebarToggle}) => {
    const user = useSelector(state => state.users);
    if(sidebarToggle === 'true') {
        return (
            <>
        <Wrapper>
            <StyledList>
                <StyledLi>
                    <NavLink exact to = '/home'>
                        HOME
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/profile/${user._id}`}>
                        PROFILE
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/home`}>
                        EXPLORE
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/home`}>
                        LOOKBOOK
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/home`}>
                        WARDROBE
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/home`}>
                        MESSAGES
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/home`}>
                        NOTIFICATIONS
                    </NavLink>
                </StyledLi>
            </StyledList>
            <Pang>pang</Pang>
        </Wrapper>
        <OpacityDiv onClick={() => setSidebarToggle('false')}/>
        </>
    )} else {
        return <div style={{display:'none'}}>should be empty</div>
    }
}
const StyledLi = styled.li`
    margin-top: 12px;
    font-size: 20px;
`

const OpacityDiv = styled.div`
    height: 100%;
    width: 100%;
    opacity: .25;
    background-color: grey;
    position: absolute;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    min-width: 200px;
    width: 75%; 
    position: absolute;
    background-color: white;
    z-index: 3;
`

const Pang = styled.div`
    position: absolute;
    bottom: 12px;
    right: 12px;
`

const StyledList = styled.ul`
    list-style: none;
    text-decoration: none;
    margin: 12px 0 0 12px;

    a {
        color: black;
        text-decoration: none;
    }
`

export default Sidebar