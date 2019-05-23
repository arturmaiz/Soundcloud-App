import React from 'react';
import styled from 'styled-components';

const PlayerWrapper = styled.div``;

const Player = (props) => {
	return (
		<div>
			<PlayerWrapper onClick={() => props.playSong()}>{props.selectedSong}</PlayerWrapper>
		</div>
	);
};
export default Player;
