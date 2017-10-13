import { combineReducers } from 'redux'

import { SET_ROOT_NAVIGATOR, SET_PLAYING_SONG, SET_SONGS_DATA, SET_IS_PLAYING } from './action'

function rootNavigator(state = null, action) {
	switch (action.type) {
		case SET_ROOT_NAVIGATOR: {
			return action.rootNavigator
		}
		default: {
			return state
		}
	}
}
function song(state = null, action) {
	switch (action.type) {
		case SET_PLAYING_SONG: {
			return action.song
		}
		default: {
			return state
		}
	}
}
function data(state = null, action) {
	switch (action.type) {
		case SET_SONGS_DATA: {
			return action.data
		}
		default: {
			return state
		}
	}
}
function isPlaying(state = false, action) {
	switch (action.type) {
		case SET_IS_PLAYING: {
			return action.isPlaying
		}
		default: {
			return state
		}
	}
}
const app = combineReducers({
	rootNavigator,
	song,
	data,
	isPlaying
})

export default app