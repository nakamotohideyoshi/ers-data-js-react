import React from 'react';
import { Col } from 'react-bootstrap';
import DownloadButton from '../../components/DownloadButton';
import FilterDropdown from '../../components/FilterDropdown';
import SheetDataChart from '../../components/SheetDataChart';
import TableContainer from '../TableContainer';
import Footnote from '../Footnote';
import './style.css';
import charts from '../../ApolloComponent/chartsQuery'

class MainContainer extends React.Component {
  state = {
    yearsInfo: [],
    statesInfo: [],
    checkedYears: [],
    checkedStates: []
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
    

    if(props.charts.arms_surveydata) {
      props.charts.arms_surveydata.forEach(surveyData => {
        yearsInfo.forEach((info, index) => {
          if (info.year === surveyData.year) {
            if (surveyData.topic_abb === "igcfi") {
              yearsInfo[index].grossCashIncome = surveyData.estimate
            } else if (surveyData.topic_abb === "etot") {
              yearsInfo[index].totalCashExpense = surveyData.estimate
            } else if (surveyData.topic_abb === "evtot") {
              yearsInfo[index].variableExpense = surveyData.estimate
            } else if (surveyData.topic_abb === "infi") {
              yearsInfo[index].netFarmIncome = surveyData.estimate
            }
            return true
          }
        })
      });     
    }

    this.setState({ yearsInfo, statesInfo })
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

  render() {
    // console.log('parameters', this.props)
    const { yearsInfo, statesInfo } = this.state
    if(!this.props.charts.loading) {
      console.log('loaded', this.props)
    }
    return (
      <Col xs={12} md={9} sm={3}>
        <h4 className="main-heading">Farm Business Balance Sheet Data 
          <DownloadButton />
        </h4>
        <FilterDropdown 
          yearsInfo={yearsInfo}
          statesInfo={statesInfo} 
          onSelectYear={this.onSelectYear}
          onSelectState={this.onSelectState} 
        />
        <SheetDataChart yearsInfo={yearsInfo} />
        <TableContainer />
        <Footnote />
      </Col>
    )
  }
  
}

export default charts(MainContainer)