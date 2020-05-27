// user reducer

export const loadUserData = (data) => ({
    type: 'LOAD_USER_DATA',
    data,
})

export const updateUserState = () => ({
    type: 'UPDATE_USER_STATE'
})

export const updateUserLookbook = (data) => ({
    type: 'UPDATE_USER_LOOKBOOK'
})

// desktop toggle reducer

export const toggleNewPost = () => ({
    type: 'NEW_POST'
})

export const toggleComment = (data) => ({
    type: 'NEW_COMMENT',
    data
})

export const toggleLookbook = () => ({
    type: 'NEW_LOOKBOOK'
})

export const toggleWardrobe = () => ({
    type: 'NEW_WARDROBE'
})

export const toggleAvatar = () => ({
    type: 'NEW_AVATAR'
})

export const returnBaseState = () => ({
    type: 'INITIAL_STATE'
})

// sidebar reducer

export const sidebarToggleOn = () => ({
    type: 'TOGGLE_ON'
})

export const sidebarToggleOff = () => ({
    type: 'TOGGLE_OFF'
})