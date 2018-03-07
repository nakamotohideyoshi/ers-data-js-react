import React, { Component } from 'react';
import Layout from './containers/Layout';
import initial from './ApolloComponent/initialQuery'

class App extends Component {
  state = {
    years: [],
    states: [],
    reports: [],
    subjects: [],
    series: [],
    series_element: [],
    series2: [],
    series2_element: [],
    topics: []

  }
  
  componentWillReceiveProps(props) {
    let {years, states, reports, subjects, series, series_element, series2, series2_element, topics} = this.state
    if (!props.initial.loading) {
      years = props.initial.arms_filter.year
      states = props.initial.arms_filter.state
      reports = props.initial.arms_filter.report
      subjects = props.initial.arms_filter.subject
      series = props.initial.arms_filter.serie
      series2 = props.initial.arms_filter.serie2
      series_element = props.initial.arms_filter.serie_element
      series2_element = props.initial.arms_filter.serie2_element
      topics = props.initial.arms_filter.topic
    }
    this.setState({years, states, reports, subjects, series, series_element, series2, series2_element, topics})
  }
  render() {
    const {years, states, reports, subjects, series, series_element, series2, series2_element, topics} = this.state
      return (
        <Layout
         years = {years}
         states = {states}
         reports = {reports}
         subjects = {subjects}
         series = {series}
         series_element = {series_element}
         series2 = {series2}
         series2_element = {series2_element}
         topics = {topics}
        />
      );
  }
}

export default initial(App);
