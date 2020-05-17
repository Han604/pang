import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Header from '../Header/Header'
import NewPost from '../NewPost/NewPost'
import FeedPost from '../FeedPost/FeedPost'
import Loading from '../Loading/Loading'

import { useHistory } from 'react-router-dom'

const Homefeed = () => {
    const history = useHistory()

    const [posts, setPosts] = React.useState(undefined);
    const [newPostToggle, setNewPostToggle] = React.useState(false)
    const [feedRefresher, setFeedRefresher] = React.useState(0)
    const user = useSelector(state => state.users);

    const createNewPost = () => {
        setNewPostToggle(true);
    }
    
    // redirect if account isn't locked in
    if (!user.email) {
        history.push('/')
    }

    React.useEffect(() => {
        if(user._id) {
            fetch(`/api/read/${user._id}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
        } else {
            setPosts(1)
        }
    }, [feedRefresher])

    console.log(posts, 'posts')

    if(!posts) {
        return <Loading/>
    } else if (posts.data.length >= 1) {
        return (
            <>
                {newPostToggle === true ? <OpacityDiv onClick={() => setNewPostToggle(false)}/>: null}
                <Header title={user.username}/>
                {posts.data.map((post, index) => {
                    return <FeedPost key={index + 1} post={post}/>
                })}
                <StyledButton onClick={() => createNewPost()}> + </StyledButton>
                {newPostToggle === true ? <NewPost feedRefresher={feedRefresher} setFeedRefresher={setFeedRefresher} setNewPostToggle={setNewPostToggle}></NewPost>: null}
            </>
        ) 
    } else if (posts.data.length === 0)
        return (
            <>
                {newPostToggle === true ? <OpacityDiv onClick={() => setNewPostToggle(false)}/>: null}
                <Header title={user.username}/>
                <div>NO POSTS, FOLLOW SOMEONE</div>
                <StyledButton onClick={() => createNewPost()}> + </StyledButton>
                {newPostToggle === true ? <NewPost feedRefresher={feedRefresher} setFeedRefresher={setFeedRefresher} setNewPostToggle={setNewPostToggle}></NewPost>: null}
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
    position: fixed;
    right: 30px;
    width:30px;
    height:30px;
    top: 130px;
    border-radius: 50%;
    background-color: white;
    border: none;
    outline: none;
    box-shadow: 0 1px 3px 2px rgba(0,0,0,0.25);
    cursor: pointer;
`


export default Homefeed

