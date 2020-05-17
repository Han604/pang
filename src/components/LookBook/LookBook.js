import React from 'react';
import styled from 'styled-components';

const Lookbook = ({user}) => {
    if (user.data.lookbook.length) {
        return (
            <Wrapper>
                <LookbookDiv>
                    {user.data.lookbook.map(lookbook => {
                        return (
                            <>
                                <div style={{margin:'6px 0 6px 12px'}}>{lookbook.name}</div>
                                <ScrollingDiv>
                                    {lookbook.looks.map((item, index) => {
                                        return <LookbookItem key={index + 1} src={item.imgURL} alt={item.description}/>
                                    })}
                                </ScrollingDiv>
                            </>
                        )
                    })}
                </LookbookDiv>
            </Wrapper>
        )
    } else {
        return <div style={{textAlign:'center', marginTop:'25px'}}>USER HASN'T CREATED ANY LOOKBOOKS YET</div>
    }
}

const Wrapper = styled.div`
    width: 100%;
    overflow-y:auto;
`

const ScrollingDiv = styled.div`
    overflow-x: auto;
    width: 100%;
    height: auto;
    display: flex;
    margin-left: 12px;
`

const LookbookItem = styled.img`
    height: 100px;
    margin-right: 12px;
    object-fit: contain;
`

const LookbookDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export default Lookbook