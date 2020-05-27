import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import {returnBaseState, updateUserState, updateUserLookbook} from '../../actions'

const NewLookbook = () => {
    const [lookbookName, setLookbookName] = React.useState('')
    const [imageURL, setImageURL] = React.useState(null)
    const [description, setDescription] = React.useState('') 
    const [lookbookArray , setLookbookArray] = React.useState([])

    const user = useSelector(state => state.users);
    const dispatch = useDispatch();

    const completeLookbook = () => {
        fetch('/api/newlookbook', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: lookbookName,
                user_id: user._id,
                lookbook: lookbookArray
            })
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            dispatch(updateUserState())
            dispatch(returnBaseState())
        })
    }

    const newLook = ev => {
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
                console.log('big error');
            }
    })}

    const finishLook = () => {
        if (!imageURL) return
        const tempObj = {
            imgURL: imageURL,
            description: description,
        }
        let tempArray = [...lookbookArray]
        tempArray.push(tempObj)
        setLookbookArray(tempArray)
        setDescription('')
        setImageURL(null)
    }
    return (
        <>
        <BodyDiv>
            <TitleDiv>NEW LOOKBOOK</TitleDiv>
            <StyledForm>
                <StyledInput type='text' onChange={ev=>setLookbookName(ev.target.value)} placeholder={'NAME YOUR LOOKBOOK'}/>
                <StyledFile type='file' onChange={ev=> newLook(ev)}/>
                <StyledTextArea maxLength={500} placeholder = {'WRITE SOMETHING'} value = {description} onChange={ev => setDescription(ev.target.value)}></StyledTextArea>
                <StyledUpload value="UPLOAD" onClick = {() => finishLook()} readonly/>
                <StyledUpload value="FINISH LOOKBOOK" onClick = {() => completeLookbook()} readonly/>
                <StyledUpload value="CANCEL" onClick = {() => completeLookbook()} readonly/>
            </StyledForm>
        </BodyDiv>
        </>
    )
}

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

export default NewLookbook