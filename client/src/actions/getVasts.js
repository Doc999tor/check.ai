import { FETCH_VAST } from '../actions/types'

/**
 * async loading the initial data with redux-thunk
 * @return {promise}
 */
export default getVasts => dispatch => {
	console.log('fetching vasts')
	return fetch('http://localhost:9000/vasts', {cors: true})
	.then(response => response.text())
	.then(xml => {
		/**
		 * here we can parse XML and collect needed nodes
		 * below simulated the same results
		 * @type {vast[]}
		 */
		const vasts = xml.replace(/\s/g, '').match(/swf\?.*?\]/g)
			.map(
				mediaFile => mediaFile
					.slice(4,-1).split('&')
					.reduce((o, pairs) => {
						const [k,v] = pairs.split('=');
						o[k] = decodeURIComponent(v);
						return o;
					}, {})
			)

		dispatch({
			type: FETCH_VAST,
			payload: vasts,
		})
	})
}