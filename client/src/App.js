import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Header from './components/Header/Header';
import VastsList from './components/VastsList/VastsList';
import VastsForm from './components/VastsForm/VastsForm';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {};

		const routerLinks = [
			{url: "/vasts", text: 'Vasts'},
			{url: "/form", text: 'Form'},
		];
		this.state.links = routerLinks;
	}

	render() {
		return (
			<Router>
			<>
				<Header links={this.state.links} title={this.state.links.find(t => t.url === window.location.pathname).text} ></Header>

				<Switch>
					<Redirect exact from="/" to={this.state.links[0].url} />

					<Route path="/vasts" render={
						(props) => (
							<VastsList />
						)
					} />
					<Route path="/form" render={
						(props) => (
							<VastsForm />
						)
					} />
				</Switch>
			</>
			</Router>
		);
	}
}

export default App;
