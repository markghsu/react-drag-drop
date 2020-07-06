import React from 'react';
import DragItem from './DragItem';
import './drag.css';

function DragAndDropContainer(props) {
    const {children} = props;
    function handleDragStart (eve,id) {
        console.log('dragstart',id);
        eve.dataTransfer.dropEffect = 'move';
        eve.dataTransfer.setData('application/listId',id);
        eve.dataTransfer.setData('text/plain',id);
    }
    function handleDragEnter (eve,id) {
        console.log('dragenter',id);
    }
    function handleDragEnd (eve,id) {
        //console.log('dragend',id);
    }
    function handleDrop (eve,id) {
        eve.preventDefault();
        console.log('drop',id);
    }
    return (
        <ul className="drag-list">
            {children.map((e) => (
            <DragItem 
                key={e.id}
                {...e}
                dragStart={(eve) => handleDragStart(eve,e.id)}
                dragEnter={(eve) => handleDragEnter(eve,e.id)}
                dragEnd={(eve) => handleDragEnd(eve,e.id)}
                drop={(eve) => handleDrop(eve,e.id)}
                />
            ))}
        </ul>
    );
};

export default DragAndDropContainer;
