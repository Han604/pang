import React from 'react';
import styled from 'styled-components';

const Lookbook = ({user}) => {
    if (user.data.lookbook.length) {
        return (
            <Wrapper>
                {user.data.lookbook.forEach(item => {
                    return <img url={item.imgURL}/>
                })}
            </Wrapper>
        )
    } else {
        return <div>USER HASN'T CREATED ANY LOOKBOOKS YET</div>
    }
}

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 100px);
`

export default Lookbook