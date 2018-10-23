import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {}
const middlewares = [thunk]

export default createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middlewares),
		// window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)