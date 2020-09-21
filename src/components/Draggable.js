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
		// if(!dragState.isDragging) return; // DON'T NEED THIS BECAUSE WE ONLY ATTACH THIS HANDLER WHEN DRAGGING IS TRUE
		// CALL OUR SET STATE HOOK, SETTING OUR NEW POSITIONS
		const translation = {x: clientX - dragState.origin.x, y: clientY - dragState.origin.y};
		setDragState(state => ({
					...state,
					translation
					// CAN'T USE THE FOLLOWING?
					//translation: {x: clientX - state.origin.x, y: clientY - state.origin.y}
				}));
	},[dragState.origin]);

	const handleMouseUp = React.useCallback(() => {
		//RESET TO ORIGINAL NON-DRAGGING STATE
		setDragState(state => ({
					...state,
					isDragging: false,
					// DON'T RESET TRANSLATION/ORIGIN HERE -- WE HAVE TO DO IT OUTSIDE OF THIS CALLBACK
				}));
	},[]);

	React.useEffect(() => {
		// ADD EVENT LISTENERS TO WINDOW WHENEVER WE CHANGE OUR DRAG STATE
		// (THIS MAKES SURE WE NEVER MISS OUR MOUSEMOVE/MOUSEUP)
		if (dragState.isDragging) {
			window.addEventListener('mouseup', handleMouseUp);
			window.addEventListener('mousemove', handleMouseMove);
			console.log("added.");
		} else {
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('mousemove', handleMouseMove);
			// CAN'T DO THIS INSIDE OF THE MOUSEUP. ??
			setDragState(state => ({
				...state,
				origin: POSITION,
				translation: POSITION
			}))
			console.log("removed...");
		}
	},[dragState.isDragging, handleMouseMove, handleMouseUp]); // WHY DO WE NEED TO INCLUDE THESE IN OUR DEPENDENCY ARRAY?

	// USE MEMO HOOK TO ADD STYLES WHILE OUR STATE IS DRAGGING
	const styles = React.useMemo(() => ({
		cursor: dragState.isDragging ? 'grabbing' : 'grab',
		transform: `translate(${dragState.translation['x']}px,${dragState.translation['y']}px)`, // MAKE OUR COMPONENT FOLLOW MOUSE
		transition: dragState.isDragging ? 'none' : 'transform 300ms', // TRANSITION WHEN RELEASING DRAGGABLE
		zIndex: dragState.isDragging ? 2 : 1, // MAKE DRAGGED ELEMENT SHOW UP ABOVE ALL OTHERS
		position: dragState.isDragging ? 'relative' : 'relative' // TO MAKE THE MATH WORK
	}),[dragState.isDragging,dragState.translation]);
	return (
		<div style={styles} onMouseDown={handleMouseDown}>
			{children}
		</div>
	);
};
export default Draggable;