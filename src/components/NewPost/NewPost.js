import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux'

const NewPost = ({feedRefresher, setFeedRefresher, setNewPostToggle}) => {

    const [image, setImage] = React.useState(null)
    const [description, setDescription] = React.useState('')

    const user = useSelector(state => state.users);

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
            const imgURL = data.secure_url;
            fetch('/api/post', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    imgURL: imgURL,
                    description: description,
                    user_id: user._id,
                    username: user.username
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) {
                    setNewPostToggle(false)
                    setFeedRefresher(feedRefresher + 1)
                } else {
                    console.log('SOMETHING WENT WRONG PLEASE TRY AGAIN')
                }
            })
        })
    }

    return (
        <BodyDiv>
            <TitleDiv>NEW POST</TitleDiv>
            <StyledForm>
                <StyledTextArea maxLength={500} placeholder ={'WRITE SOMETHING'} value = {description} onChange={ev => setDescription(ev.target.value)}></StyledTextArea>
                <StyledFile type='file' onChange={ev=> setImage(ev.target.files[0])}/>
                <StyledUpload value="UPLOAD" onClick = {() => uploadImage()} readonly/>
            </StyledForm>
        </BodyDiv>
    )
}

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

const StyledTextArea = styled.textarea`
    width: 80%;
    height: 100px;
    padding: 10px;
    border: 1ps solid grey;
    overflow: auto;
    outline: none;
    resize: none;
    margin-bottom: 12px;
`

const TitleDiv = styled.div`
    margin: 12px 0px 12px 0px;
`

const BodyDiv = styled.div`
    width: 100%;
    height: 70%;
    background-color: white;
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
`

export default NewPost