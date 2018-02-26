import React from 'react';
import { Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import DownloadButton from '../../components/DownloadButton';
import SheetDataChart from '../../components/SheetDataChart';
import FilterDropdown from '../../components/FilterDropdown';
import Footnote from '../Footnote';
import './style.css';

class MainContainer extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      yearsInfo: [],
    }
  }
  componentWillReceiveProps(props) { 
    let yearsInfo = []
    if (props.years) {
      props.years.forEach(yearN => {
        const infoObj = {}
          infoObj.year = yearN
          infoObj.checked = false
          yearsInfo.push(infoObj)
      })    
    }
   
    if(props.data.arms_surveydata) {
      props.data.arms_surveydata.forEach(surveyData => {
        yearsInfo.forEach((info, index) => {
          if (info.year == surveyData.year) {
            if (surveyData.topic_abb == "igcfi") {
              yearsInfo[index].grossCashIncome = surveyData.estimate
            } else if (surveyData.topic_abb == "etot") {
              yearsInfo[index].totalCashExpense = surveyData.estimate
            } else if (surveyData.topic_abb == "evtot") {
              yearsInfo[index].variableExpense = surveyData.estimate
            } else if (surveyData.topic_abb == "infi") {
              yearsInfo[index].netFarmIncome = surveyData.estimate
            }
            return true
          }
        })
      });
      this.setState({ yearsInfo })
    }
  }
  onSelectYear = (index) => {
    let { yearsInfo } = this.state
    yearsInfo[index].checked = !yearsInfo[index].checked
    this.setState({ yearsInfo })
  }
  render() {
    const { yearsInfo } = this.state
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
        <Footnote />
      </Col>
    )
  }
}
const years_list = gql`
  query Getquery($years: [Int]) {
    arms_surveydata(
      year: $years,
      subject_num: 1,
      series: "farm",
      series_element: 0,
      series2: "farm",
      series2_element: 0,
      report_num: [2],
      state_id: "00",
      topic_abb: ["igcfi", "etot", "evtot", "infi"]
    )
    {
      year
      rse
      estimate
      topic_abb
      topic_dim {
        level
        seq
        abb
        header
      }
      
    }
  }
`
const options = ({ years, }) => ({variables: { years, }, })

export default graphql(years_list, { options })(MainContainer);

