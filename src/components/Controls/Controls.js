import React from 'react';

const Controls = (props) => {
	return (
		<div>
			<i onClick={props.renderNewSongs} className="fas fa-2x fa-arrow-right" />
			<i className="fas fa-2x fa-list" />
			<i className="fas fa-2x fa-th-large" />
		</div>
	);
};
export default Controls;
