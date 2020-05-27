import React from 'react';
import styled from 'styled-components';

import {useParams, useHistory} from 'react-router-dom'; 
import {useSelector} from 'react-redux';

import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import fetch from 'node-fetch';

const Viewer = () => {
  const [album, setAlbum] = React.useState(null); 
  const [loading, setLoading] = React.useState(null); 
  const {type, albumId, userId, index } = useParams();
  
  const [albumIndex, setAlbumIndex] = React.useState(parseInt(index))
  
  const history = useHistory();
  const user = useSelector(state=> state.users)
  

  React.useEffect(() => {
    if(user._id) {
      setLoading('loading')
      console.log('pang')
      fetch(`/api/viewer/${type}/${albumId}/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAlbum(data.data)
        setLoading('idle')
      })
    } else {
      history.push('/')
    }
  }, [])
  
  const backArrow = () => {
    setAlbumIndex(albumIndex - 1)
  }

  const forwardArrow = () => {
    setAlbumIndex(albumIndex + 1)
  }
  
  if (loading === 'idle') {
    return (
      <>
      <Header title={'viewer'}/>
        {type === 'wardrobe' ? 
          <Wrapper>
            {albumIndex > 0 && <BackButton onClick={()=>backArrow()}>&lt;</BackButton>}
            {albumIndex < album.length - 1 && <ForwardButton onClick={()=>forwardArrow()}>&gt;</ForwardButton>}
            <AlbumImage src={album[albumIndex].imgURL} alt={'nothing right now'}/>
            <DescriptionDiv>
              <ItemNameDiv>ITEM: {album[albumIndex].itemName.toUpperCase()}</ItemNameDiv>
              <BrandDiv>BRAND: {album[albumIndex].brand.toUpperCase()}</BrandDiv>
              <ItemLink href={album[albumIndex].link ? album[albumIndex].link : null}>{album[albumIndex].link ? 'VISIT WEBSITE' : 'NO LINK'}</ItemLink>
            </DescriptionDiv> 
            <Footer onClick={()=>history.goBack()}><div style={{margin:'6px 0px 0px 12px'}}>GO BACK</div></Footer>
          </Wrapper> :
          <Wrapper>
            {albumIndex > 0 && <BackButton onClick={()=>backArrow()}>&lt;</BackButton>}
            {albumIndex < album.looks.length - 1 && <ForwardButton onClick={()=>forwardArrow()}>&gt;</ForwardButton>}
            <AlbumImage src={album.looks[albumIndex].imgURL} alt={'nothing right now'}/>  
            <DescriptionDiv>
              <LookbookName>LOOKBOOK: {album.name.toUpperCase()}</LookbookName>
              <AlbumDescriptionDiv>DESCRIPTION: {album.looks[albumIndex].description}</AlbumDescriptionDiv>
            </DescriptionDiv>
            <Footer onClick={()=>history.goBack()}><div style={{margin:'6px 0px 0px 12px'}}>GO BACK</div></Footer>
          </Wrapper>
          }
      </>
  )} else {
    return (
      <Loading/>
    )
  }
}

const AlbumDescriptionDiv = styled.div`
  margin: 6px 0 0 12px;
  font-size: large;
`

const LookbookName = styled.div`
  margin: 6px 0 0 12px;
  font-size: large;
`

const BrandDiv = styled.div`
  margin: 6px 0 0 12px;
  font-size: large;
`

const ItemNameDiv = styled.div`
  margin: 6px 0 0 12px;
  font-size: large;
`

const ItemLink = styled.a`
  margin: 6px 12px 0 12px;
  text-align: center;
  text-decoration: none;
  font-size: large;
  background-color: black;
  color: white;
  :visited {
    color: white;
    text-decoration: none;
  }
`

const BackButton = styled.div`
  position: absolute;
  left: 10px;
  top: 250px;
  color: black;
  outline: none;
  border: none;
`

const ForwardButton = styled.div`
  position: absolute;  
  right: 10px;
  top: 250px;
  color: black;
  outline: none;
  border: none;
`

const Footer = styled.div`
    border-top: 1px solid lightgrey;
    width: 100%;
    height: 35px;
    @media (max-width: 812px) {
        position: absolute;
        bottom: 0px;
    }
`

const AlbumImage = styled.img`
  object-fit: scale-down;
  height: 300px;
  border-bottom: 1px solid grey;
`

const Wrapper = styled.div`
  display:flex;
  justify-content: center;
  flex-direction: column;
`

const DescriptionDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export default Viewer