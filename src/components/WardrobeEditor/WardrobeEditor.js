import React from 'react';
import styled from 'styled-components';

import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import Header from '../Header/Header';
import NewWardrobe from './NewWardrobe';

const WardrobeEditor = () => {
    const history = useHistory();

    const [newWardrobeToggle, setNewWardrobeToggle] = React.useState(false);
    const [userWardrobe, setUserWardrobe] = React.useState(null);
    const [wardrobeRefresher, setWardrobeRefresher] = React.useState(0)
    
    const user = useSelector(state => state.users)

    if(!user.email) {
        history.push('/')
    }

    React.useState(() => {
        fetch(`api/user/${user._id}`)
        .then(res => res.json())
        .then(data => setUserWardrobe(data.data.wardrobe))
    }, [wardrobeRefresher])

    const deleteItem = (itemId) => {
        console.log(itemId)
        fetch('/api/deletewardrobe', {
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                _id: user._id,
                itemId: itemId
            })
        })
        .then(res => res.json())
        .then(data => {
            setWardrobeRefresher(wardrobeRefresher + 1)
            console.log(data)
        })
    }
    console.log(userWardrobe)

    if(userWardrobe) {
        if(userWardrobe.length === 0) {
            return (
            <>
            {newWardrobeToggle ? <NewWardrobe wardrobeRefresher={wardrobeRefresher} setWardrobeRefresher={setWardrobeRefresher} setNewWardrobeToggle = {setNewWardrobeToggle}/> : null}
            <Header title={'WARDROBE'}/>
            <div>
                ADD SOMETHING TO YOUR WARDROBE
            </div>
            <FooterDiv onClick={()=>setNewWardrobeToggle(true)}>ADD NEW WARDROBE</FooterDiv>
            </>
        )
    } else if (userWardrobe.length >= 1){
        return (
            <>
            {newWardrobeToggle ? <NewWardrobe wardrobeRefresher={wardrobeRefresher} setWardrobeRefresher={setWardrobeRefresher} setNewWardrobeToggle = {setNewWardrobeToggle}/> : null}
            <Header title={'WARDROBE'}/>
            <Wrapper>
                <div>
                    {userWardrobe.map(item => {
                    return (
                        <ItemDiv style={{display:'flex'}}>
                            <ImageItem src={item.imgURL} alt={item.description}/>
                            <DeleteButton onClick={() => deleteItem(item.itemId)}>X</DeleteButton>
                        </ItemDiv>
                    )
                    })}
                </div>
            </Wrapper>
            <FooterDiv onClick={()=>setNewWardrobeToggle(true)}>ADD NEW WARDROBE</FooterDiv>
            </>
        )
    }} return <div style={{display:'none'}}>invisible</div>
}

const ItemDiv = styled.div`
    justify-items: center;
`

const ImageItem = styled.img`
    height: 100px;
    object-fit: contain;
`

const DeleteButton = styled.button`
    height: 20px;
    width: 20px;
    outline: none;
    border: none;
    right: 12px;
    top: 12px;
    background-color: white;
    position: relative;
`

const Wrapper = styled.div`
    background-color: white;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px;
`

const FooterDiv = styled.div`
    position: absolute;
    bottom: 0px;
    border-top: 1px solid lightgrey;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default WardrobeEditor