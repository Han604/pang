import React from 'react';
import styled from 'styled-components';

import {useSelector} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

import Header from '../Header/Header';
import NewWardrobe from './NewWardrobe';
import Loading from '../Loading/Loading';

const WardrobeEditor = () => {
    const history = useHistory();

    const [newWardrobeToggle, setNewWardrobeToggle] = React.useState(false);
    const [userWardrobe, setUserWardrobe] = React.useState(null);
    
    const user = useSelector(state => state.users)

    if(!user.email) {
        history.push('/')
    }

    React.useState(() => {
        if(user._id) {
            fetch(`api/user/${user._id}`)
            .then(res => res.json())
            .then(data => {
                setUserWardrobe(data.data.wardrobe)
            })
        }
    }, [])

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
            setUserWardrobe(data.data)
            console.log(data, 'delete data')
        })
    }

    if(userWardrobe) {
        return (
            <>
            {newWardrobeToggle && <NewWardrobe userWardrobe={userWardrobe} setUserWardrobe={setUserWardrobe} setNewWardrobeToggle = {setNewWardrobeToggle}/>}
            <Header title={'WARDROBE'}/>
            <Wrapper>
                    {userWardrobe.length ? userWardrobe.map((item, index) => {
                        return (
                            <ItemDiv key={index} style={{display:'flex'}}>
                                <Link to = {`/viewer/wardrobe/none/${user._id}/${index}`}>
                                    <ImageItem src={item.imgURL} alt={item.description}/>
                                </Link>
                                <DeleteButton onClick={() => deleteItem(item.itemId)}>X</DeleteButton>
                            </ItemDiv>
                        )
                    })
                    :
                    <div style={{textAlign:'center', marginTop:'25px'}}>
                        ADD SOMETHING TO YOUR WARDROBE
                    </div>}
            </Wrapper>
            <FooterDiv onClick={()=>setNewWardrobeToggle(true)}>ADD NEW WARDROBE</FooterDiv>
            </>
        )
    } return <Loading/>
}

const ItemDiv = styled.div` 
    justify-items: center;
`

const ImageItem = styled.img`
    height: 100px;
    width: 100%;
    border: 1px solid white;
    object-fit: scale-down;
`

const DeleteButton = styled.button`
    height: 20px;
    width: 20px;
    outline: none;
    border: none;
    right: 24px;
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