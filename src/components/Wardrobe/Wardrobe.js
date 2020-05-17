import React from 'react';
import styled from 'styled-components';

const Wardrobe = ({user}) => {
    if (user.data.wardrobe.length >= 1) {
        return (
            <Wrapper>                
                {user.data.wardrobe.map(item => {
                    return <ImageItem src={item.imgURL} alt={item.description}/>
                })}
            </Wrapper>
        )
    } else {
        return <div style={{textAlign:'center', marginTop:'25px'}}>USER HASN'T STARTED THEIR WARDROBE YET</div>
    }
}

const ImageItem = styled.img`
    height: 100px;
    object-fit: contain;
    border: 1px solid white;
`

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 100px;
`

export default Wardrobe