// user reducer

export const loadUserData = (data) => ({
    type: 'LOAD_USER_DATA',
    data,
})

export const unloadUserData = () => ({
    type: 'UNLOAD_USER_DATA',
})