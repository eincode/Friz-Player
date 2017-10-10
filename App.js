import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './src/services/store'

import Main from './src/screens/Main'
import Bla from './src/screens/Bla'

const rootNavigator = StackNavigator({
	main: { screen: Main },
	bla: { screen: Bla }
}, {
	navigationOptions: {
		header: null
	}
}
)

class App extends Component {
	
	render() {
		const App = rootNavigator
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}

}

export default App
