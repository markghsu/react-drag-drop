import React from 'react';

function DragItem(props) {
    return (
        <li 
        draggable = "true" 
        onDragStart = {(e) => {props.dragStart(e)}}
        onDragEnd = {props.dragEnd}
        onDragEnter = {props.dragEnter}
        onDrop = {props.drop}
        onDragOver = {(event) => {
            event.preventDefault();
        }}
        className={`${props.active?'active':''}`}
        >
            {props.text}
        </li>
    )
}

export default DragItem;