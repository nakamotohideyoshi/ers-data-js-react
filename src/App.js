import React, { Component } from 'react';
import Layout from './containers/Layout';
import initial from './ApolloComponent/initialQuery'

class App extends Component {
  state = {
    reports: [],
    footnotes: []
  }
  
  componentWillReceiveProps(props) {
    let {reports, footnotes} = this.state
    if (props.initial.networkStatus ===7 && props.initial.initial) {
      reports = props.initial.initial.report
      footnotes = props.initial.footnotes    
    }
    this.setState({reports, footnotes})
  }
  render() {
    const {reports, footnotes} = this.state
      return (
        <Layout
         reports = {reports}
         footnotes = {footnotes}
        />
      );
  }
}

export default initial(App);
