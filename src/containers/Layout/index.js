import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';
import { filter } from 'async';

const defaultYears = [2014, 2015]

export default class Layout extends React.Component {
  state = {
    report_num: [1],
    subject_num: [1],
    serie: ["farm"],
    serie_element: [0],
    serie2: ["farm"],
    serie2_element: [0],
    topic_abb: [],
    selectedYears: defaultYears,
    selectedStates: ['00'],
    blockIndex: -1,
    yearsInfo: [],
    statesInfo: [],
    isYearsMultiple: true    
  }

  componentWillReceiveProps(props) {
    let {topic_abb, yearsInfo, statesInfo} = this.state
    if (props.topics) {
      props.topics.forEach(topic => {
        topic_abb.push(topic.abb)
      })
    }
    if (props.years &&  yearsInfo.length === 0) {
      props.years.forEach(yearN => {
        const infoObj = {}
          infoObj.year = yearN
          if (yearN === 2014 || yearN === 2015) {
            infoObj.checked = true
          } else {
            infoObj.checked = false
          }          
          yearsInfo.push(infoObj)
      })
    }

    if (props.states && statesInfo.length === 0) {
      props.states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        if (stateN.id === '00') {
          obj.checked = true
        } else {
          obj.checked = false
        }        
        statesInfo.push(obj)
      })
    }
    this.setState({topic_abb: topic_abb, yearsInfo: yearsInfo, statesInfo: statesInfo})    
  }


    
  onSelectFilter = (sidebarItemIndex, selectedIndex, blockIndex) => { 
  }

  onSelectArmsFilter = (report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element) => {
    this.setState({report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element})
  }
 
  onSelectCategory = (isReport) => {
    const report_num = [1]
    const subject_num = [1]
    const serie = ['farm']
    const serie_element = [0]
    const topic_abb = [] 
    const serie2 = ['farm']
    const serie2_element = [0]
    const selectedYears = defaultYears
    const selectedStates = ['00']

    if (isReport) {      
      const blockIndex = 0      
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex, selectedStates, selectedYears})
    } else {
      const blockIndex = 1
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex, selectedStates, selectedYears})
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

  onSelectYear = (index) => {
    let { yearsInfo } = this.state
    yearsInfo[index].checked = !yearsInfo[index].checked
    let selectedYears = []
    yearsInfo.forEach(yearN => {
      if (yearN.checked) {
        selectedYears.push(yearN.year)
      }
    })
    this.setState({ selectedYears })
  }

  onSelectState = (index) => {
    let { statesInfo } = this.state
    let selectedStates = []
    statesInfo[index].checked = !statesInfo[index].checked
    statesInfo.forEach(stateN => {
      if (stateN.checked) {
        selectedStates.push(stateN.id)
      }
    })
    this.setState({ selectedStates })
  }
  onSwitchMultiple = () => {
    let { isYearsMultiple } = this.state
    this.setState({ isYearsMultiple: !isYearsMultiple })
  }
  render() {
    const {
      report_num, 
      subject_num, 
      serie, 
      serie_element, 
      serie2, 
      serie2_element, 
      topic_abb, 
      selectedYears, 
      selectedStates, 
      blockIndex, 
      yearsInfo, 
      statesInfo,
      isYearsMultiple } = this.state
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
        <Col xs={12} md={9} sm={12}>
          <h4 className="main-heading">Farm Business Balance Sheet Data 
          </h4>
          <FilterDropdown 
            yearsInfo={yearsInfo} 
            statesInfo={statesInfo} 
            onSelectYear={this.onSelectYear} 
            onSelectState={this.onSelectState}
            onSwitchMultiple={this.onSwitchMultiple}
            isYearsMultiple={isYearsMultiple}          
          />
          <MainContainer
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
            isYearsMultiple={isYearsMultiple}          
          />        
          <Footnote />
        </Col>  
      </Grid>
    )
  }
}

