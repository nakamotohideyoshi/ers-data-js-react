import React, { Component } from 'react';
import JumbotronContainer from './containers/jumbotron';

class App extends Component {
  render() {
    return (
      <div className="App">
        <JumbotronContainer title="ARMS Farm Structure and Finance" />
      </div>
    );
  }
}

export default App;
