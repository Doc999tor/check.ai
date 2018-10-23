import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
	render () {
		return (
		  <header>
		  	<h1>{this.props.title}</h1>
				<nav>
					{
						this.props.links.map((link, index) => (
							<Link key={index} to={link.url}>{link.text}</Link>
						))
					}
				</nav>
		  </header>
		)
	}
}