import React from 'react';
import styled from 'styled-components';

const Songs = styled.div`
	border: 1px solid #333;
	padding: 3px;
	margin: 0 5px;
`;

const Song = (props) => {
	const { title } = props.song;

	return <Songs onClick={props.renderImageSong}>{title}</Songs>;
};
export default Song;
