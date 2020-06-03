import React from 'react';
import styled from 'styled-components';

import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';

import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import NewLookbook from './NewLookbook';

import {toggleLookbook} from '../../actions'

const LookbookEditor = ({matches}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [newLookbookToggle, setNewLookbookToggle] = React.useState(false)
    const [userLookbook, setUserLookbook] = React.useState(null)
    const [lookbookRefresher, setLookbookRefresher] = React.useState(0)

    const user = useSelector(state => state.users)
    if(!user.email) {
        history.push('/')
    }

    React.useEffect(() => {
        if(user._id){
            console.log('pang')
            fetch(`api/user/${user._id}`)
            .then(res => res.json())
            .then(data => {
                setUserLookbook(data.data.lookbook)
            }) 
        }
    },[lookbookRefresher, user])

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

    const newLookbookHandler = () => {
        if(matches.phone) {
            setNewLookbookToggle(true);
        } else {
            dispatch(toggleLookbook())
        }
    }

    if(userLookbook) {
        return (
        <>
        {matches.phone && newLookbookToggle && <NewLookbook userLookbook={userLookbook} setUserLookbook={setUserLookbook} setNewLookbookToggle={setNewLookbookToggle}/>}
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
        <FooterDiv onClick = {() => newLookbookHandler()}>
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
    background-color: transparent;
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
    height: calc(100vh - 135px);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const FooterDiv = styled.div`
    border-top: 1px solid lightgrey;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 812px) {
        position: absolute;
        bottom: 0px;
    }
`

export default LookbookEditor