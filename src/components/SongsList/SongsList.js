import React from 'react';
import styled from 'styled-components';

import Song from '../Song/Song';

const SongList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const SongsList = (props) => {
	const song = props.songs.map((song) => (
		<Song renderImageSong={() => props.renderImageSong(song)} key={song.id} song={song} />
	));
	return <SongList>{song}</SongList>;
};
export default SongsList;
