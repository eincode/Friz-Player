import Sound from 'react-native-sound'
import { Alert } from 'react-native'

var music
var playlist
var currentIndexPlaying = null

const initializePlayer = (musics) => {
	playlist = musics
}

const playSong = (index, onFinishedPlaying) => {
	music = new Sound(playlist[index].path, '', (error) => {
		if (error) {
			Alert.alert('Error', 'Error playing music')
		}
		music.play(() => {
			currentIndexPlaying = index
			onFinishedPlaying()
		})
	})

}

const stopSong = (cb) => {
	music.stop()
	cb()
}

const nextSong = () => {
	this.stopSong(() => {
		this.playSong(++currentIndexPlaying)
	})
}

module.exports = {
	initializePlayer,
	playSong,
	stopSong,
	nextSong
}