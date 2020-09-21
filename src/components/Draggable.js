/** Following Tutorial from https://engineering.salesforce.com/hooking-your-audience-using-drag-drop-in-react-6ba1118dab84
  * Uses React Hooks and StyledComponents
  */
import React from 'react';
import styled from 'styled-components';

function Draggable({children}) {
	return (
		<div>
			{children}
		</div>
	);
};
export default Draggable;