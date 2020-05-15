import React from 'react';
import styled from 'styled-components';

const IndividualComment = ({link, username, description, imgURL, userId, itemName, brand}) => {
  return(
    <>
    <Wrapper>
        <UsernameDiv>{username}</UsernameDiv>
        <div>{description}</div>
    </Wrapper> 
    {imgURL ? 
      <ImageWrapper>
        <ImagePost src={`${imgURL}`} alt={itemName}/>
        <ItemDetailWrapper>
          <ItemName>{itemName.toUpperCase()}</ItemName>
          <Brand>{brand.toUpperCase()}</Brand>
          <ItemLink url={`${link}`}><ButtonLink>{link ? 'GO TO SITE' : 'NO LINK'}</ButtonLink></ItemLink>
        </ItemDetailWrapper>
      </ImageWrapper> :
      null}
    </>
    )
}

const ButtonLink = styled.button`
  width: 150px;
  background-color: black;
  color: white;
  outline: none;
  border: none;
`

const ItemLink = styled.a`

`

const Brand = styled.div`

`

const ItemName = styled.div`
  
`

const ItemDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  margin-bottom: 12px;
`

const ImageWrapper = styled.div`
  width: 80%;
  border: 1px solid black;
  display: flex;
  margin: 6px 0 12px 40px;
`

const ImagePost = styled.img`
  height: 75px;
  object-fit: contain;
`

const UsernameDiv = styled.div`
  font-size:small;
  color:grey;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`

export default IndividualComment