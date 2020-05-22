import React from 'react';
import styled from 'styled-components';

import {useSelector} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';

import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import NewLookbook from './NewLookbook';

const LookbookEditor = () => {
    const history = useHistory();
    const [newLookbookToggle, setNewLookbookToggle] = React.useState(false)
    const [userLookbook, setUserLookbook] = React.useState(null)
    const [lookbookRefresher, setLookbookRefresher] = React.useState(0)

    const user = useSelector(state => state.users)
    
    if(!user.email) {
        history.push('/')
    }

    React.useState(() => {
        if(user._id){
            fetch(`api/user/${user._id}`)
            .then(res => res.json())
            .then(data => setUserLookbook(data.data.lookbook)) 
        }
    },[lookbookRefresher])

    const deleteLookbook = (lookbookId) => {
        fetch('/api/deletelookbook', {
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                lookbookId: lookbookId,
                _id: user._id
            })
        })
        .then(res=> res.json())
        .then(data => {
            setUserLookbook(data.data)
        })
    }

    if(userLookbook) {
        return (
        <>
        {newLookbookToggle && <NewLookbook userLookbook={userLookbook} setUserLookbook={setUserLookbook} setNewLookbookToggle={setNewLookbookToggle}/>}
        <Header title={'LOOKBOOK'}/>
        <Wrapper>
            {userLookbook.length ? userLookbook.map((lookbook, index) => {
                return (
                    <div key={index + 1} style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', marginBottom:'12px'}}>
                            <LookbookTitle>{lookbook.name}</LookbookTitle>
                            <DeleteButton onClick={() => deleteLookbook(lookbook.lookbookId)}>X</DeleteButton>
                        </div>
                        <LookbookDiv>  
                            {lookbook.looks.map((look, index) => {
                                return (
                                    <Link key={index+1} to = {`/viewer/lookbook/${lookbook.lookbookId}/${user._id}/${index}`}><LookbookImg key={index+1} src={look.imgURL} alt={look.description}/></Link>
                                )
                            })}
                        </LookbookDiv>
                    </div>
                )
            })
            :
            <div style={{textAlign:'center', marginTop:'25px'}}>
                ADD SOMETHING TO YOUR LOOKBOOK
            </div>
            }
        </Wrapper>
        <FooterDiv onClick = {() => setNewLookbookToggle(true)}>
            ADD NEW LOOKBOOK
        </FooterDiv>
        </>
        )
    } return <Loading/>
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