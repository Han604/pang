import React from 'react';
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'

// actions
import { loadUserData } from '../../actions'


const Splashscreen = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const state = useSelector((state) => state)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirm, setConfirm] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [name, setName] = React.useState('')

    const [signInToggle, setToggle] = React.useState(false)

    const redirectAfterSignin = () => { 
        history.push('/home')
    }

    if(state.users.email) {
        redirectAfterSignin()
    } 

    const signUp = (req, res) => {
        console.log(email, password, confirm, name, username)
        fetch('/api/signup', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                confirm: confirm,
                name: name,
                username: username,
            })
        })
        .then(res => res.json())
        .then(data => {
            if(parseInt(data.status) === 200){
                dispatch(loadUserData(data));
            }
        })
    }

    const signIn = () => {
        fetch('/api/signin', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(parseInt(data.status) === 200) {
                dispatch(loadUserData(data));
            } else { 
                console.log(data.message)
            }
        })
    }

    if(signInToggle === false) {
        return (
            <SignUpWrapper>
                <BackgroundDiv>
                    <Pang>pang</Pang>
                    <Styledform>
                        <StyledInput type='email' id='signup-email' placeholder='EMAIL' onChange={ev=> setEmail(ev.target.value)} required/>
                        <StyledInput type='text' id='signup-username' placeholder='USERNAME' onChange={ev=> setUsername(ev.target.value)} required/>
                        <StyledInput type='text' id='signup-name' placeholder='NAME' onChange={ev=> setName(ev.target.value)} required/>
                        <StyledInput type='password' id='signup-pw' placeholder='PASSWORD' onChange={ev=> setPassword(ev.target.value)} required/>
                        <StyledInput type='password' id='signup-pw-confirm' placeholder='CONFIRM' onChange={ev=> setConfirm(ev.target.value)} required/>
                        <StyledSubmit value='GET STARTED' onClick={ev => signUp()}/>
                    </Styledform>
                </BackgroundDiv>
                <SlidingDiv>
                    <SignInDiv onClick={() => setToggle(true)}>
                        ALREADY A MEMBER?
                    </SignInDiv>
                </SlidingDiv>
            </SignUpWrapper>
        );
    } else {
        return (
            <SignInWrapper>
                <SignInHeader onClick = {()=>setToggle(false)}>
                    GET STARTED
                </SignInHeader>
                <SignInBackground>
                    <Pang>pang</Pang>
                    <Styledform>
                        <SignInInput type='email' id='signin-email' placeholder='EMAIL' onChange={ev=> setEmail(ev.target.value)} required/>
                        <SignInInput type='password' id='signin-password' placeholder='PASSWORD' onChange={ev=> setPassword(ev.target.value)} required/>
                        <SignInSubmit value='SIGN IN' onClick={()=>signIn()}/>
                    </Styledform>
                    <PangIn>pang</PangIn>
                </SignInBackground>
            </SignInWrapper>
            )
    }
};

const PangIn = styled.div`
    color: black;
    left:12px;
    bottom:12px;
    font: 300 14px 'Open Sans', sans-serif;
    position: absolute;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`

const SignInSubmit = styled.input`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: black;
    width: auto;
    cursor: pointer;
    font: 300 14px 'Open Sans', sans-serif;
    margin-top: 215px;
    text-align: center;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`

const SignInInput = styled.input`
    font: 300 14px 'Open Sans', sans-serif;
    border: none;
    margin-top: 2px;
    background-color: rgba(0, 0, 0, 0);
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
        ::placeholder{
        color: black;
        font: 300 14px 'Open Sans', sans-serif;
    }
`

const SignInHeader = styled.div`
    background-color: black;
    color: white;
    width: 100%;
    text-align: center;
    height: 100px;
    top: 0px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SignInBackground = styled.div`
    background-color: white;
    width: 100%;
    height: calc(100% - 100px);
    box-sizing: border-box;
    padding: 12px;
`

const SignInWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const SignUpWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const SignInDiv = styled.div`
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`

const SlidingDiv = styled.div`
    background-color: white;
    width: 100%;
    text-align: center;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    `

const StyledSubmit = styled.input`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    width: auto;
    cursor: pointer;
    font: 300 14px 'Open Sans', sans-serif;
    margin-top: 150px;
    margin-bottom: 150px;
    text-align: center;
`

const Pang = styled.div`
    color: white;
    text-align: right;
    font: 300 14px 'Open Sans', sans-serif;
    margin-bottom: 100px;
`

const Styledform = styled.form`
    display: flex;
    flex-direction: column;
`
const StyledInput = styled.input`
    font: 300 14px 'Open Sans', sans-serif;
    border: none;
    color: white;
    margin-top: 2px;
    background-color: rgba(0, 0, 0, 0.5);
    ::placeholder{
        color: white;
        font: 300 14px 'Open Sans', sans-serif;
    } 
`

const BackgroundDiv = styled.div`
    background-color: black;
    width: 100%;
    height: calc(100% - 100px);
    box-sizing: border-box;
    padding: 12px;
    flex-grow: 1;
`



export default Splashscreen;