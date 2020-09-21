import React from 'react';
import styled from 'styled-components';
import Draggable from './components/Draggable';
import DragDropContainerWithHooks from './components/DragDropContainerWithHooks';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          See Below Component.
        </p>
        <DragDropContainerWithHooks>
          <Rect />
        </DragDropContainerWithHooks>
      </header>
    </div>
  );
}

export default App;

const Rect = styled.div`
  width: 200px;
  height: 200px;
  background: #33FFCC;
`