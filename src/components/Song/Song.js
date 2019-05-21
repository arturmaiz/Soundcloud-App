import React from 'react';

const Song = (props) => {
	const { title } = props.song;

	return <li>{title}</li>;
};
export default Song;
