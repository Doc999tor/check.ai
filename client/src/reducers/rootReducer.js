import { combineReducers } from 'redux'
import vastReducer from './vastReducer'

export default combineReducers({
	data: vastReducer
})