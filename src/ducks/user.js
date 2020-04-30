// actions
const LOGIN = "user/LOGIN"
const LOGOUT = "user/LOGOUT"

const DEFAULT_STATE = null

// reducer
const userReducer = (state = DEFAULT_STATE, action = {}) => {
	switch (action.type) {
	case LOGIN:
		return {...action.payload}
	case LOGOUT:
		return null
	default:
		return state
	}
}

export default userReducer

// action creators
export const loginUser = user => ({type: LOGIN, payload: user})

export const logoutUser = () => ({type: LOGOUT})
