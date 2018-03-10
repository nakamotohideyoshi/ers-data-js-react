import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';
import { filter, concatSeries } from 'async';

export default class Layout extends React.Component {
  state = {
    report_num: [1],
    subject_num: [1],
    serie: ["farm"],
    serie_element: [0],
    serie2: ["farm"],
    serie2_element: [0],
    topic_abb: [],
    selectedYears: [2014, 2015],
    selectedStates: ['00'],
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: []
  }

  componentWillReceiveProps(props) {
    let {yearsInfo, statesInfo, topic_abb} = this.state
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
    const topics = []

    if (props.topics && topic_abb.length === 0) {
      props.topics[0].forEach(topic => {
        topics.push(topic.abb)
      })
    }

    this.setState({yearsInfo: yearsInfo, statesInfo: statesInfo, topic_abb: topics})    
  }



  onSelectArmsFilter = (report_num, topic_abb, subject_num, serie) => {
    this.setState({report_num: report_num, topic_abb: topic_abb, subject_num: subject_num, serie: serie})
  }

  onSleectSubFilter1 = (report_num, topic_abb, subject_num, serie, serie_element) => {
    this.setState({report_num: report_num, topic_abb: topic_abb, subject_num: subject_num, serie: serie, serie_element: serie_element})
  }
  onSelectFilter2 = (report_num, topic_abb, subject_num, serie, serie_element, serie2) => {
    this.setState({report_num: report_num, topic_abb: topic_abb, subject_num: subject_num, serie: serie, serie_element: serie_element, serie2: serie2})
  }
  onSelectSubFilter2 = (report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element) => {
    this.setState({report_num: report_num, topic_abb: topic_abb, subject_num: subject_num, serie: serie, serie_element: serie_element, serie2: serie2, serie2_element: serie2_element})
  }

  onSelectReportFilter = (report_num, topic_abb, subject_num, serie) => {
    this.setState({report_num: report_num, topic_abb: topic_abb, subject_num: subject_num, serie: serie})
  }

  onSelectSubFilterBy = (filter_element) => {
    this.setState({serie_element: filter_element})
  }
 
  onSelectCategory = (isReport) => {
    const report_num = [1]
    const subject_num = [1]
    const serie = ['farm']
    const serie_element = [0]
    const topic_abb = [] 
    const serie2 = ['farm']
    const serie2_element = [0]
    const selectedYears = [2014, 2015]
    const selectedStates = ['00']

    if (isReport) {      
      const blockIndex = 0
      this.props.topics[0].forEach(topic => {
        topic_abb.push(topic.abb)
      })     
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex, selectedStates, selectedYears})
    } else {
      topic_abb.push(this.props.topics[0][0].abb)
      const blockIndex = 1
      this.setState({report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, blockIndex, selectedStates, selectedYears})
    }
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

  render() {
    const {report_num, subject_num, serie, serie_element, serie2, serie2_element, topic_abb, selectedYears, selectedStates, blockIndex, yearsInfo, statesInfo } = this.state
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
          />        
          <Footnote />
        </Col>  
      </Grid>
    )
  }
}

