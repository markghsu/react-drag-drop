import React from 'react';
import DragItem from './DragItem';
import './drag.css';

class DragAndDropContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            dragging: null
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDragStart (eve,id) {
        this.setState({
            dragging: id
        });
        console.log('dragstart',id);
        eve.dataTransfer.dropEffect = 'move';
        eve.dataTransfer.setData('application/listId',id);
        eve.dataTransfer.setData('text/plain',id);
    }

    handleDragEnter (eve,id) {
        console.log('dragenter',id);
    }

    handleDragEnd (eve,id) {
        //console.log('dragend',id);
        this.setState({
            dragging: null
        });
    }

    handleDrop (eve,id) {
        eve.preventDefault();
        console.log('drop',id);
    }

    render() {
        const {children} = this.props;
        const {dragging} = this.state;
        return (
            <ul className = "drag-list">
                {children.map((e) => (
                <DragItem 
                    key = {e.id}
                    {...e}
                    dragStart = {(eve) => this.handleDragStart(eve,e.id)}
                    dragEnter = {(eve) => this.handleDragEnter(eve,e.id)}
                    dragEnd = {(eve) => this.handleDragEnd(eve,e.id)}
                    drop = {(eve) => this.handleDrop(eve,e.id)}
                    active = {dragging === e.id}
                    />
                ))}
            </ul>
        );
    }
};

export default DragAndDropContainer;
