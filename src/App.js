import React, { Component } from 'react';
import Layout from './containers/Layout';
import initial from './ApolloComponent/initialQuery'

class App extends Component {
  render() {
    if(this.props.initial.arms_year) {
      return (
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
