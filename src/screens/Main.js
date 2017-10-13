import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList } from 'react-native'

import { TabNavigator } from 'react-navigation'

import store from '../services/store'
import { setRootNavigator, setSongsData } from '../services/action'

import MusicBrowserModule from '../modules/modules'

import metrics from '../config/metrics'

import MusicItem from '../components/MusicItem'

import Icon from 'react-native-vector-icons/Ionicons'

import Artists from '../screens/Artists'
import Albums from '../screens/Albums'
import Songs from '../screens/Songs'

const Tab = TabNavigator({
	Artists: {
		screen: Artists
	},
	Albums: {
		screen: Artists
	},
	Songs: {
		screen: Songs
	}
}, {
	navigationOptions: {
		tabBarVisible: false
	}
	})

export default class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
			activeTab: 'album',
			data: null,
			isPlaying: store.getState().isPlaying,
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
		})
		console.log(this.state.isPlaying)
		setInterval(() => {
			this.setState({
				isPlaying: store.getState().isPlaying,
				playing: store.getState().song
			})
		}

			, 1000)
	}

	componentWillReceiveProps() {
		this.setState({
			isPlaying: store.getState().isPlaying,
			playing: store.getState().song
		})
		console.log('succes')
	}
	renderPlay() {
		return (
			<View style={styles.playContainer}>
				<View style={{ flexDirection: 'row' }}>
					<View style={styles.musicContainer}>
						<Image
							source={{ uri: this.state.playing.albumArt }}
							style={styles.albumArt}
						/>
						<View style={styles.text}>
							<View style={{ justifyContent: 'center' }}>
								<Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>{this.state.playing.title}</Text>
							</View>
							<View style={{ justifyContent: 'center' }}>
								<Text style={{ color: 'white', fontSize: 10 }}>{this.state.playing.artist}</Text>
							</View>
						</View>
					</View>
					<View style={styles.musicContainerButton}>
						<Icon name='ios-heart-outline' size={30} color='white' />
						<Icon name='ios-add-outline' size={40} color='white' />
					</View>
				</View>
				<View style={styles.playButtons}>
					<Icon name='ios-skip-backward-outline' size={30} color='white' />
					<Icon name={this.state.isPause ? 'ios-play-outline' : 'ios-pause-outline'} size={30} color='white' onPress={() => this.setState({ isPause: !this.state.isPause })} />
					<Icon name='ios-skip-forward-outline' size={30} color='white' />
				</View>
			</View >
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<Image
						source={require('../../assets/icons/menu.png')}
						style={styles.burger}
					/>
					<Text style={styles.title}>
						Collection
				</Text>
					<View style={styles.tabsContainer}>
						<TouchableWithoutFeedback style={styles.tabs} onPress={() => console.log(store.getState().isPlaying)}>
							<View>
								<Text style={[styles.tabsText, this.state.activeTab == 'artist' ? { color: 'black' } : { color: 'grey' }]}>Artist</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback style={styles.tabs} onPress={() => this.setState({ activeTab: 'album' })}>
							<View>
								<Text style={[styles.tabsText, this.state.activeTab == 'album' ? { color: 'black' } : { color: 'grey' }]}>Albums</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback style={styles.tabs} onPress={() => this.setState({ activeTab: 'song' })}>
							<View>
								<Text style={[styles.tabsText, this.state.activeTab == 'song' ? { color: 'black' } : { color: 'grey' }]}>Songs</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={styles.listContainer}>
						<Tab />
					</View>
				</View>
				{
					this.state.isPlaying ? this.renderPlay() : null
				}
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
		flex: .2,
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
