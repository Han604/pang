const initialState = {
  toggle: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_ON': {
      console.log('pang')
      return {
        toggle: true
      }
    }
    case 'TOGGLE_OFF': {
      return {
        toggle: false
      }
    }
    default: {
      return initialState
    }
  }
}