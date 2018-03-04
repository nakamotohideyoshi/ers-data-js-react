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
  
  componentWillMount() {    
    let yearsInfo = []
    this.props.years.forEach(yearN => {
      const infoObj = {}
        infoObj.year = yearN
        infoObj.checked = false
        yearsInfo.push(infoObj)
    })
    this.setState({ yearsInfo })
  }

  componentWillReceiveProps(props) {
    let yearsInfo = []
    this.props.years.forEach(yearN => {
      const infoObj = {}
        infoObj.year = yearN
        infoObj.checked = false
        yearsInfo.push(infoObj)
    })

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

    this.setState({ yearsInfo })
  }

  onSelectYear = (index) => {
    let { yearsInfo } = this.state
    yearsInfo[index].checked = !yearsInfo[index].checked
    this.setState({ yearsInfo })
  }

  render() {
    // console.log('parameters', this.props)
    const { yearsInfo} = this.state
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
          onSelectYear={this.onSelectYear} 
        />
        <SheetDataChart yearsInfo={yearsInfo} />
        <TableContainer />
        <Footnote />
      </Col>
    )
  }
  
}

export default charts(MainContainer)