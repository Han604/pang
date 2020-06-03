const initialState = {
  newPost: false,
  newComment: false,
  newLookbook: false,
  newWardrobe: false,
  newAvatar: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'NEW_POST' : {
      return {
        newPost: true,
        newComment: false,
        newLookbook: false,
        newWardrobe: false,
        newAvatar: false
      }
    }
    case 'NEW_COMMENT' : {
      return {
        newPost: false,
        newComment: true,
        newLookbook: false,
        newWardrobe: false,
        newAvatar: false,
        post: action.data.data
      }
    }
    case 'NEW_LOOKBOOK' : {
      return {
        newPost: false,
        newComment: false,
        newLookbook: true,
        newWardrobe: false,
        newAvatar: false
      }
    }
    case 'NEW_WARDROBE' : {
      return {
        newPost: false,
        newComment: false,
        newLookbook: false,
        newWardrobe: true,
        newAvatar: false
      }
    }
    case 'NEW_AVATAR' : {
      return {
        newPost: false,
        newComment: false,
        newLookbook: false,
        newWardrobe: false,
        newAvatar: true
      }
    }
    case 'INITIAL_STATE' : {
      return {
        initialState
      }
    }
  
    default: {
      return state;
    }
  }
}