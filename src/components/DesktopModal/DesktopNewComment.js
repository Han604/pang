import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import { returnBaseState, updateUserState } from '../../actions'

const NewComment = ({ post }) => {
    const [itemName, setItemName] = React.useState('');
    const [imageURL, setImageURL] = React.useState(null);
    const [brand, setBrand] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [link, setLink] = React.useState('')
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const sendComment = () => {
        if(!description) return
        console.log("pang")
        fetch('/api/newcomment', {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                itemName: itemName,
                postId: post._id, 
                userId: user._id,
                username: user.username,
                brand: brand,
                imgURL: imageURL,
                description: description,
                link: link
            })})
            .then(res=> res.json())
            .then(data => {
                dispatch(updateUserState())
                dispatch(returnBaseState())
            })
        
    }

    const addImage = ev => {
        const data = new FormData();
        data.append('file', ev.target.files[0]);
        data.append('upload_preset', 'dev-pang');
        fetch('https://api.cloudinary.com/v1_1/pang-dev/image/upload', {
            method: 'POST',
            body: data,
        })
        .then(res=>res.json())
        .then(data => {
            if(data.secure_url) {
                setImageURL(data.secure_url)
            } else {
                console.log('somethings wrong with it')
            }
        })
    }
    return (
        <BodyDiv>
            <TitleDiv>NEW ITEM</TitleDiv>
            <StyledForm>
                <StyledTextArea type='text' onChange={ev=>setDescription(ev.target.value)} placeholder={'WRITE A COMMENT'}/>
                <StyledInput type='text' onChange={ev=>setItemName(ev.target.value)} placeholder={'DESCRIPTION'}/>
                <StyledInput type='text' onChange={ev=>setBrand(ev.target.value)} placeholder={'BRAND (OPTIONAL)'}/>
                <StyledInput type='text' onChange={ev=>setLink(ev.target.value)} placeholder={'LINK (OPTIONAL)'}/>
                <StyledFile type='file' onChange={ev=> addImage(ev)}/>
                <StyledUpload value="COMMENT" onClick = {() => sendComment()} readonly/>
                <StyledUpload value="CANCEL" onClick = {() => dispatch(returnBaseState())} readonly/>
            </StyledForm>
        </BodyDiv>
    )
}

export default NewComment;

const StyledTextArea = styled.textarea`
    width: 80%;
    height: 100px;
    padding: 10px;
    border: 1px solid grey;
    overflow: auto;
    outline: none;
    resize: none;
    margin-bottom: 12px;
`

const StyledInput = styled.input`
    background-color: white;
    border: 1px solid grey;
    text-align: center;
    margin-bottom: 12px;
`

const StyledFile = styled.input`
    margin-left: 100px;
    background-color: white;
    margin-bottom: 12px;
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
    margin-top: 40%;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
`