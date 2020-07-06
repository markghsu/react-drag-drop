import React from 'react';

function DragItem(props) {
    return (
        <li 
        draggable = "true" 
        onDragStart = {props.dragStart}
        onDragEnd = {props.dragEnd}
        onDragEnter = {props.dragEnter}
        onDrop = {props.drop}
        onDragOver = {(event) => {
            event.preventDefault();
        }}
        >
            <div className="item" >{props.text}</div>
        </li>
    )
}

export default DragItem;