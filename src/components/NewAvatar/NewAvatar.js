import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux'

const NewAvatar = ({avatarToggle, setAvatarToggle, setRefreshUser, refreshUser}) => {
    const [image, setImage] = React.useState(null);

    const user = useSelector(state => state.users)
    
    const uploadImage = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'dev-pang');
        fetch('https://api.cloudinary.com/v1_1/pang-dev/image/upload', {
            method: 'POST',
            body: data,
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data.secure_url)
            const imgURL = data.secure_url;
            console.log(imgURL, user._id, 'req.body')
            fetch('/api/user/avatar', {
                method: 'PUT',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify({
                    imgURL: imgURL,
                    user_id: user._id
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) {
                    console.log(data);
                    setRefreshUser(refreshUser + 1)
                    setAvatarToggle(false)
                } else {
                    console.log('error message')
                }
            })
        })
    }

    if (avatarToggle) {
        return (
            <>
                <BodyDiv>
                    <TitleDiv>NEW AVATAR</TitleDiv>
                    <StyledForm>
                        <StyledFile type='file' onChange= {ev => setImage(ev.target.files[0])}/>
                        <StyledUpload value="UPLOAD" onClick = {() => uploadImage()} readonly/>
                    </StyledForm>
                </BodyDiv>
                <OpacityDiv onClick={()=>setAvatarToggle(false)}/>
            </>
        )
    } else {
        return <div style={{display:'none'}}>invisible</div>
    }
}

const OpacityDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: grey;
    opacity: 0.25;
    z-index: 2;
`

const StyledFile = styled.input`
    margin-left: 100px;
    background-color: white;
`

const StyledUpload = styled.input`
    background-color: white;
    border: 1px solid grey;
    cursor: pointer;
    margin-top: 12px;
    text-align: center;
`

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleDiv = styled.div`
    margin: 12px 0px 12px 0px;
`

const BodyDiv = styled.div`
    width: 100%;
    height: 70%;
    background-color: white;
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
`

export default NewAvatar