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
    series2: [],
    topics: []

  }
  
  componentWillReceiveProps(props) {
    let {years, states, reports, subjects, series, series_element, series2, series2_element, topics} = this.state
    if (!props.initial.loading) {      
      years = props.initial.initial.year
      states = props.initial.initial.state
      reports = props.initial.initial.report
      subjects = props.initial.initial.subject
      series = props.initial.initial.serie
      series2 = props.initial.initial.serie2
      topics.push(props.initial.topic_1.topic)
      topics.push(props.initial.topic_2.topic)
      topics.push(props.initial.topic_3.topic)
      topics.push(props.initial.topic_4.topic)
      topics.push(props.initial.topic_5.topic)
      topics.push(props.initial.topic_6.topic)
      topics.push(props.initial.topic_7.topic)
      topics.push(props.initial.topic_8.topic)
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
