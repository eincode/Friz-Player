import { createStore } from 'redux'
import app from './reducer'
const store = createStore(app)

export default store