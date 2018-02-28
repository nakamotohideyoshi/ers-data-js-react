import React, { Component } from 'react';
import Layout from './containers/Layout';
import initial from './ApolloComponent/initialQuery'

class App extends Component {
  render() {
    if (!this.props.initial.loading) {
      return (
        // <Layout
        //  years = {this.props.initial.arms_year}
        //  states = {this.props.initial.arms_state}
        //  reports = {this.props.initial.arms_report}
        //  series = {this.props.initial.arms_serie}
        //  subjects = {this.props.initial.arms_subject}
        // />
        <Layout
         years = {this.props.initial.arms_year}
        />
      );
    } else {
      return(
        <p>Loading...</p>
      )      
    }   
  }
}

export default initial(App);
