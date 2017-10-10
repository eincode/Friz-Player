import { combineReducers } from 'redux'

import { SET_RROT_NAVIGATOR } from './action'

function rootNavigator(state = null, action) {
	switch(action.type) {
	case SET_RROT_NAVIGATOR: {
		return action.rootNavigator
	}
	default: {
		return state
	}
	}
}

const app = combineReducers({
	rootNavigator
})

export default app