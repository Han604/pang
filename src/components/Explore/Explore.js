import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header'
import Loading from '../Loading/Loading';

import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const Explore = () => {
    const history = useHistory()
    const [posts, setPosts] = React.useState(null);

    const user = useSelector(state => state.users)
    
    React.useEffect(() => {
        if (!user._id) {
            history.push('/')
        } else {
            fetch('/api/explore')
            .then(res => res.json())
            .then(data => setPosts(data))
        }
    },[])
    if (posts) {
        return (
            <div style={{backgroundColor:'white'}}>
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
            </div>
            
        )
    } else return <Loading/>
}

const Wrapper = styled.div`
    display: grid;
    grid-auto-rows: 100px;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    background-color: white;
`

const PostImage = styled.img`
    height: 100px;
    width: 100%;
    object-fit: cover;
    border: 1px solid white;
`

export default Explore