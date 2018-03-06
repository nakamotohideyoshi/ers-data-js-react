import React, { Component } from 'react';
import Layout from './containers/Layout';
import initial from './ApolloComponent/initialQuery'

class App extends Component {
  state = {
    years: [],
    states: [],
    reports: [],
    subjects: [],
    series: []
  }
  
  componentWillReceiveProps(props) {
    let {years, states, reports, series, subjects} = this.state
    if (!props.initial.loading) {
      years = props.initial.arms_year
      states = props.initial.arms_state
      reports = props.initial.arms_report
      subjects = props.initial.arms_subject
      series = props.initial.arms_serie
    }
    this.setState({years, states, reports, subjects, series})
  }
  render() {
    const {years, states, reports, subjects, series} = this.state
      return (
        <Layout
         years = {years}
         states = {states}
         reports = {reports}
         subjects = {subjects}
         series = {series}
        />
      );
  }
}

export default initial(App);
