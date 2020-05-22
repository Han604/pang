import React from 'react';
import styled from 'styled-components';

import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Header from '../Header/Header'
import NewComment from '../NewComment/NewComment'
import IndividualComment from './IndividualComment'
import Loading from '../Loading/Loading';

const IndividualPost = () => {
    const [post, setPost] = React.useState(null)
    const [refresher, setRefresher] = React.useState(0)
    const [commentToggle, setCommentToggle] = React.useState(false)
    const {postId} = useParams()
    const history = useHistory()

    const user = useSelector(state => state.users)

    const toProfile = (ev) => {
        history.push(`/profile/${post.data.user_id}`)
        ev.stopPropagation()
    }

    if (!user.email) {
        history.push('/')
    }
    React.useEffect(() => {
        if(user._id) {
            fetch(`/api/post/${postId}`)
            .then(res=> res.json())
            .then(data=>setPost(data)) 
        }
    },[refresher])

    console.log(post)

    if (!post) {
        return <Loading/>
    } else {
        return (
            <>
            {commentToggle && <NewComment post={post} refresher={refresher} setRefresher={setRefresher} setCommentToggle={setCommentToggle}/>}
            <Wrapper>
                <Header title={(post.data.username).toUpperCase() + '\'S POST'}/>
                    {post.data.imgURL && <PostImage src={post.data.imgURL} alt={'IMAGE CONTENT'}/>}
                <InfoDiv>
                    <UnderlineDiv onClick = {(ev)=> toProfile(ev)}>
                        <UsernameDiv>{post.data.username}</UsernameDiv>
                        <DescriptionDiv>
                            {post.data.description}
                        </DescriptionDiv>
                    </UnderlineDiv>
                    <CommentDiv>
                        {post.data.comments.map((comment, index) => {
                            return(
                                <IndividualComment 
                                    username={comment.username} 
                                    description={comment.description} 
                                    imgURL = {comment.imgURL} 
                                    userId = {comment.userId} 
                                    itemName = {comment.itemName}
                                    brand = {comment.brand}
                                    link = {comment.link}
                                    key = {index + 1}
                                />
                            )
                        })}
                    </CommentDiv>
                </InfoDiv>
                <FooterDiv>
                    <FooterText onClick={()=>setCommentToggle(true)}>
                        ADD NEW COMMENT
                    </FooterText>
                </FooterDiv>
            </Wrapper>
            </>
        )
    }
}

const UsernameDiv = styled.div`
    margin: 6px 0 0 12px;
    font-weight: bold;
`

const UnderlineDiv = styled.div`
    width: 100%;
    border-bottom: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
`

const FooterText = styled.div`
    margin: 10px 0 4px 12px; 
`

const FooterDiv = styled.div`
    border-top: 1px solid grey;
    height: 40px; 
    position: absolute;
    width: 100%;
    bottom: 0px;
    background-color: white;
`

const CommentDescription = styled.div`
    margin-top: 6px;
    width: 95%;
`

const CommentUser = styled.div`
    font-size: small;
    color: grey;
`

const CommentDiv = styled.div`
    margin: 6px 0 6px 12px;
    overflow-y: auto;
    overflow: visible;
`

const DescriptionDiv = styled.div`
    margin: 0 0 6px 12px;
    width: 93%;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`

const PostImage = styled.img`
    height: 250px;
    object-fit: contain;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`   

export default IndividualPost