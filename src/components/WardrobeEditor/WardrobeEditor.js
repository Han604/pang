import React from 'react';
import styled from 'styled-components';

import {useSelector, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

import Header from '../Header/Header';
import NewWardrobe from './NewWardrobe';
import Loading from '../Loading/Loading';

import {toggleWardrobe} from '../../actions'

const WardrobeEditor = ({matches}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [newWardrobeToggle, setNewWardrobeToggle] = React.useState(false);
    const [userWardrobe, setUserWardrobe] = React.useState(null);
    
    const user = useSelector(state => state.users)

    if(!user.email) {
        history.push('/')
    }

    React.useEffect(() => {
        if(user._id) {
            fetch(`api/user/${user._id}`)
            .then(res => res.json())
            .then(data => {
                setUserWardrobe(data.data.wardrobe)
            })
        }
    }, [user])

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

    const newWardrobeHandler = () => {
        if (matches.phone === true) {
            setNewWardrobeToggle(true);
        } else {
            dispatch(toggleWardrobe())
        }
    }

    if(userWardrobe) {
        return (
            <>
            {matches.phone && newWardrobeToggle && <NewWardrobe userWardrobe={userWardrobe} setUserWardrobe={setUserWardrobe} setNewWardrobeToggle = {setNewWardrobeToggle}/>}
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
            <FooterDiv onClick={() => newWardrobeHandler()}>ADD NEW WARDROBE</FooterDiv>
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
    background-color: transparent;
    position: relative;
`

const Wrapper = styled.div`
    background-color: white;
    overflow-y: scroll;
    width: 100%;
    height: calc(100vh - 135px);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 100px;
    ::-webkit-scrollbar {
        display: none;
    }
`

const FooterDiv = styled.div`
    border-top: 1px solid lightgrey;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 812px) {
        position: absolute;
        bottom: 0px;
    }
`

export default WardrobeEditor