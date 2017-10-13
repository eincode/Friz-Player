import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, StatusBar, TouchableNativeFeedback } from 'react-native'

import { TabNavigator } from 'react-navigation'

import store from '../services/store'
import { connect } from 'react-redux'
import { setRootNavigator, setSongsData } from '../services/action'

import MusicBrowserModule from '../modules/modules'

import metrics from '../config/metrics'

import Icon from 'react-native-vector-icons/Ionicons'

import Artists from '../screens/Artists'
import Albums from '../screens/Albums'
import Songs from '../screens/Songs'

const Tab = TabNavigator({
	Artists: {
		screen: Artists
	},
	Albums: {
		screen: Albums
	},
	Songs: {
		screen: Songs
	}
}, {
		navigationOptions: {
			tabBarVisible: false
		}

	})

class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
			activeTab: 'Artists',
			data: null,
			isPlaying: false,
			isPause: false,
			playing: {
				albumArt: '',
				title: '',
				artist: ''
			}
		}
	}

	componentDidMount() {
		store.dispatch(setRootNavigator(this.props.navigation))
		MusicBrowserModule.retreiveSongs((json) => {
			store.dispatch(setSongsData(JSON.parse(json)))
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isPlaying: nextProps.isPlaying,
			playing: nextProps.song
		})
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
					<TouchableNativeFeedback>
						<View style={styles.buttons}>
							<Icon name='ios-skip-backward-outline' size={30} color='white' />
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback  onPress={() => this.setState({ isPause: !this.state.isPause })} >
						<View style={styles.buttons}>
							<Icon name={this.state.isPause ? 'ios-play-outline' : 'ios-pause-outline'} size={30} color='white'/>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback>
						<View style={styles.buttons}>
							<Icon name='ios-skip-forward-outline' size={30} color='white' />
						</View>
					</TouchableNativeFeedback>
				</View>
			</View >
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle='dark-content' backgroundColor="white" />
				<View style={styles.contentContainer}>
					<Image
						source={require('../../assets/icons/menu.png')}
						style={styles.burger}
					/>
					<Text style={styles.title}>
						Collection
					</Text>
					<View style={styles.tabsContainer}>
						<TouchableWithoutFeedback style={styles.tabs} onPress={() => {
							this.setState({ activeTab: 'Artists' })
							this.props.tabNavigator.navigate('Artists')
						}}>
							<View>
								<Text style={[styles.tabsText, this.state.activeTab == 'Artists' ? { color: 'black' } : { color: 'grey' }]}>Artist</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback style={styles.tabs} onPress={() => {
							this.setState({ activeTab: 'Albums' })
							this.props.tabNavigator.navigate('Albums')
						}}>
							<View>
								<Text style={[styles.tabsText, this.state.activeTab == 'Albums' ? { color: 'black' } : { color: 'grey' }]}>Albums</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback style={styles.tabs} onPress={() => {
							this.setState({ activeTab: 'Songs' })
							this.props.tabNavigator.navigate('Songs')
						}}>
							<View>
								<Text style={[styles.tabsText, this.state.activeTab == 'Songs' ? { color: 'black' } : { color: 'grey' }]}>Songs</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={styles.listContainer}>
						<Tab onNavigationStateChange={(prev, next) => this.setState({ activeTab: next.routes[next.index].key })} />
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
		flex: .3,
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
		paddingHorizontal: 100,
		alignItems: 'center',
	},
	musicContainerButton: {
		flex: .2,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 40,
	},
	buttons: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	}
})
function mapStateToProps(state) {
	return {
		isPlaying: state.isPlaying,
		song: state.song,
		tabNavigator: state.tabNavigator
	}
}

export default connect(mapStateToProps)(Main)