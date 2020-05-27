import React from 'react';
import styled from 'styled-components';

import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

const FeedPost = ({post}) => {
    const history = useHistory();

    const state = useSelector(state => state)
    const toProfile = (ev) => {
        history.push(`profile/${post.user_id}`); 
        ev.stopPropagation()
    }

    const toPost = (ev) => {
        history.push(`post/${post._id}`)
        ev.stopPropagation()
    }
    
    if (state.users.email) {
        return (
            <Wrapper onClick={ev=>toPost(ev)}>
            <Header>
                <div style={{margin:"6px 0 6px 12px"}} onClick={(ev) => toProfile(ev)}>{post.username}</div>
            </Header>
            {post.imgURL ? <PostImage src={post.imgURL} alt={post.description}/> : <PostDescription>{post.description}</PostDescription>}
            <Footer>
                <div style={{margin:"6px 0 6px 12px", display:'flex'}}>
                    <div>{post.comments.length} interactions </div>
                </div>
            </Footer>
        </Wrapper>
    )}
}

const PostDescription = styled.div`
    margin: 12px 0 0 12px;
    width: 93%;
`

const PostImage = styled.img`
    object-fit: contain;
    width: 100%;
`

const Footer = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid lightgrey;
`

const Header = styled.div`
    width: 100%;
    height: 30px;
    border-bottom: 1px solid lightgrey;
`

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    overflow-x: hidden;
    background-color: white;
`

export default FeedPost