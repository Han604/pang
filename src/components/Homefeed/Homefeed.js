import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../Header/Header'
import NewPost from '../NewPost/NewPost'
import FeedPost from '../FeedPost/FeedPost'
import Loading from '../Loading/Loading'
import LoadingDesktop from '../Loading/LoadingDesktop'

import { useHistory } from 'react-router-dom'
import { toggleNewPost } from '../../actions'

const Homefeed = ({matches}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [posts, setPosts] = React.useState(undefined);
    const [newPostToggle, setNewPostToggle] = React.useState(false)
    const [feedRefresher, setFeedRefresher] = React.useState(0)
    const user = useSelector(state => state.users);

    const createNewPost = () => {
        if (matches.phone === true) {
            setNewPostToggle(true);
        } else if (matches.desktop === true) {
            dispatch(toggleNewPost())
        }
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
    }, [feedRefresher, user])

    if(!posts) {
        return <Wrapper><LoadingDesktop/></Wrapper>
    } else if (posts.data.length >= 1) {
        return (
            <Wrapper>
                <div>
                    {newPostToggle === true && 
                    matches.phone === true && 
                    <OpacityDiv onClick={() => setNewPostToggle(false)}/>
                    }
                    <Header title={user.username}/>
                    {posts.data.map((post, index) => {
                        return <FeedPost key={index + 1} post={post}/>
                    })}
                    <StyledButton onClick={() => createNewPost()}> + </StyledButton>
                    {newPostToggle === true && 
                        matches.phone === true && 
                        <NewPost feedRefresher={feedRefresher} 
                            setFeedRefresher={setFeedRefresher} 
                            setNewPostToggle={setNewPostToggle}
                        />
                    }
                </div>
            </Wrapper>
        ) 
    } else if (posts.data.length === 0)
        return (
            <Wrapper>
                <div>
                    {newPostToggle === true && <OpacityDiv onClick={() => setNewPostToggle(false)}/>}
                    <Header title={user.username}/>
                    <div style={{textAlign:'center', marginTop:'25px'}}>NO POSTS, FOLLOW SOMEONE</div>
                    <StyledButton onClick={() => createNewPost()}> + </StyledButton>
                    {newPostToggle === true ? <NewPost feedRefresher={feedRefresher} setFeedRefresher={setFeedRefresher} setNewPostToggle={setNewPostToggle}></NewPost>: null}
                </div>
            </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const OpacityDiv = styled.div`
    position: fixed;
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

