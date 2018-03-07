import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import { filter } from 'async';


export default class Layout extends React.Component {
  state = {
    report_num: [1],
    subject_num: [1],
    serie: ['farm'],
    serie_element: [0],
    serie2: ["farm"],
    serie2_element: [0],
    topic_abb: [],
    year: [],
    stats: [],
    blockIndex: -1
  }

  componentWillReceiveProps(props) {
    console.log('------', props)
    let {topic_abb} = this.state
    if (props.topics) {
      props.topics.forEach(topic => {
        topic_abb.push(topic.abb)
      })
    }
    this.setState({topic_abb: topic_abb})    
  }
    
  onSelectFilter = (sidebarItemIndex, selectedIndex, blockIndex) => { 
  }
  
  onSelectCategory = (isReport) => {
    if (isReport) {
      const report_num = [1]
      const subject_num = [1]
      const serie = ['farm']
      const serie_element = [0]
      const serie2 = ['farm']
      const serie2_element = [0]
      const blockIndex = 0
      let topic_abb = []      
      this.props.topics.forEach(topic => {
        topic_abb.push(topic.abb)
      })
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex})
    } else {
      const report_num = [1]
      const subject_num = [1]
      const serie = ['farm']
      const serie_element = [0]
      const serie2 = ['farm']
      const serie2_element = [0]
      const topic_abb = ['kount']
      const blockIndex = 0
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex})
    }
  }

  onSelectReport = (report) => {
    let report_num = []
    report_num.push(report)
    this.setState({report_num})
  }

  onSelectSubject = (subject) => {
    let subject_num = []
    subject_num.push(subject)
    this.setState({subject_num})
  }

  onSelectFilterBy = (filter) => {
    let serie = []
    serie.push(filter)
    this.setState({serie})
  }

  onSelectSubFilterBy = (filter_element) => {
    let serie_element = []
    serie_element.push(filter_element)
    this.setState({serie_element})
  }

  onSelectYear = (years) => {
    let year = []
    years.forEach(yearN => {
      year.push(yearN)
    });
    this.setState({year: year})
  }

  onSelectState = (states) => {
    let stats = []
    states.forEach(stateN => {
      stats.push(stateN)
    })
    this.setState({stats: stats})
  }

  render() {
    const {report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, year, stats, blockIndex } = this.state
    return (
      <Grid>
        <Sidebar
          reports = {this.props.reports}
          subjects = {this.props.subjects}
          series = {this.props.series}
          report_num = {report_num}
          subject_num = {subject_num}
          serie = {serie}
          serie2 = {serie2}
          series_element = {this.props.series_element}
          onSelectCategory={this.onSelectCategory}
          onSelectReport={this.onSelectReport}
          onSelectSubject={this.onSelectSubject}
          onSelectFilterBy={this.onSelectFilterBy}
          onSelectSubFilterBy={this.onSelectSubFilterBy}
        />
        <MainContainer
          years={this.props.years}
          states={this.props.states}
          stats = {stats}
          year={year}
          report_num = {report_num}
          subject_num = {subject_num}
          serie = {serie}
          serie_element = {serie_element}
          serie2 = {serie2}
          serie2_element = {serie2_element}
          topic_abb = {topic_abb}
          blockIndex = {blockIndex}
          onSetYears = {this.onSelectYear}
          onSetStates = {this.onSelectState}         
        />
      </Grid>
    )
  }
}

