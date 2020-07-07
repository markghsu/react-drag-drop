import React from 'react';
import DragAndDropContainer from './components/DragAndDropContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      children: [
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
      ]
    };
  }
  
  handleReorder = (neworder) => {
      this.setState(() => ({
        children: neworder
      }));
  }
  render() {
    const {children} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            See Below Component.
          </p>
          <DragAndDropContainer children={children} reorder={this.handleReorder} />
        </header>
      </div>
    );
  }
}

export default App;
