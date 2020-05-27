import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


import DesktopNewPost from './DesktopNewPost';
import DesktopNewAvatar from './DesktopNewAvatar';
import DesktopNewWardrobe from './DesktopNewWardrobe';
import DesktopNewLookbook from './DesktopNewLookbook';
import DesktopNewComment from './DesktopNewComment';

const DesktopModal = () => {
  const toggle = useSelector(state => state.desktopToggle);

  if(toggle.newPost === true) {
    return (
      <DesktopNewPost/>
    )
  } else if(toggle.newAvatar === true) {
    return (
      <DesktopNewAvatar/>
    )
  } else if(toggle.newWardrobe === true) {
    return (
      <DesktopNewWardrobe/>
    )
  } else if(toggle.newLookbook === true) {
    return (
      <DesktopNewLookbook/>
    )
  } else if(toggle.newComment === true) {
    if (toggle.post) { 
      return (
        <DesktopNewComment post={toggle.post}/>
      )
    } else {
      return (
        <div>loading</div>
      )
    }
  } 
  else {
    return (
        <div style={{display:'none'}}>null</div>
      )
  }
}
export default DesktopModal