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
        this.setState({
            dragging: null
        });
    }

    handleDrop (eve,endid) {
        const children = this.props.children;
        eve.preventDefault();
        const initialID = eve.dataTransfer.getData('application/listId');
        console.log('drop',endid,initialID);
        // IF WE WANT TO RETURN EXACT ARRAY, DON'T BOTHER WITH MAP.
        const indInitial = children.findIndex(e => e.id === initialID);
        const indEnd = children.findIndex(e => e.id === endid);
        let newOrder;
        if (indInitial === indEnd) {
            return;
        }
        else if (indInitial < indEnd) {
            newOrder = [].concat(children.slice(0,indInitial), children.slice(indInitial+1,indEnd+1),[children[indInitial]],children.slice(indEnd+1));
        }
        else {
            newOrder = [].concat(children.slice(0,indEnd), children.slice(indEnd+1,indInitial+1),[children[indEnd]],children.slice(indInitial+1));
        }
        this.props.reorder(newOrder);
        //const order = this.props.children.map(e => e.id);
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
