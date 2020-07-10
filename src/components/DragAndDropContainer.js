import React from 'react';
import { CSSTransition } from 'react-transition-group';
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
            const first = Math.min(indInitial,indEnd);
            const last = Math.max(indInitial,indEnd);
            if (indInitial === indEnd) {
                return {};
            }
            else {
                let newList = [].concat(
                    prev.list.slice(0,first),
                    prev.list.slice(first+1,last+1).map((e) => ({...e, transition: true})),
                    [{...prev.list[first], transition: true}],
                    prev.list.slice(last+1));
                return {
                    list: newList
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

    removeTransition(id) {
        this.setState((prev) => {
            const list = prev.list;
            list[list.findIndex(e => e.id === id)].transition = false;
            return {
                list
            }
        })
    }

    render() {
        const {list, dragging} = this.state;
        const listItems = list.map((e) => (
            <CSSTransition in={e.transition} onEntered={() => this.removeTransition(e.id)} key={e.id} timeout={200} classNames="example">
                <DragItem 
                    key = {e.id}
                    {...e}
                    dragStart = {(eve) => this.handleDragStart(eve,e.id)}
                    dragEnter = {(eve) => this.handleDragEnter(eve,e.id)}
                    dragEnd = {(eve) => this.handleDragEnd(eve,e.id)}
                    drop = {(eve) => this.handleDrop(eve,e.id)}
                    active = {dragging === e.id}
                />
            </CSSTransition>
            ));
        return (
            <ul className = "drag-list">
                    {listItems}
            </ul>
        );
    }
};

export default DragAndDropContainer;
