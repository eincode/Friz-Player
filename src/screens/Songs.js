import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList } from 'react-native'

import store from '../services/store'
import { setRootNavigator, setSongsData, setIsPlaying, setPlayingSong } from '../services/action'

import MusicBrowserModule from '../modules/modules'

import metrics from '../config/metrics'

import MusicItem from '../components/MusicItem'

import Icon from 'react-native-vector-icons/Ionicons'

export default class Songs extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: null,
			isPlaying: false,
			isPause: false,
			playing: {
				title: '',
				artist: '',
				albumArt: ''
			}
		}
	}

	componentDidMount() {
		store.dispatch(setRootNavigator(this.props.navigation))
		MusicBrowserModule.retreiveSongs((json) => {
			//console.log(json)
			store.dispatch(setSongsData(JSON.parse(json)))
			//console.log(store.getState().data)
			this.setState({ data: store.getState().data })
		})
	}

	render() {
		return (

			<View style={styles.listContainer}>
				{this.state.data != null ? (
					<FlatList
						style={{ flex: 1 }}
						data={this.state.data}
						renderItem={({ item }) => {
							return (
								<MusicItem
									title={item.title}
									artist={item.artist}
									albumArt={item.albumArt}
									onPress={() => {
										this.setState({
											isPlaying: true,

										})
										let playing = {
											title: item.title,
											artist: item.artist,
											albumArt: item.albumArt
										}
										store.dispatch(setIsPlaying(true))
										store.dispatch(setPlayingSong(playing))
									}}
								/>
							)
						}}
						keyExtractor={(item) => item.title}
					/>
				) : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	contentContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 40,
		paddingRight: 20,
		paddingLeft: 20
	},

	title: {
		fontSize: 23,
		margin: 10,
		marginLeft: 20,
		marginTop: 30,
		marginBottom: 20,
		fontFamily: 'Raleway',
		fontWeight: 'bold',
		color: 'black'
	},

	tabsContainer: {
		marginBottom: 5,
		marginLeft: 20,
		width: 220,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	tabsText: {
		fontFamily: 'Raleway',
		fontWeight: 'bold',
		fontSize: 15
	},

	tabs: {
		flex: 1
	},

	burger: {
		alignSelf: 'flex-end',
		height: 30,
		width: 30,
		resizeMode: 'contain',
	},

	listContainer: {
		marginTop: 20,
		flex: 1
	},
	playContainer: {
		height: 150,
		width: metrics.DEVICE_WIDTH,
		backgroundColor: '#22313F',
		bottom: 0,
	},
	musicContainer: {
		flex: .8,
		margin: 10,
		height: 70,
		flexDirection: 'row',
		width: metrics.DEVICE_WIDTH,
		marginBottom: 10
	},

	albumArt: {
		width: 50,
		height: 50,
		resizeMode: 'cover',
		margin: 10
	},

	text: {
		flex: 5,
		justifyContent: 'center',
	},
	playButtons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 100
	},
	musicContainerButton: {
		flex: .2,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 40,
	}
})
