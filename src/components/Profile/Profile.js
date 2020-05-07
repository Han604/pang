import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Wardrobe from '../Wardrobe/Wardrobe';
import Lookbook from '../Lookbook/Lookbook';
import NewAvatar from '../NewAvatar/NewAvatar';

//icons
import { BsPersonFill, BsPerson } from "react-icons/bs";
import { FiCamera } from 'react-icons/fi'

const Profile = () => {
    const [loading, setLoading] = React.useState(null);
    const [user, setUser] = React.useState(null)
    const { _id } = useParams();
    const [tabToggle, setTabToggle] = React.useState('wardrobe');
    const [avatarToggle, setAvatarToggle] = React.useState(false);
    const [refreshUser, setRefreshUser] = React.useState(null);
    const [following, setFollowing] = React.useState(null)

    const history = useHistory()

    const state = useSelector(state => state);
    if (!state.users.email) {
        history.push('/')
    }

    const followUnfollow = () => {
        if (following) {
            fetch(`api/user/${_id}/${state.users._id}/unfollow`)
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) {
                    setFollowing(false);
                }
            })
        } else {
            fetch(`api/user/${_id}/${state.users._id}/follow`, {
                method: 'PUT',
                headers: {'content-type' : 'application/json'},
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) {
                    setFollowing(true);
                }
            })
        }
    }

    React.useEffect(()=> {
        console.log('pang')
        setLoading('loading');
        fetch(`/api/user/${_id}`)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                setUser(data)
                if(data.data.followedBy.includes(`${state.users._id}`) === true) {
                    setFollowing(true)
                } else {
                    setFollowing(false)
                }
                setLoading('idle')
            } else {
                setUser(404)
                setLoading('error')
            }
        })
    },[refreshUser])

    return (
        loading === 'idle' ?
        <>
            <NewAvatar refreshUser = {refreshUser} setRefreshUser = {setRefreshUser}setAvatarToggle={setAvatarToggle} avatarToggle={avatarToggle}/>
            <Header title={user.data.username}/>
            {following === true ?
                <StyledButton onClick={() => followUnfollow}><BsPerson/></StyledButton> :
                user.data._id === state.users._id ? 
                <StyledButton onClick={()=>setAvatarToggle(true)}><FiCamera/></StyledButton> :
                <StyledButton onClick={() => followUnfollow}><BsPersonFill/></StyledButton>
            }
            <Wrapper>
                <AvatarWrapper>
                    {user.data.avatar ?
                        <Avatar src={user.data.avatar}/> :
                        <Avatar src={'https://filestore.community.support.microsoft.com/api/images/490b996b-e45f-4985-b2af-cf36da33849a?upload=true'}/>
                    }
                </AvatarWrapper>
                <TabWrapper>
                    {tabToggle === 'wardrobe' ? 
                        <WardrobeTab onClick={() => setTabToggle('wardrobe')}>WARDROBE</WardrobeTab> :
                        <WardrobeTab style={{backgroundColor:'lightgrey'}}  onClick={() => setTabToggle('wardrobe')}>WARDROBE</WardrobeTab>
                    }
                    {tabToggle === 'lookbook' ?
                        <LookbookTab onClick={() => setTabToggle('lookbook')}>LOOKBOOK</LookbookTab> :            
                        <LookbookTab style={{backgroundColor:'lightgrey'}}  onClick={() => setTabToggle('lookbook')}>LOOKBOOK</LookbookTab>            
                    }
                </TabWrapper>
                <InfoDiv>
                    {tabToggle === 'wardrobe' ? <Wardrobe user={user}/> : <Lookbook user={user}/>}
                </InfoDiv>
            </Wrapper>
        </>
        : <div>LOADING...</div>
    );
}

const StyledButton = styled.button`
    position: absolute;
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

const InfoDiv = styled.div`
    width: 100%;
`

const WardrobeTab = styled.div`
    text-align: center;
    width: 50%;
    padding: 12px 0 12px 0;
`

const LookbookTab = styled.div`
    text-align: center;
    width: 50%;
    padding: 12px 0 12px 0;
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