/** Following Tutorial from https://engineering.salesforce.com/hooking-your-audience-using-drag-drop-in-react-6ba1118dab84
  * Uses React Hooks and StyledComponents
  */
import React, {useState, useCallback} from 'react';
import Draggable from './Draggable';
import styled from 'styled-components';

//WE WOULD DO SOMETHING TO HOOK INTO REDUX/STATE MANAGEMENT HERE
const HEIGHT = 100;

function DragDropContainerWithHooks() {
    const items = [0,1,2,3,4];
    const [state,setState] = useState({
        order: items,
        dragOrder: items, // LIVE SORTED ORDER OF ITEMS AS WE ARE DRAGGING
        draggedIndex: null // CURRENT DRAGGED ROW
    });

    const handleDrag = useCallback(({translation,id}) => {
        const delta = Math.round(translation.y / HEIGHT);
        const index = state.order.indexOf(id);
        const dragOrder = state.order.filter((a) => (a !== id));
        if (!((index + delta) >= 0 && (index + delta) < items.length)) {
            return;
        }
        dragOrder.splice(index + delta, 0, id);
        setState(state => ({
                    ...state,
                    dragOrder,
                    draggedIndex: id
                }));
    },[state.order,items.length]);

    const handleDragEnd = useCallback(() => {
        setState(state => ({
                    ...state,
                    order: state.dragOrder,
                    draggedIndex: null
                }));
    },[]);

    return <div>
        {
            items.map((index) => {
                const isDragging = state.draggedIndex === index;
                const dragTop = (HEIGHT + 10) * state.order.indexOf(index);
                const top = (HEIGHT + 10) * state.dragOrder.indexOf(index);
                    return (
                    <Draggable key={index} onDragEnd={handleDragEnd} onDrag={handleDrag} id={index}>
                        <Rect key={index} top={isDragging ? dragTop : top} isDragging={isDragging}>
                            {index}
                        </Rect>
                    </Draggable>
                )})
        }
    </div>
}
const StyledDragDropContainerWithHooks = styled(DragDropContainerWithHooks)`
    width: 100vw;
    min-height: 100vw;
`;

const Rect = styled.div.attrs(props => ({
    style: {
        top: `${props.top}px`,
        transition: `${props.isDragging ? 'none' : 'all 500ms'}`
    },
}))`
  width: 300px;
  height: ${HEIGHT}px;
  user-select: none;
  text-align: center;
  background: #CCFFCC;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`//top:${({top}) => `${top}px`}; NOW DYNAMICALLY SET IN STYLE

// const Rect = styled.div`
//   width: 300px;
//   height: 100px;
//   text-align: center;
//   background: #33FFCC;
//   margin: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

export default StyledDragDropContainerWithHooks;
