import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import store from '../services/store'
import { setTabNavigator } from '../services/action'

import metrics from '../config/metrics'

import { connect } from 'react-redux'

class Artists extends Component {

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
		store.dispatch(setTabNavigator(this.props.navigation))
	}
	componentWillReceiveProps(nextProps){
		this.setState({data: nextProps.data})
	}
	render() {
		return (
			<View>
				<Text>Artist</Text>
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
function mapStateToProps(state) {
	return {
		data: state.data
	}
}

export default connect(mapStateToProps)(Artists)