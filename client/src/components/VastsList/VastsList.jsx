import React from 'react';
import { connect } from 'react-redux'

import getVasts from '../../actions/getVasts'

import './VastsList.css'

class VastsList extends React.Component {
	componentDidMount () {
		this.props.getVasts();
	}

	render = () => (
		<table>
			<thead>
				<tr>
				{
					Object.keys(this.props.vasts[0]).map(key => <td key={key}>{ key }</td>)
				}
				</tr>
			</thead>
			<tbody>
			{
				this.props.vasts.map(n =>
					<tr key={ Number(n.videoId) }>
						<td>{ n.vast }</td>
						<td>{ n.position }</td>
						<td>{ n.hideUi }</td>
					</tr>
				)
			}
			</tbody>
		</table>
	)
}

const mapStateToProps = state => ({
	vasts: state.data.vasts
})

export default connect(mapStateToProps, { getVasts })(VastsList)