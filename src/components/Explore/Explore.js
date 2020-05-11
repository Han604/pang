import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header'

import {useHistory} from 'react-router-dom'

const Explore = () => {
    const history = useHistory()
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/explore')
        .then(res => res.json())
        .then(data => setPosts(data))
    },[])
    console.log(posts)
    if (posts) {
        return (
            <>
            <Header title={'EXPLORE'}/>
            <Wrapper>
                {posts.data.map((post, index) => {
                    return (
                        <div key={index+1} onClick={() => history.push(`/post/${post._id}`)}>
                            <PostImage src={post.imgURL} alt={post.description}/>
                        </div>
                    )
                })}
            </Wrapper>
            </>
            
        )
    } else return <div>LOADING...</div>
}

const Wrapper = styled.div`
    display: grid;
    grid-auto-rows: 100px;
    grid-template-columns: 1fr 1fr 1fr;
`

const PostImage = styled.img`
    height: 100px;
    width: 100%;
    object-fit: scale-down;
    border: 1px solid white;
`

export default Explore