import React from 'react';
import styled from 'styled-components';

const IndividualComment = ({link, username, description, imgURL, userId, itemName, brand}) => {
  return(
    <>
    <Wrapper>
        <UsernameDiv>{username}</UsernameDiv>
        <div>{description}</div>
    </Wrapper> 
    {imgURL &&
      <ImageWrapper>
        <ImagePost src={`${imgURL}`} alt={itemName}/>
        <ItemDetailWrapper>
          <ItemName>{itemName.toUpperCase()}</ItemName>
          <Brand>{brand.toUpperCase()}</Brand>
          <ButtonLink><ItemLink href={`${link}`}>{link ? 'GO TO SITE' : 'NO LINK'}</ItemLink></ButtonLink>
        </ItemDetailWrapper>
      </ImageWrapper>
      }
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
text-decoration: none;
:visited {
  color: white;
  text-decoration: none;
}
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
  margin-left: 6px;
`

const ImageWrapper = styled.div`
  width: 80%;
  border: 1px solid black;
  display: flex;
  margin: 6px 0 12px 40px;
  padding: 6px 0px 6px 6px;
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