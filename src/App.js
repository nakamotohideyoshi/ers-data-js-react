import React, { Component } from 'react';
import HeaderNavigation from './containers/navbar';
import JumbotronContainer from './containers/jumbotron';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderNavigation />
        <JumbotronContainer title="ARMS Farm Structure and Finance" />
      </div>
    );
  }
}

export default App;
