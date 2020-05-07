import React from 'react';
import styled from 'styled-components';

const Wardrobe = ({user}) => {
    if (user.data.wardrobe.length >= 1) {
        return (
            <Wrapper>                
                {user.data.wardrobe.forEach(item => {
                    return <img url={item.imgURL}/>
                })}
            </Wrapper>
        )
    } else {
        return <div>USER HASN'T STARTED THEIR WARDROBE YET</div>
    }
}

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 100px);
`

export default Wardrobe