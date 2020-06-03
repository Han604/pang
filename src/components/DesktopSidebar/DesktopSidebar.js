import React from 'react';
import styled from 'styled-components';

import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const DesktopSidebar = () => {
    const user = useSelector(state => state.users);
    return (
        <Wrapper>
            <Spacer/>
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
                    <NavLink exact to = {`/explore`}>
                        EXPLORE
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/lookbook`}>
                        LOOKBOOK
                    </NavLink>
                </StyledLi>
                <StyledLi>
                    <NavLink exact to = {`/wardrobe`}>
                        WARDROBE
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
    )
}

const Spacer = styled.div`
    height: 20px;
`

const StyledLi = styled.li`
    margin-top: 12px;
    font-size: large;
`

const Wrapper = styled.div`
    height: 100%;
    width: 100%; 
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
        font-size: large;
    }
`

export default DesktopSidebar