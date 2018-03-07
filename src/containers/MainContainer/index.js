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
    years: [],
    surveyData: []
  }
  componentWillMount() {
    let yearsInfo = []
    this.props.years.forEach(yearN => {
      const infoObj = {}
      infoObj.year = yearN
      infoObj.checked = false
      defaultYears.forEach((defaultYear) => {
        if (yearN === defaultYear) {
          infoObj.checked = true
        }
      })
      yearsInfo.push(infoObj)
    })
    this.setState({ yearsInfo })
  }
  componentWillReceiveProps(props) {
    if (props.charts.arms_surveydata) {
      let { yearsInfo } = this.state
      let showList = {}
      this.updateFields(yearsInfo, props.charts.arms_surveydata)
      props.charts.arms_surveydata.forEach(data => {
        showList[data.topic_abb] = 1
      })
      this.setState({ showList })
    }
  }
  onSelectYear = (index) => {
    let { yearsInfo } = this.state
    yearsInfo[index].checked = !yearsInfo[index].checked
    this.setState({ yearsInfo })
    this.updateFields(yearsInfo, this.props.charts.arms_surveydata)
  }
  updateFields = (yearsInfo, propData) => {
    let years = []
    let surveyData = []
    const originData = propData
    yearsInfo.forEach((yearN) => {
      if (yearN.checked === true) {
        years.push(yearN.year)
        originData.forEach((data) => {
          if (parseInt(data.year, 10) === parseInt(yearN.year, 10))
          {
            surveyData.push(data)
          }
        })
      }
    })
    this.setState({ years, surveyData })
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
    const { yearsInfo, years, surveyData, showList } = this.state

    return (
      <Col xs={12} md={9} sm={3}>
        <h4 className="main-heading">Farm Business Balance Sheet Data 
        </h4>
        <FilterDropdown 
          yearsInfo={yearsInfo} 
          onSelectYear={this.onSelectYear} 
        />
        <SheetDataChart 
          years={years}
          surveyData={surveyData} 
          showList={showList}
        />
        <TableContainer 
          years={years}
          surveyData={surveyData}
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