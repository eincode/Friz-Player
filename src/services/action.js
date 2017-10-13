export const SET_ROOT_NAVIGATOR = 'SET_ROOT_NAVIGATOR'
export const SET_PLAYING_SONG = 'SET_PLAYING_SONG'
export const SET_SONGS_DATA = 'SET_SONGS_DATA'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'

export function setRootNavigator(rootNavigator) {
	return {
		type: SET_ROOT_NAVIGATOR,
		rootNavigator
	}
}
export function setPlayingSong(song) {
	return {
		type: SET_PLAYING_SONG,
		song
	}
}
export function setSongsData(data) {
	return {
		type: SET_SONGS_DATA,
		data
	}
}
export function setIsPlaying(isPlaying){
	return {
		type: SET_IS_PLAYING,
		isPlaying
	}
}