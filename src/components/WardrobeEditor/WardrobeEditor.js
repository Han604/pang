import React from 'react';
import styled from 'styled-components';

import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import Header from '../Header/Header'

const WardrobeEditor = () => {
    const history = useHistory();
    const userWardrobe= useSelector(state => state.users.wardrobe)
    console.log(userWardrobe);

    if(!userWardrobe) {
        history.push('/')
    }

    if(userWardrobe) {
        if(userWardrobe.length === 0) {
            return (
            <>
            <Header title={'WARDROBE'}/>
            <Wrapper>
                ADD SOMETHING TO YOUR WARDROBE
            </Wrapper>
            <FooterDiv>ADD NEW WARDROBE</FooterDiv>
            </>
        )
    } else if (userWardrobe.length === 1){
        return (
            <>
            <Header title={'WARDROBE'}/>
            <Wrapper>
                <div>
                    {userWardrobe[0].forEach(item => {
                    return <img src={item.imgURL} alt={item.description}/>
                    })}
                </div>
            </Wrapper>
            <FooterDiv>ADD NEW WARDROBE</FooterDiv>
            </>
        )
    } else {
        return (
            <>
            <Header title={'WARDROBE'}/>
            <Wrapper>
                <div>
                    {userWardrobe.forEach(wardrobe => {
                        return (
                            <div>
                                {wardrobe.forEach(item => {
                                    return <img src={item.imgURL} alt={item.description}/>
                                })}
                            </div>
                        )
                    })}
                </div>
            </Wrapper>
            <FooterDiv>
                ADD NEW LOOKBOOK
            </FooterDiv>
            </>
        )
    }} return <div style={{display:'none'}}>invisible</div>
}

const Wrapper = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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