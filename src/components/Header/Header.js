import React from 'react';
import Media from 'react-media';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'

import {sidebarToggleOn, sidebarToggleOff} from '../../actions'

const Header = ({title}) => {
    const [sidebarToggle, setSidebarToggle] = React.useState('false')
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar)

    const sidebarToggleHandler = () => {
        if(sidebar.toggle === true) {
            dispatch(sidebarToggleOff())
        } else {
            dispatch(sidebarToggleOn())
        }
    }

    return(
        <Media queries={{
            phone: '(max-width: 812px)',
            desktop: '(min-width: 813px)'
        }}>
            {matches => (
                <>
                    {matches.phone &&
                        <>
                            {sidebarToggle === 'true' ? <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/> : <Sidebar setSidebarToggle={setSidebarToggle} sidebarToggle={sidebarToggle}/>}
                            <Headerpiece onClick = {() => setSidebarToggle('true')}>
                                <TextDiv>{title.toUpperCase()}</TextDiv>
                            </Headerpiece>
                        </>
                    }
                    {matches.desktop &&
                        <>
                            <Headerpiece onClick = {() => sidebarToggleHandler()}>
                                <TextDiv>{title.toUpperCase()}</TextDiv>
                            </Headerpiece>
                        </>
                    }
                </>
            )}
        </Media>
    )
}

const TextDiv = styled.div`
`

const Headerpiece = styled.div`
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-bottom: 3px solid lightgrey;
    z-index: 1;
`

export default Header