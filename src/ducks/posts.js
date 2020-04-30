// actions
const ADD = "posts/ADD"
const DELETE_LAST = "posts/DELETE_LAST"

const DEFAULT_STATE = []

// reducer
const postsReducer = (state = DEFAULT_STATE, action = {}) => {
	switch (action.type) {
	case ADD:
		return [...state, action.payload]
	case DELETE_LAST:
		return state.slice(0, -1)
	default:
		return state
	}
}

export default postsReducer

// action creators
export const addPost = post => ({type: ADD, payload: post})
export const deleteLast = () => ({type: DELETE_LAST})
