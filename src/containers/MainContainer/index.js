import React from 'react';
import PropTypes from 'prop-types';
import SheetDataChart from '../../components/SheetDataChart';
import TableContainer from '../TableContainer';
import './style.css';
import charts from '../../ApolloComponent/chartsQuery'

class MainContainer extends React.Component {  
  state = {
    showList: {},    
    years: [],
    surveyData: []
  }

  componentWillReceiveProps(props) {

    let showList = {}
    if (props.charts.arms_surveydata) {
      props.charts.arms_surveydata.forEach(data => {
        showList[data.topic_abb] = 1
      })
    }
    this.setState({ showList })
    
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
    const { years, surveyData, showList } = this.state
    return (
      <div>
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
      </div>
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