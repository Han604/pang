import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Wardrobe from '../Wardrobe/Wardrobe'

const Profile = () => {
    const [loading, setLoading] = React.useState(null);
    const [user, setUser] = React.useState(null)
    const { _id } = useParams();
    const [tabToggle, setTabToggle] = ('wardrobe')

    // const history = useHistory()

    // const state = useSelector(state => state);
    // if (!state.users.email) {
    //     history.push('/')
    // }

    React.useEffect(()=> {
        console.log('pang')
        setLoading('loading');
        fetch(`/api/user/${_id}`)
        .then(res => res.json())
        .then(data =>  {
            if(data.status === 200) {
                setUser(data)
                setLoading('idle')
            } else {
                setUser(404)
                setLoading('error')
            }
        })
    },[])
    
    return (
        loading === 'idle' ?
        <>
            <Header title={user.data.username}/>
            <Wrapper>
                <AvatarWrapper>
                    {user.data.imgURL ?
                        <Avatar src={user.data.imgURL}/> :
                        <Avatar src={'https://filestore.community.support.microsoft.com/api/images/490b996b-e45f-4985-b2af-cf36da33849a?upload=true'}/>
                    }
                </AvatarWrapper>
                <TabWrapper>
                    {tabToggle === 'wardrobe' ? 
                        <WardrobeTab onClick={() => setTabToggle('wardrobe')}>WARDROBE</WardrobeTab> :
                        <WardrobeTab style={{backgroundColor:'lightgrey'}}  onClick={() => setTabToggle('wardrobe')}>WARDROBE</WardrobeTab>
                    };
                    {tabToggle === 'lookbook' ?
                        <LookbookTab onClick={() => setTabToggle('lookbook')}>LOOKBOOK</LookbookTab> :            
                        <LookbookTab style={{backgroundColor:'lightgrey'}}  onClick={() => setTabToggle('lookbook')}>LOOKBOOK</LookbookTab>            
                    }
                </TabWrapper>
                <InfoDiv>
                    {tabToggle === 'wardrobe' ? <div>wardrobe</div> : <Wardrobe />}
                </InfoDiv>
            </Wrapper>
        </>
        : <div>LOADING...</div>
    );
}

const WardrobeTab = styled.div`
    text-align: center;
    width: 50%;
    padding: 12px 0 12px 0;
`

const LookbookTab = styled.div`
    text-align: center;
    width: 50%;
    padding: 12px 0 12px 0;
    background-color: lightgrey;
`

const TabWrapper = styled.div`
    display: flex;
`

const AvatarWrapper = styled.div`
    height: 250px;
    width: 100%;
    display: contents;
`

const Avatar = styled.img`
    object-fit:cover;
    height: 200px;
    width: 100%;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export default Profile