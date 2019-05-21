import React, { Component } from 'react';
import SC from 'soundcloud';
import styled from 'styled-components';
import axios from 'axios';

import SearchForm from './SearchForm/SearchForm';
import Player from './Player/Player';
import RecentSearches from './RecentSearches/RecentSearches';
import SongsList from './SongsList/SongsList';
import Controls from './Controls/Controls';

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const CLIENT_ID = 'ggX0UomnLs0VmW7qZnCzw';
const PAGE_SIZE = 6;

class App extends Component {
	state = {
		songs: [],
		image: '',
		nextSongs: ''
	};

	componentDidMount() {
		this.fetchSongs();
	}

	fetchSongs = (searchTerm) => {
		SC.initialize({
			client_id: CLIENT_ID
		});

		SC.get('/tracks', {
			q: searchTerm,
			license: 'cc-by-sa',
			limit: PAGE_SIZE,
			linked_partitioning: 1
		}).then((tracks) => {
			this.setState({ songs: tracks.collection, nextSongs: tracks.next_href });
		});
	};

	renderNewSongs = () => {
		axios
			.get(this.state.nextSongs)
			.then((res) => this.setState({ nextSongs: res.data.next_href, songs: res.data.collection }));
	};

	render() {
		return (
			<Wrapper>
				<div className="left-col">
					<SearchForm fetchSongs={this.fetchSongs} />
					<SongsList songs={this.state.songs} />
					<Controls renderNewSongs={this.renderNewSongs} />
				</div>
				<div className="center-col">
					<Player songs={this.state.songs} />
				</div>
				<div className="right-col">
					<RecentSearches />
				</div>
			</Wrapper>
		);
	}
}
export default App;
