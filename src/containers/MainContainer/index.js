import React from 'react';
import PropTypes from 'prop-types';
import SheetDataChart from '../../components/SheetDataChart';
import TableContainer from '../TableContainer';
import './style.css';
import charts from '../../ApolloComponent/chartsQuery'

class MainContainer extends React.Component {  
  state = {
    showList: {},    
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
    const { surveyData, showList } = this.state
    const { selectedYears, selectedStates, selectedStateNames, charts, isYearsMultiple } = this.props
    console.log('Survey Data Result', this.props)
    const categories = isYearsMultiple ? selectedYears:selectedStateNames

    return (
      <div>
        <SheetDataChart 
          categories={categories}
          surveyData={charts.arms_surveydata} 
          showList={showList}
        />
        <TableContainer 
          categories={categories}
          surveyData={charts.arms_surveydata}
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
  selectedYears: PropTypes.array,
  selectedStates: PropTypes.array,
  selectedStateNames: PropTypes.array,
  report_num: PropTypes.array,
  subject_num: PropTypes.array,
  serie: PropTypes.array,
  serie_element: PropTypes.array,
  serie2: PropTypes.array,
  serie2_element: PropTypes.array,
  topic_abb: PropTypes.array,
  blockIndex: PropTypes.number,
  isYearsMultiple: PropTypes.bool
};

export default charts(MainContainer)