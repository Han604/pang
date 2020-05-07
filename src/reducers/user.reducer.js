const initialState = {
    email: null,
    username: null,
    name: null,
    avatar: null,
    _id: null,
    email_verified: null,
    followedBy: [],
    following: [],
    posts:[],
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER_DATA' : {
            const {data} = action
            return {
                ...state,
                username: data.data.username,
                name: data.data.name,
                email: data.data.email,
                _id: data.data._id,
                avatar: data.data.avatar,
                wardrobe: data.data.wardrobe,
                lookbook: data.data.lookbook
            }
        }
        default: {
            return state;
        }
    }
    
}