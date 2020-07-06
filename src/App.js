import React from 'react';
import DragAndDropContainer from './components/DragAndDropContainer';

function App() {
  let children = [
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
      }
    ];

  return (
    <div className="App">
      <header className="App-header">
        <p>
          See Below Component.
        </p>
        <DragAndDropContainer children={children} />
      </header>
    </div>
  );
}

export default App;
