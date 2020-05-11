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

    const deleteLookbook = (name) => {
        fetch('/api/deletelookbook', {
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                name: name,
                _id: user._id
            })
        })
        .then(res=> res.json())
        .then(data => {
            setLookbookRefresher(true)
            console.log(data)
        })
    }

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
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', marginBottom:'12px'}}>
                        <LookbookTitle>{userLookbook[0].name}</LookbookTitle>
                        <DeleteButton onClick={() => deleteLookbook(userLookbook[0].name)}>X</DeleteButton>
                    </div>
                    <LookbookDiv>
                        {userLookbook[0].looks.map(look => {
                            console.log('pang')
                            console.log(look.imgURL)
                            return (
                                <LookbookImg src={look.imgURL} alt={look.description}/>
                                )
                            })}
                    </LookbookDiv>
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
                {userLookbook.map(lookbook => {
                    return (
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', marginBottom:'12px'}}>
                                <LookbookTitle>{lookbook.name}</LookbookTitle>
                                <DeleteButton onClick={() => deleteLookbook(lookbook.name)}>X</DeleteButton>
                            </div>
                            <LookbookDiv>  
                                {lookbook.looks.map(look => {
                                    return (
                                        <LookbookImg src={look.imgURL} alt={look.description}/>
                                    )
                                })}
                            </LookbookDiv>
                        </div>
                    )
                })}
            </Wrapper>
            <FooterDiv onClick = {() => setNewLookbookToggle(true)}>
                ADD NEW LOOKBOOK
            </FooterDiv>
            </>
        )
    }} return <div style={{display:'none'}}>invisible</div>
}

const DeleteButton = styled.button`
    height: 20px;
    width: 20px;
    outline: none;
    border: none;
    margin-top: 12px;
    margin-left: 12px;
    background-color: white;
`

const LookbookTitle = styled.div`
    margin-left: 12px;
    margin-top: 12px;
`

const LookbookDiv = styled.div`
    display: flex;
    overflow-x: auto;
    margin-left: 12px;
    margin-bottom : 12px;
`

const LookbookImg = styled.img`
    height: 100px;
    margin-right: 5px; 
    object-fit: contain;
`

const Wrapper = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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