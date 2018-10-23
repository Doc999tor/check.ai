import { ADD_VAST, FETCH_VAST } from '../actions/types'

const initialState = {
	vasts: [{
		vast: '',
		position: '',
		hideUi: 0,
	}]
}
export default (state = initialState, action) => {
	console.log(`${action.type} reducer`)
	switch (action.type) {
		case FETCH_VAST:
			return {
				...state,
				vasts: action.payload
			}
		case ADD_VAST:
			return {
				...state,
				vasts: [...state.vasts, action.payload]
			}
		default: return state;
	}
}