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
    // console.log('...........', props)
    let {surveyData, showList} = this.state
    let showData = []
    if (props.isRemoveDataSource) {
      surveyData.splice(props.blockIndex, 1)
      surveyData.push([])

      showList = {}

      surveyData.forEach((survey, index) => {

        if (index !== 0) {
          let dataObj = {}
          dataObj.dataSource = index
          dataObj.data = survey
          dataObj.report = ''
          dataObj.subject = ''
          dataObj.serie = ''
          dataObj.serie_element = ''
          dataObj.serie2 = ''
          dataObj.serie2_element = ''
          survey.forEach((data, i) => {
            if (i===0) {
              dataObj.report = data.report_dim.header
              dataObj.subject = data.subject_dim.header
              dataObj.serie = data.serie_dim.header
              dataObj.serie_element = data.serie_element_dim.name
              dataObj.serie2 = data.serie2_dim.header
              dataObj.serie2_element = data.serie2_element_dim.name
            } 
            showList[index+data.topic_abb] = true
          })
          showData.push(dataObj)
        }
        
      })
      this.setState({ showList, surveyData, showData })

    } else {
      if (props.charts) {
        if(props.charts.networkStatus === 7) {

          let init = false
          if(props.charts.arms_surveydata) {
            // Tailored Report
            
            if (surveyData[0].length === 0) {
              showList = {}
              init = true
            } else if (props.report_num_0[0] !== surveyData[0][0].report_num) {
              showList = {}
              init = false
            }
            props.charts.arms_surveydata.forEach(data => {
              if (init) {
                if (data.topic_dim.level > 1) {
                  showList[0+data.topic_abb] = false
                } else {
                  showList[0+data.topic_abb] = true
                }
              }
            })            
            surveyData[0] = props.charts.arms_surveydata            
          } else {            
            surveyData[0] = []
            showList = {}            
          }          
        }
      }
      if (!props.isAllDataSources) {
        const dataSource = 'dataSource' + props.blockIndex
        if (props[dataSource]) {
          if (props[dataSource].networkStatus === 7) {
            if (props[dataSource][dataSource]) {
              surveyData[props.blockIndex] = props[dataSource][dataSource]
            } else {
              surveyData[props.blockIndex] = []
            }
          }
        }
      }
      
      
      if(props.blockIndex === 0){
        showData = [{ dataSource: 0, data: surveyData[0] }]
      } else {
        showList = {}
        surveyData.forEach((survey, index) => { 
          if (index !== 0) {
            let dataObj = {}
            dataObj.dataSource = index
            dataObj.data = survey
            dataObj.report = ''
            dataObj.subject = ''
            dataObj.serie = ''
            dataObj.serie_element = ''
            dataObj.serie2 = ''
            dataObj.serie2_element = ''
            survey.forEach((data, i) => {
              if (i===0) {
                dataObj.report = data.report_dim.header
                dataObj.subject = data.subject_dim.header
                dataObj.serie = data.serie_dim.header
                dataObj.serie_element = data.serie_element_dim.name
                dataObj.serie2 = data.serie2_dim.header
                dataObj.serie2_element = data.serie2_element_dim.name
              } 
              showList[index+data.topic_abb] = true
            })
            showData.push(dataObj)
          }          
        })
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
    console.log('test: ', showList)
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