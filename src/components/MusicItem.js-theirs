import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import PropTypes from 'prop-types'

import metrics from '../config/metrics'

export default class MusicItem extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		albumArt: PropTypes.string.isRequired
	}

	render() {
		const { title, artist, albumArt, ...props } = this.props
		return (
			<TouchableNativeFeedback {...props}>
				<View style={styles.container}>
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
				</View>
			</TouchableNativeFeedback>
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