/** Following Tutorial from https://engineering.salesforce.com/hooking-your-audience-using-drag-drop-in-react-6ba1118dab84
  * Uses React Hooks and StyledComponents
  */
import React from 'react';
import styled from 'styled-components';

const POSITION = {x: 0, y: 0} // CURSOR POSITION DEFAULT

function Draggable({children}) {
	const [dragState, setDragState] = React.useState({
		isDragging: false,
		origin: POSITION, // cursor position at time of mousedown
		translation: POSITION // element position relative to cursor position
	});

	// USE MEMOIZED CALLBACK FUNCTIONS TO SAVE RE-RENDERING
	const handleMouseDown = React.useCallback(({clientX, clientY}) => {
		// CALL OUR SET STATE HOOK, SETTING OUR ORIGIN
		setDragState(state => ({
					...state,
					isDragging: true,
					origin: {x: clientX, y: clientY}
				}));
	},[]);

	const handleMouseMove = React.useCallback(({clientX, clientY}) => {
		if(!dragState.isDragging) return;
		// CALL OUR SET STATE HOOK, SETTING OUR NEW POSITIONS
		setDragState(state => ({
					...state,
					translation: {x: clientX - state.origin.x, y: clientY - state.origin.y}
				}));
	},[dragState.isDragging]);

	const handleMouseUp = React.useCallback(() => {
		//RESET TO ORIGINAL NON-DRAGGING STATE
		setDragState(state => ({
					...state,
					isDragging: false,
					origin: POSITION,
					translation: POSITION
				}));
	},[]);

	// USE MEMO HOOK TO ADD STYLES WHILE OUR STATE IS DRAGGING
	const styles = React.useMemo(() => ({
		cursor: dragState.isDragging ? 'grabbing' : 'grab',
		transform: `translate(${dragState.translation['x']}px,${dragState.translation['y']}px)`, // MAKE OUR COMPONENT FOLLOW MOUSE
		transition: dragState.isDragging ? 'none' : 'transform 300ms', // TRANSITION WHEN RELEASING DRAGGABLE
		zIndex: dragState.isDragging ? 2 : 1, // MAKE DRAGGED ELEMENT SHOW UP ABOVE ALL OTHERS
		position: dragState.isDragging ? 'relative' : 'relative' // TO MAKE THE MATH WORK
	}),[dragState.isDragging,dragState.translation]);
	return (
		<div style={styles} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
			{children}
		</div>
	);
};
export default Draggable;