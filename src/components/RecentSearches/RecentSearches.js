import React, { Component } from 'react';

class RecentSearches extends Component {
	state = {
		recentSearches: []
	};

	addToLocalStorage = () => {
		// const recentSearches = [ ...this.state.recentSearches, this.props.searchTerms ];
		// this.setState({ recentSearches });
		// console.log(this.state.recentSearches);
	};

	render() {
		return <div>{this.addToLocalStorage()}</div>;
	}
}
export default RecentSearches;
