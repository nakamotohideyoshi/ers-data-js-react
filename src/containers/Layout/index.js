import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import { filter } from 'async';

export default class Layout extends React.Component {
  state = {
    report_num: [],
    subject_num: [],
    serie: [],
    serie_element: [],
    serie2: ["farm"],
    serie2_element: [0],
    topic_abb: [],
    selectedYears: [],
    selectedStates: [],
    blockIndex: -1
  }

  componentWillReceiveProps(props) {
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

  onSelectArmsFilter = (report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element) => {
    this.setState({report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element})
  }
 
  onSelectCategory = (isReport) => {
    const report_num = []
    const subject_num = []
    const serie = []
    const serie_element = []
    const topic_abb = [] 
    

    if (isReport) {      
      const blockIndex = 0
      const serie2 = ['farm']
      const serie2_element = [0]
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex})
    } else {
      const blockIndex = 1
      const serie2 = []
      const serie2_element = []
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

  onSelectTopic = (topics) => {
    const topic_abb = []
    topics.forEach(topic => {
      topic_abb.push(topic)
    })
    this.setState({topic_abb})
  }

  onSelectYear = (years) => {
    let selectedYears = []
    years.forEach(yearN => {
      selectedYears.push(yearN)
    });
    this.setState({ selectedYears })
  }

  onSelectState = (states) => {
    let selectedStates = []
    states.forEach(stateN => {
      selectedStates.push(stateN)
    })
    this.setState({ selectedStates })
  }

  render() {
    const {report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, selectedYears, selectedStates, blockIndex } = this.state
    return (
      <Grid>
        <Sidebar
          reports = {this.props.reports}
          subjects = {this.props.subjects}
          series = {this.props.series}
          series_element = {this.props.series_element}
          series2 = {this.props.series2}
          series2_element = {this.props.series2_element}
          topics = {this.props.topics}
          report_num = {report_num}
          subject_num = {subject_num}
          serie = {serie}
          serie2 = {serie2}       
          onSelectCategory={this.onSelectCategory}
          onSelectReport={this.onSelectReport}
          onSelectSubject={this.onSelectSubject}
          onSelectFilterBy={this.onSelectFilterBy}
          onSelectSubFilterBy={this.onSelectSubFilterBy}
          onSelectTopic={this.onSelectTopic}
          onSelectArmsFilter = {this.onSelectArmsFilter}
        />
        <MainContainer
          years={this.props.years}
          states={this.props.states}
          selectedStates = {selectedStates}
          selectedYears={selectedYears}
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

