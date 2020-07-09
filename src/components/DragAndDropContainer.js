import React from 'react';
import DragItem from './DragItem';
import './drag.css';

const myList = [
    {
      id:'a',
      text: "testing..."
    },
    {
      id:'b',
      text: "twer"
    },
    {
      id:'c',
      text: "hamnet"
    },
    {
      id:'d',
      text: "hellowpsdaf"
    },
    {
      id:'e',
      text: "smaug"
    }
  ];
class DragAndDropContainer extends React.Component {
    // myList should be replaced by a state manager -- redux, context, flux, etc.
    constructor() {
        super();
        this.state = {
            dragging: null,
            list: myList
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
        eve.dataTransfer.dropEffect = 'move';
        eve.dataTransfer.setData('application/listId',id);
        eve.dataTransfer.setData('text/plain',id);
    }

    handleDragEnter (eve,id) {
        eve.preventDefault();
        // dragEnter event doesn't have permission to view dataTransfer.
        // Use state instead.
        // const initialID = eve.dataTransfer.getData('application/listId');
        this.setState((prev) => {
            if(prev.dragging === null) return {};
            const indInitial = prev.list.findIndex(e => e.id === prev.dragging);
            const indEnd = prev.list.findIndex(e => e.id === id);
            if (indInitial === indEnd) {
                return {};
            }
            else if (indInitial < indEnd) {
                return {
                    list: [].concat(prev.list.slice(0,indInitial), prev.list.slice(indInitial+1,indEnd+1),[prev.list[indInitial]],prev.list.slice(indEnd+1))
                } 
            }
            else {
                return {
                    list: [].concat(prev.list.slice(0,indEnd), prev.list.slice(indEnd+1,indInitial+1),[prev.list[indEnd]],prev.list.slice(indInitial+1))
                }
            }
        }); 
    }

    handleDragEnd (eve,id) {
        this.setState({
            dragging: null
        });
    }

    handleDrop (eve,endid) {
        //DO WE NEED THIS IF WE HANDLE EVERYTHING IN DRAGENTER?
        eve.preventDefault();
        // const initialID = eve.dataTransfer.getData('application/listId');
        // this.setState((prev) => {
        //     const indInitial = prev.list.findIndex(e => e.id === initialID);
        //     const indEnd = prev.list.findIndex(e => e.id === endid);
        //     if (indInitial === indEnd) {
        //         return {};
        //     }
        //     else if (indInitial < indEnd) {
        //         return {
        //             list: [].concat(prev.list.slice(0,indInitial), prev.list.slice(indInitial+1,indEnd+1),[prev.list[indInitial]],prev.list.slice(indEnd+1))
        //         } 
        //     }
        //     else {
        //         return {
        //             list: [].concat(prev.list.slice(0,indEnd), prev.list.slice(indEnd+1,indInitial+1),[prev.list[indEnd]],prev.list.slice(indInitial+1))
        //         }
        //     }
        // }); 
    }

    render() {
        const {list, dragging} = this.state;
        return (
            <ul className = "drag-list">
                {list.map((e) => (
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
