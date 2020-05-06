import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Header from '../Header/Header'
import NewPost from '../NewPost/NewPost'

import { useHistory } from 'react-router-dom'

const Homefeed = () => {
    const history = useHistory()

    const [posts, setPosts] = React.useState(undefined);
    const [newPostToggle, setNewPostToggle] = React.useState(false)
    const user = useSelector(state => state.users);

    const createNewPost = () => {
        setNewPostToggle(true);
    }
    
    // redirect if account isn't locked in
    if (!user.email) {
        history.push('/')
    }

    if(posts === 'loading') {
        return <div>loading...</div>
    } else if (posts) {
        return (
            <>
                {newPostToggle === true ? <OpacityDiv onClick={() => setNewPostToggle(false)}/>: null}
                <Header title={user.username}/>
                <div>No posts! Follow someone</div>
                <StyledButton onClick={() => createNewPost()}> + </StyledButton>
                {newPostToggle === true ? <NewPost setNewPostToggle={setNewPostToggle}></NewPost>: null}
            </>
        ) 
    } else 
        return (
            <>
                {newPostToggle === true ? <OpacityDiv onClick={() => setNewPostToggle(false)}/>: null}
                <Header title={user.username}/>
                <div>replace this with the user feed</div>
                <StyledButton onClick={() => createNewPost()}> + </StyledButton>
                {newPostToggle === true ? <NewPost setNewPostToggle={setNewPostToggle}></NewPost>: null}
            </>
    )
}

const OpacityDiv = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: grey;
    opacity: .25;
    z-index: 2;
`

const StyledButton = styled.button`
    position: absolute;
    right: 30px;
    width:30px;
    height:30px;
    top: 150px;
    border-radius: 50%;
    background-color: white;
    border: none;
    outline: none;
    box-shadow: 0 1px 3px 2px rgba(0,0,0,0.25);
    cursor: pointer;
`


export default Homefeed

