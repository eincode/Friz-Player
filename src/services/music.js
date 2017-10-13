import Sound from 'react-native-sound'
import { Alert } from 'react-native'

var music
var playlist
var currentIndexPlaying = null

//Must be called whenever the playlist is changed
const initializePlayer = (musics) => {
	playlist = musics
}

//Play the song with index parameter from the playlist
const playSong = (index, onFinishedPlaying) => {
	if (music != null) {
		music.stop()
	}
	music = new Sound(playlist[index].path, '', (error) => {
		if (error) {
			Alert.alert('Error', 'Error playing music')
		}
		currentIndexPlaying = index
		music.play(() => {
			onFinishedPlaying()
		})
	})

}

//Don't forget to call release() after stopping the song to release the resources used by the player
const stopSong = (cb) => {
	music.stop()
	cb()
}

//Play the next song from the playlist
const nextSong = () => {
	stopSong(() => {
		playSong(++currentIndexPlaying)
	})
}

//Play the previous song from the playlist
const previousSong = () => {
	stopSong(() => {
		playSong(--currentIndexPlaying)
	})
}

//Pause the currently playing song, call resume() to resume the playback
const pause = () => {
	music.pause()
}

const resume = () => {
	music.play()
}

//Release resources used by the player. Only use this when intended to stop the entire playback (not pausing)
const release = () => {
	music.release
}

module.exports = {
	initializePlayer,
	playSong,
	stopSong,
	nextSong,
	resume,
	pause,
	release,
	previousSong
}