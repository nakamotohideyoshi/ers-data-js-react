import React, { Component } from 'react';
import Layout from './containers/Layout';
import initial from './ApolloComponent/initialQuery'

class App extends Component {
  state = {
    reports: []
  }
  
  componentWillReceiveProps(props) {
    let {reports} = this.state
    if (props.initial.networkStatus ===7 && props.initial.initial) {
      reports = props.initial.initial.report      
    }
    this.setState({reports})
  }
  render() {
    const {reports} = this.state
      return (
        <Layout
         reports = {reports}
        />
      );
  }
}

export default initial(App);
