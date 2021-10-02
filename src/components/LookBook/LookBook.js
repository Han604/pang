import React from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom'

const Lookbook = ({user}) => {
    if (user.data.lookbook.length) {
        return (
            <Wrapper>
                <LookbookDiv>
                    {user.data.lookbook.map((lookbook, index) => {
                        return (
                            <div key={index+1}>
                                <div style={{margin:'6px 0 6px 12px'}}>{lookbook.name}</div>
                                <ScrollingDiv>
                                    {lookbook.looks.map((item, index) => {
                                        return (
                                            <Link key={index + 1} to = {`/viewer/lookbook/${lookbook.lookbookId}/${user.data._id}/${index}`}>
                                                <LookbookItem src={item.imgURL} alt={item.description}/>
                                            </Link>
                                        )
                                    })}
                                </ScrollingDiv>
                            </div>
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
    overflow-y:scroll;
    height: calc(100vh - 400px);
    ::-webkit-scrollbar {
        display: none;
    }
`

const ScrollingDiv = styled.div`
    overflow-x: scroll;
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