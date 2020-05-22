import React from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom'

const Wardrobe = ({user}) => {
    if (user.data.wardrobe.length >= 1) {
        return (
            <Wrapper>                
                {user.data.wardrobe.map((item, index) => {
                    return <Link key={index+1} to = {`/viewer/wardrobe/none/${user.data._id}/${index}`}><ImageItem src={item.imgURL} alt={item.description}/></Link>
                })}
            </Wrapper>
        )
    } else {
        return <div style={{textAlign:'center', marginTop:'25px'}}>USER HASN'T STARTED THEIR WARDROBE YET</div>
    }
}

const ImageItem = styled.img`
    height: 100px;
    width: 100%;
    object-fit: scale-down;
    border: 1px solid white;
`

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 100px;
`

export default Wardrobe