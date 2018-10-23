import { ADD_VAST } from '../actions/types'

export default addedVast => dispatch => {
	console.log('adding a vast')

	const urlencodedBody = Object.keys(addedVast).map(key => key + '=' + encodeURIComponent(addedVast[key])).join('&');
	return fetch('http://localhost:9000/vasts', {
		method: "POST",
		headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
		cors: true,
		body: urlencodedBody
	}).then(result => {
		/**
		 * only correct response status is 201, anything else is an error
		 */
		if (result.status !== 201) {
			console.error(result, urlencodedBody)
		}
		return result.text()
	})
	.then(videoId => {
		/**
		 * creates locally (in the store) a newly created vast with a generated videoId
		 * @type {[type]}
		 */
		addedVast.videoId = videoId;
		dispatch({
			type: ADD_VAST,
			payload: addedVast,
		})
	})
}