import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Sound from 'react-native-sound'

import metrics from '../config/metrics'

export default class MusicItem extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		albumArt: PropTypes.string.isRequired
	}

	play() {
		let music = new Sound(this.props.path, '', (error) => {
			if (error) {
				console.log(error)
				return
			}
			console.log(music.isLoaded())
			music.play((success) => {
				if (success) {
					alert('Finished playing')
				} else {
					console.log('error in playing')
				}
			})
		})
	}

	render() {
		const { title, artist, albumArt } = this.props
		return (
			<TouchableOpacity style={styles.container} onPress={() => this.play()}>
				<Image 
					source={{ uri: albumArt }}
					style={styles.albumArt}
				/>
				<View style={styles.text}>
					<View style={{ justifyContent: 'center' }}>
						<Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>{title}</Text>
					</View>
					<View style={{ justifyContent: 'center' }}>
						<Text style={{ color: 'black', fontSize: 15 }}>{artist}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		height: 70,
		flexDirection: 'row',
		width: metrics.DEVICE_WIDTH,
		marginBottom: 10
	},

	albumArt: {
		flex: 1,
		width: 70,
		height: 70,
		resizeMode: 'cover',
		margin: 10
	},

	text: {
		flex: 5,
		justifyContent: 'center'
	}
})