import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';
import { filter, concatSeries } from 'async';

const default_filter = {
  report_num: [1],
  subject_num: [1],
  serie: ['farm'],
  serie_element: [0],
  serie2: ['farm'],
  serie2_element: [0],
  topic_abb: [],
  selectedYears: [2015, 2014],
  selectedStates: ['00'],
}

export default class Layout extends React.Component {
  state = {
    report_num: default_filter.report_num,
    subject_num: default_filter.subject_num,
    serie: default_filter.serie,
    serie_element: default_filter.serie_element,
    serie2: default_filter.serie2,
    serie2_element: default_filter.serie2_element,
    topic_abb: default_filter.topic_abb,
    selectedYears: default_filter.selectedYears,
    selectedStates: default_filter.selectedStates,
    selectedStateNames: ['All survey states'],
    isYearsMultiple: true,     
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: []
  }

  componentWillReceiveProps(props) {

    let {yearsInfo, statesInfo, topic_abb} = this.state

    if (props.years &&  yearsInfo.length === 0) {
      props.years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          if (year === 2014 || year === 2015) {
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

    const topicabb = []
    if (props.topics && topic_abb.length === 0) {
      props.topics[0].forEach(topic => {
        topicabb.push(topic.abb)
      })
    }

    this.setState({
      yearsInfo: yearsInfo,
      statesInfo: statesInfo,
      topic_abb: topicabb
    })    
  }

  onSelectArmsFilter = (report_num, topic_abb, subject_num, serie, blockIndex) => {
    this.setState({
      report_num: report_num,
      topic_abb: topic_abb,
      subject_num: subject_num,
      serie: serie,
      blockIndex: blockIndex
    })
  }


  onSleectSubFilter1 = (report_num, topic_abb, subject_num, serie, serie_element, blockIndex) => {
    this.setState({
      report_num: report_num,
      topic_abb: topic_abb,
      subject_num: subject_num,
      serie: serie, serie_element:
      serie_element,
      blockIndex: blockIndex
    })
  }

  onSelectFilter2 = (report_num, topic_abb, subject_num, serie, serie_element, serie2, blockIndex) => {
    this.setState({
      report_num: report_num,
      topic_abb: topic_abb,
      subject_num: subject_num,
      serie: serie,
      serie_element: serie_element,
      serie2: serie2,
      blockIndex: blockIndex
    })
  }

  onSelectSubFilter2 = (report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element, blockIndex) => {
    this.setState({
      report_num: report_num,
      topic_abb: topic_abb,
      subject_num: subject_num,
      serie: serie,
      serie_element: serie_element,
      serie2: serie2,
      serie2_element: serie2_element,
      blockIndex: blockIndex
    })
  }

  onSelectReportFilter = (report_num, topic_abb, subject_num, serie) => {
    this.setState({
      report_num: report_num,
      topic_abb: topic_abb,
      subject_num: subject_num,
      serie: serie,
      blockIndex: 0
    })
  }

  onSelectSubFilterBy = (filter_element) => {
    this.setState({
      serie_element: filter_element,
      blockIndex: 0
    })
  }
 
  onSelectCategory = (isReport) => {
    const report_num = default_filter.report_num
    const subject_num = default_filter.subject_num
    const serie = default_filter.serie
    const serie_element = default_filter.serie_element
    const topic_abb = [] 
    const serie2 = default_filter.serie2
    const serie2_element = default_filter.serie2_element
    let blockIndex = 0

    if (isReport) {
      this.props.topics[0].forEach(topic => {
        topic_abb.push(topic.abb)
      })     
      
    } else {
      topic_abb.push(this.props.topics[0][0].abb)
      blockIndex = 1      
    }

    this.setState({
      report_num: report_num,
      subject_num: subject_num,
      serie: serie,
      serie_element: serie_element,
      serie2: serie2,
      serie2_element: serie2_element,
      topic_abb: topic_abb,
      blockIndex: blockIndex
    })
  }

  onSelectYear = (index) => {
    let { yearsInfo, isYearsMultiple } = this.state
    yearsInfo[index].checked = !yearsInfo[index].checked
    if (!isYearsMultiple) {
      yearsInfo.forEach((yearN, i) => {
        if (i !== index) yearN.checked = false
      })
    }
    let selectedYears = []
    yearsInfo.forEach(yearN => {
      if (yearN.checked) {
        selectedYears.push(yearN.year)
      }
    })
    this.setState({ selectedYears, yearsInfo: yearsInfo.slice() })
  }

  onSelectState = (index) => {
    let { statesInfo, isYearsMultiple } = this.state
    let selectedStates = []
    let selectedStateNames = []
    statesInfo[index].checked = !statesInfo[index].checked
    if (isYearsMultiple) {
      statesInfo.forEach((stateN, i) => {
        if (i !== index) stateN.checked = false
      })
    }
    statesInfo.forEach(stateN => {
      if (stateN.checked) {
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      }
    })
    this.setState({ selectedStates, selectedStateNames, statesInfo: statesInfo.slice() })
  }
  onSwitchMultiple = () => {
    let { 
      isYearsMultiple,
      selectedYears,
      selectedStates,
      selectedStateNames,
      yearsInfo,
      statesInfo
    } = this.state

    if (isYearsMultiple === true) {
      selectedYears = selectedYears.slice(0, 1)
      yearsInfo.forEach(yearN => {
        if (yearN.year !== selectedYears[0]) {
          yearN.checked = false
        }
      })
    } else {
      selectedStates = selectedStates.slice(0, 1)
      selectedStateNames = selectedStateNames.slice(0, 1)
      statesInfo.forEach(stateN => {
        if (stateN.id !== selectedStates[0]) {
          stateN.checked = false
        }
      })
    }
    this.setState({ 
      isYearsMultiple: !isYearsMultiple,
      selectedYears: selectedYears.slice(),
      selectedStates: selectedStates.slice(),
      selectedStateNames: selectedStateNames.slice(),
      yearsInfo,
      statesInfo
    })
    
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
      selectedStateNames,
      blockIndex, 
      yearsInfo, 
      statesInfo,
      isYearsMultiple } = this.state
    return (
      <Grid>
        <Sidebar
          topics = {this.props.topics}
          reports = {this.props.reports}
          subjects = {this.props.subjects}
          series = {this.props.series}
          series2 = {this.props.series2}
          report_num = {report_num}
          subject_num = {subject_num}
          serie = {serie}
          serie_element={serie_element}
          serie2 = {serie2}       
          onSelectCategory={this.onSelectCategory}
          onSelectReportFilter={this.onSelectReportFilter}
          onSelectSubFilterBy={this.onSelectSubFilterBy}
          onSelectArmsFilter = {this.onSelectArmsFilter}
          onSleectSubFilter1={this.onSleectSubFilter1}
          onSelectFilter2={this.onSelectFilter2}          
          onSelectSubFilter2={this.onSelectSubFilter2}
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
            selectedStateNames = {selectedStateNames}
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

