import React from 'react';
import PropTypes from 'prop-types';
import SheetDataChart from '../../components/SheetDataChart';
import TableContainer from '../TableContainer';
import './style.css';
import charts from '../../ApolloComponent/chartsQuery'
import dataSource1 from '../../ApolloComponent/dataSource1'
import dataSource2 from '../../ApolloComponent/dataSource2'
import dataSource3 from '../../ApolloComponent/dataSource3'
import dataSource4 from '../../ApolloComponent/dataSource4'
import dataSource5 from '../../ApolloComponent/dataSource5'
import dataSource6 from '../../ApolloComponent/dataSource6'
import dataSource7 from '../../ApolloComponent/dataSource7'
import dataSource8 from '../../ApolloComponent/dataSource8'
import { compose } from 'react-apollo'

import { YEAR_SELECTED } from '../../helpers/constants'
class MainContainer extends React.Component {  
  state = {
    showList: {},    
    years: [],
    surveyData: [],
    showData: []
  }

  componentWillMount() {
    let surveyData = []
    for (let i=0; i<9; i++) {
      surveyData.push([])
    }
    this.setState({surveyData})
  }

  componentWillReceiveProps(props) {
    console.log('...........', props)
    let {surveyData} = this.state
    let showData = []
    let showList = {}
    if (props.isRemoveDataSource) {

      surveyData.splice(props.blockIndex, 1)
      surveyData.push([])

      surveyData.forEach((survey, index) => {

        if (index !== 0) {
          survey.forEach(data => {
            showData.push(data)
          showList[data.report_num+data.topic_abb] = true
          })
        }
        
      })
      this.setState({ showList, surveyData, showData })

    } else {
      if (props.charts) {
        if(props.charts.networkStatus === 7) {

          if(props.charts.arms_surveydata) {

            props.charts.arms_surveydata.forEach(data => {
              if (data.topic_dim.level > 1) {
                showList[data.report_num+data.topic_abb] = false
              } else {
                showList[data.report_num+data.topic_abb] = true
              }
            })            
            surveyData[0] = props.charts.arms_surveydata            
          } else {            
            surveyData[0] = []            
          }          
        }
      }
      for (let i=1; i<9; i++) {
        const dataSource = 'dataSource' + i
        if (props[dataSource]) {
          if (props[dataSource].networkStatus === 7) {
            if (props[dataSource][dataSource]) {
              surveyData[i] = props[dataSource][dataSource]
            } else {
              surveyData[i] = []
            }
          }
        }
      }
      if(props.blockIndex === 0){
        showData = surveyData[0]
      } else {
        for (let i=1; i<surveyData.length; i++){
          surveyData[i].forEach(data =>{
            showData.push(data)
            showList[data.report_num+data.topic_abb] = true
          })
        }
      }
      this.setState({ showList, surveyData, showData })      
      
    }
    
  }

  hideItem(dataId) {
    const { showList } = this.state
    showList[dataId] = false
    this.setState({ showList: Object.assign({}, showList) })
  }
  showItem(dataId) {
    const { showList } = this.state
    showList[dataId] = true
    this.setState({ showList: Object.assign({}, showList) })
  }
  hideAllItem() {
    const { showList } = this.state
    for (let key in showList) 
      showList[key] = false
    this.setState({ showList: Object.assign({}, showList) })
  }
  showAllItem() {
    const { showList } = this.state
    for (let key in showList) 
      showList[key] = true
    this.setState({ showList: Object.assign({}, showList) })
  }

  render() {
    const { showList, showData } = this.state
    const { selectedYears, selectedStateNames, whichOneMultiple, blockIndex } = this.props
    console.log('Survey Data Result', this.props)
    const categories = whichOneMultiple === YEAR_SELECTED ? selectedYears.sort(function(a, b){return a-b}) : selectedStateNames

    return (
      <div>
        <SheetDataChart 
          categories={categories}
          surveyData={showData} 
          showList={showList}
          whichOneMultiple={whichOneMultiple}
          blockIndex={blockIndex}          
        />
        <TableContainer 
          categories={categories}
          surveyData={showData}
          showList={showList}
          whichOneMultiple={whichOneMultiple}
          blockIndex={blockIndex}
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
  whichOneMultiple: PropTypes.string
};

export default compose(
  charts,
  dataSource1,
  dataSource2,
  dataSource3,
  dataSource4,
  dataSource5,
  dataSource6,
  dataSource7,
  dataSource8,
)(MainContainer)