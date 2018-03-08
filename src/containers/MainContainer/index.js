import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import FilterDropdown from '../../components/FilterDropdown';
import SheetDataChart from '../../components/SheetDataChart';
import TableContainer from '../TableContainer';
import Footnote from '../Footnote';
import './style.css';
import charts from '../../ApolloComponent/chartsQuery'

const defaultYears = [2014, 2015]

class MainContainer extends React.Component {  
  state = {
    showList: {},
    yearsInfo: [],
    statesInfo: [],
    years: [],
    surveyData: []
  }

  componentWillReceiveProps(props) {
    let {yearsInfo, statesInfo} = this.state
    if (yearsInfo.length === 0) {
      props.years.forEach(yearN => {
        const infoObj = {}
          infoObj.year = yearN
          infoObj.checked = false
          yearsInfo.push(infoObj)
      })
    }
    
    if (statesInfo.length === 0) {
      props.states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false
        statesInfo.push(obj)
      })
    }

    let showList = {}
    if (props.charts.arms_surveydata) {
      props.charts.arms_surveydata.forEach(data => {
        showList[data.topic_abb] = 1
      })
    }
    this.setState({ yearsInfo, statesInfo, showList })
    
  }
  onSelectYear = (index) => {
    let { yearsInfo } = this.state
    let years = []
    yearsInfo[index].checked = !yearsInfo[index].checked
    yearsInfo.forEach(yearN => {
      if (yearN.checked) {
        years.push(yearN.year)
      }
    })
    this.props.onSetYears(years)
  }
  onSelectState = (index) => {
    let { statesInfo } = this.state
    let states = []
    statesInfo[index].checked = !statesInfo[index].checked
    statesInfo.forEach(stateN => {
      if (stateN.checked) {
        states.push(stateN.id)
      }
    })
    this.props.onSetStates(states)
  }
  hideItem(dataId) {
    const { showList } = this.state
    showList[dataId] = 0
    this.setState({ showList: Object.assign({}, showList) })
  }
  showItem(dataId) {
    const { showList } = this.state
    showList[dataId] = 1
    this.setState({ showList: Object.assign({}, showList) })
  }
  hideAllItem() {
    const { showList } = this.state
    for (let key in showList) 
      showList[key] = 0
    this.setState({ showList: Object.assign({}, showList) })
  }
  showAllItem() {
    const { showList } = this.state
    for (let key in showList) 
      showList[key] = 1
    this.setState({ showList: Object.assign({}, showList) })
  }

  render() {

    console.log('updated', this.props.charts)
    const { yearsInfo, statesInfo, years, surveyData, showList } = this.state
    return (
      <Col xs={12} md={9} sm={12}>
        <h4 className="main-heading">Farm Business Balance Sheet Data 
        </h4>
        <FilterDropdown 
          yearsInfo={yearsInfo} 
          statesInfo={statesInfo} 
          onSelectYear={this.onSelectYear} 
          onSelectState={this.onSelectState}           
        />
        <SheetDataChart 
          years={this.props.selectedYears}
          surveyData={this.props.charts.arms_surveydata} 
          showList={showList}
        />
        <TableContainer 
          years={this.props.selectedYears}
          surveyData={this.props.charts.arms_surveydata}
          showList={showList}
          hideItem={(dataId) => this.hideItem(dataId)}
          showItem={(dataId) => this.showItem(dataId)}
          showAllItem={() => this.showAllItem()}
          hideAllItem={() => this.hideAllItem()}
        />
        <Footnote />
      </Col>
    )
  }
  
}

MainContainer.propTypes = {
  years: PropTypes.array,
  series: PropTypes.string,
  report_num: PropTypes.number,
  subject_num: PropTypes.number,
  series_element: PropTypes.number
};

MainContainer.defaultProps = {
  years: [],
  series: "farm",
  report_num: 1,
  subject_num: 1,
  series_element: 0
};

export default charts(MainContainer)