import React from 'react';

import Song from '../Song/Song';

const SongsList = (props) => {
	const song = props.songs.map((song) => <Song key={song.id} song={song} />);
	return <div>{song}</div>;
};
export default SongsList;
