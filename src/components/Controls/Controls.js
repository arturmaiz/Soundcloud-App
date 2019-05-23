import React from 'react';
import styled from 'styled-components';

const Right = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Controls = (props) => {
	const renderList = () => {
		props.renderLayout('list');
	};

	const renderGrid = () => {
		props.renderLayout('grid');
	};

	return (
		<Right>
			<i onClick={props.renderNewSongs} className="fas fa-2x fa-arrow-right" />
			<div className="right">
				<i onClick={renderList} style={{ marginRight: '12px' }} className="fas fa-2x fa-list" />
				<i onClick={renderGrid} className="fas fa-2x fa-th-large" />
			</div>
		</Right>
	);
};
export default Controls;
