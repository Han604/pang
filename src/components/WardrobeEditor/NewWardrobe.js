import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const NewWardrobe = ({setNewWardrobeToggle, setWardrobeRefresher, wardrobeRefresher}) => {
    const [itemName, setItemName] = React.useState('');
    const [imageURL, setImageURL] = React.useState(null);
    const [brand, setBrand] = React.useState(''); 
    const [link , setLink] = React.useState('');

    const user = useSelector(state => state.users);

    const completeWardrobe = () => {
        if(!itemName || !imageURL ) return
        fetch('/api/newwardrobe', {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                itemName: itemName,
                imgURL: imageURL,
                brand: brand,
                link: link,
                _id: user._id
            })
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            setWardrobeRefresher(wardrobeRefresher + 1);
            setNewWardrobeToggle(false);
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
        .then(res => res.json())
        .then(data => {
            if(data.secure_url) {
                setImageURL(data.secure_url)
            } else {
                console.log('somethings wrong with the upload');
            }
        })
    }
    return (
        <>
        <BodyDiv>
            <TitleDiv>NEW ITEM</TitleDiv>
            <StyledForm>
                <StyledInput type='text' onChange={ev=>setItemName(ev.target.value)} placeholder={'DESCRIPTION'}/>
                <StyledInput type='text' onChange={ev=>setBrand(ev.target.value)} placeholder={'BRAND (OPTIONAL)'}/>
                <StyledInput type='text' onChange={ev=>setLink(ev.target.value)} placeholder={'LINK (OPTIONAL)'}/>
                <StyledFile type='file' onChange={ev=> addImage(ev)}/>
                <StyledUpload value="UPDATE WARDROBE" onClick = {() => completeWardrobe()} readonly/>
            </StyledForm>
        </BodyDiv>
        <OpacityDiv onClick={()=>setNewWardrobeToggle(false)}/>
        </>
    )
}

const StyledInput = styled.input`
    background-color: white;
    border: 1px solid grey;
    text-align: center;
    margin-bottom: 12px;
`

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

export default NewWardrobe