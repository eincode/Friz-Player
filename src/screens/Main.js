import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList } from 'react-native'
import Sound from 'react-native-sound'

import store from '../services/store'
import { setRootNavigator } from '../services/action'

import MusicBrowserModule from '../modules/modules'

import MusicItem from '../components/MusicItem'

export default class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
			activeTab: 'album',
			data: null
		}
	}

	componentDidMount() {
		store.dispatch(setRootNavigator(this.props.navigation))
		MusicBrowserModule.retreiveSongs((json) => {
			console.log(json)
			this.setState({ data: JSON.parse(json) })
		})
		Sound.setCategory('Playback')
	}

	render() {
		return (
			<View style={styles.container}>
				<Image 
					source={require('../../assets/icons/menu.png')}
					style={styles.burger}
				/>
				<Text style={styles.title}>
					Collection
				</Text>
				<View style={styles.tabsContainer}>
					<TouchableWithoutFeedback style={styles.tabs} onPress={() => this.setState({ activeTab: 'artist' })}>
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
					{this.state.data != null ?  (
						<FlatList 
							style={{ flex: 1 }}
							data={this.state.data}
							renderItem={({ item }) => {
								return (
									<MusicItem 
										title={item.title}
										artist={item.artist}
										albumArt={item.albumArt}
										path={item.path}
									/>
								)
							}}
						/>
					) : null}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
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
	}
})
