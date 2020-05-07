import React from 'react';
import styled from 'styled-components';

import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Header from '../Header/Header';
import NewLookbook from './NewLookbook';

const LookbookEditor = () => {
    const history = useHistory();
    const [newLookbookToggle, setNewLookbookToggle] = React.useState(false)
    const [userLookbook, setUserLookbook] = React.useState(null)
    const [lookbookRefresher, setLookbookRefresher] = React.useState(null)

    const user = useSelector(state => state.users)
    
    if(!user.email) {
        history.push('/')
    }

    React.useState(() => {
        fetch(`api/user/${user._id}`)
        .then(res => res.json())
        .then(data => setUserLookbook(data.data.lookbook))
    },[lookbookRefresher])

    console.log(userLookbook);

    if(userLookbook) {
        if(userLookbook.length === 0) {
            return (
            <>
            {newLookbookToggle ? <NewLookbook setLookbookRefresher={setLookbookRefresher} setNewLookbookToggle={setNewLookbookToggle}/> : null}
            <Header title={'LOOKBOOK'}/>
            <Wrapper>
                ADD SOMETHING TO YOUR LOOKBOOK
            </Wrapper>
            <FooterDiv onClick = {() => setNewLookbookToggle(true)}>ADD NEW LOOKBOOK</FooterDiv>
            </>
        )
    } else if (userLookbook.length === 1){
        return (
            <>
            {newLookbookToggle ? <NewLookbook setLookbookRefresher={setLookbookRefresher} setNewLookbookToggle={setNewLookbookToggle}/> : null}
            <Header title={'LOOKBOOK'}/>
            <Wrapper>
                <div>
                    <img src={userLookbook[0].imgURL} alt={userLookbook[0].description}/>
                </div>
            </Wrapper>
            <FooterDiv onClick = {() => setNewLookbookToggle(true)}>ADD NEW LOOKBOOK</FooterDiv>
            </>
        )
    } else {
        return (
            <>
            {newLookbookToggle ? <NewLookbook setLookbookRefresher={setLookbookRefresher} setNewLookbookToggle={setNewLookbookToggle}/> : null}
            <Header title={'LOOKBOOK'}/>
            <Wrapper>
                <div>
                    {userLookbook.forEach(lookbook => {
                        return (
                            <div>
                                {lookbook.forEach(look => {
                                    return <img src={look.imgURL} alt={look.description}/>
                                })}
                            </div>
                        )
                    })}
                </div>
            </Wrapper>
            <FooterDiv onClick = {() => setNewLookbookToggle(true)}>
                ADD NEW LOOKBOOK
            </FooterDiv>
            </>
        )
    }} return <div style={{display:'none'}}>invisible</div>
}

const Wrapper = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const FooterDiv = styled.div`
    position: absolute;
    bottom: 0px;
    border-top: 1px solid lightgrey;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default LookbookEditor