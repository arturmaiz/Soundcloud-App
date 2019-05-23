import React, { Component } from 'react';

class SearchForm extends Component {
	state = {
		searchTerm: ''
	};

	handleSubmit = (e) => {
		e.preventDefault();

		if (!this.state.searchTerm) {
			return null;
		}
		this.props.fetchSongs(this.state.searchTerm);
		this.setState({ searchTerm: '' });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					onChange={(e) => this.setState({ searchTerm: e.target.value })}
					value={this.state.searchTerm}
					type="text"
					placeholder="Search"
				/>
				<button type="submit">Go</button>
			</form>
		);
	}
}
export default SearchForm;
