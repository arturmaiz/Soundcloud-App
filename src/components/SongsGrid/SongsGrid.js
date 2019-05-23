import React from 'react';

import Song from '../Song/Song';

const SongsGrid = (props) => {
	const song = props.songs.map((song) => (
		<Song renderImageSong={() => props.renderImageSong(song)} key={song.id} song={song} />
	));
	return <div>{song}</div>;
};
export default SongsGrid;
