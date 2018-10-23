import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import addVast from '../../actions/addVast'

import './VastsForm.css'

class VastsForm extends React.Component {
	/**
	 * holds refs for interactive inputs
	 * it's not managed state, no need of PureComponent or shoulcComponentUpdate
	 * holds possible values for position field
	 */
	constructor (props) {
		super(props);

		this.vastUrlRef = React.createRef();
		this.vastPositionRef = React.createRef();
		this.vastHideUiRef = React.createRef();

		this.state = {};
		this.state.options = ['bottom_right', 'top_left', 'top_middle', 'top_right', 'middle_left', 'middle_right', 'bottom_left', 'bottom_middle'];
	}

	/**
	 * send an addVast action to the store
	 * resets the form
	 * navigates to the vasts list with a new created Vast (locally)
	 * @param  {FormEvent} e
	 */
	onSubmit = e => {
		e.preventDefault();

		this.props.addVast({
			vast_url: this.vastUrlRef.current.value,
			position: this.vastPositionRef.current.value,
			hide_ui: this.vastHideUiRef.current.checked,
		});

		e.target.reset()

		this.props.history.push('/vasts')
	}

	render = () => (
		<form onSubmit={this.onSubmit} >
			<label>
				<input type="url" ref={this.vastUrlRef} name="vast_url" placeholder="Enter the vast url" />
			</label>
			<label>
				<select ref={this.vastPositionRef} name="hide_ui">
					{
						this.state.options.map(opt => <option key={ opt } value={ opt }>{ opt }</option>)
					}
				</select>
			</label>
			<label>
				<input type="checkbox" ref={this.vastHideUiRef} name="position" />
			</label>
			<input type="submit"/>
		</form>
	)
}

export default connect(null, { addVast }) (withRouter(VastsForm))