import React, { Component } from 'react';
import SC from 'soundcloud';
import styled from 'styled-components';
import axios from 'axios';

import SearchForm from './SearchForm/SearchForm';
import Player from './Player/Player';
import RecentSearches from './RecentSearches/RecentSearches';
import SongsList from './SongsList/SongsList';
import SongsGrid from './SongsGrid/SongsGrid';
import Controls from './Controls/Controls';

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const LeftDiv = styled.div`
	box-shadow: 0 4px 9px 1px #333;
	padding: 10px;
	width: 50%;
	margin: 0 5px;
	height: 60%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const CenterDiv = styled.div`
	box-shadow: 0 4px 9px 1px #333;
	padding: 10px;
	width: 50%;
	margin: 0 5px;
	height: 60%;
`;

const RightDiv = styled.div`
	box-shadow: 0 4px 9px 1px #333;
	padding: 10px;
	width: 50%;
	margin: 0 5px;
	height: 60%;
`;

const CLIENT_ID = 'ggX0UomnLs0VmW7qZnCzw';
const PAGE_SIZE = 6;

class App extends Component {
	state = {
		songs: [],
		nextSongs: '',
		layout: 'list',
		oEmbed: '',
		searchTerms: [],
		selectedSong: ''
	};

	componentDidMount() {
		// TODOS: Implement localstorage
		this.fetchSongs();
	}

	fetchSongs = (searchTerm) => {
		let newSearchTerms = this.state.searchTerms;
		newSearchTerms = searchTerm;
		this.setState({ searchTerms: newSearchTerms });

		SC.initialize({
			client_id: CLIENT_ID
		});

		SC.get('/tracks', {
			q: `${this.state.searchTerms}`,
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

	renderLayout = (layout) => {
		let newlayout = this.state.layout;
		newlayout = layout;
		this.setState({ layout: newlayout });
	};

	renderImageSong = (song) => {
		const songs = !song.artwork_url ? (
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
				alt="place holder"
			/>
		) : (
			<img onClick={() => this.playSong(song.id)} src={song.artwork_url} alt="img" />
		);
		let copySong = this.state.selectedSong;
		copySong = songs;
		this.setState({ selectedSong: copySong });
	};

	playSong = (id) => {
		// TODOS: replace this with embed widget!
		// User can STOP/PAUSE
		SC.stream(`/tracks/${id}`).then(function(player) {
			player.play();
		});
	};

	render() {
		return (
			<Wrapper>
				<LeftDiv className="left-div">
					<SearchForm fetchSongs={this.fetchSongs} />
					{this.state.layout === 'grid' ? (
						<SongsList renderImageSong={this.renderImageSong} songs={this.state.songs} />
					) : (
						<SongsGrid renderImageSong={this.renderImageSong} songs={this.state.songs} />
					)}
					<Controls renderLayout={this.renderLayout} renderNewSongs={this.renderNewSongs} />
				</LeftDiv>
				<CenterDiv className="center-div">
					<Player
						songs={this.state.songs}
						playSong={this.playSong}
						oEmbed={this.state.oEmbed}
						selectedSong={this.state.selectedSong}
					/>
				</CenterDiv>
				<RightDiv className="right-div">
					<RecentSearches searchTerms={this.state.searchTerms} />
				</RightDiv>
			</Wrapper>
		);
	}
}
export default App;
