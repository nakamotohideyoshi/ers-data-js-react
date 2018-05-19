import React from 'react';
import PropTypes from 'prop-types';
import SheetDataChart from '../../components/SheetDataChart';
import TableContainer from '../TableContainer';
import './style.css';
import tailoredReport from '../../ApolloComponent/tailoredReport'
import tailoredReport1 from '../../ApolloComponent/tailoredReport1'
import armsData from '../../ApolloComponent/armsData'
import tailorfootnote from '../../ApolloComponent/tailorFootNote'
import armsdatafootnote from '../../ApolloComponent/armsdataFootNote'
import { compose } from 'react-apollo'

import { YEAR_SELECTED } from '../../helpers/constants'
class MainContainer extends React.Component {  
  state = {
    showList: {},    
    years: [],
    surveyData: [],
    showData: [],
    footnotes: [],
    isLoading: true    
  }

  componentWillMount() {
    let surveyData = []
    for (let i=0; i<9; i++) {
      surveyData.push([])
    }
    this.setState({surveyData})
  }

  componentWillReceiveProps(props) {
    let {surveyData, showList, isLoading} = this.state
    let showData = []

    if (props.isRemoveDataSource) {
      surveyData.splice(props.blockIndex, 1)
      surveyData.push([])

      const updateArmsData = this.updateArmsData(surveyData)
      showList = updateArmsData.showList
      showData = updateArmsData.showData
      isLoading = false
      
      this.setState({ showList, surveyData, showData, isLoading})

    } else {
      const tailoredReport = props.report_num_0[0] === 6 ? 'tailoredReport1' : 'tailoredReport'

      if (props[tailoredReport]) {
        if(props[tailoredReport].networkStatus === 7) {
          let isTailored = false
          isLoading = false
          if(props[tailoredReport][tailoredReport]) {
            // Tailored Report
            if (surveyData[0].length === 0) {
              showList = {}
              isTailored = true
            } else if (props.report_num_0[0] !== surveyData[0][0].report_num) {
              showList = {}
              isTailored = true
            }
            props[tailoredReport][tailoredReport].forEach(data => {
              if (isTailored) {
                if (data.topic_dim.level > 1) {
                  showList[0+data.topic_abb] = false
                } else {
                  showList[0+data.topic_abb] = true
                }
              }
            })            
            surveyData[0] = props[tailoredReport][tailoredReport]
          } else {            
            surveyData[0] = []
            showList = {}            
          }

          if (surveyData[0].length > 0) {
            let dataDetails = surveyData[0][0]
            showData = [{ 
              dataSource: 0, 
              data: surveyData[0],
              report: dataDetails.report_dim ? dataDetails.report_dim.header : '',
              subject: dataDetails.subject_dim ? dataDetails.subject_dim.header : '',
              serie: dataDetails.serie_dim ? dataDetails.serie_dim.header : '',
              serie_element: dataDetails.serie_element_dim ? dataDetails.serie_element_dim.name : ''
            }]
            
            surveyData[0].forEach((data, i) => {
              if (data.topic_dim.level > 1) {
                showList[0+data.topic_abb] = false
              } else {
                showList[0+data.topic_abb] = true
              }
            })
          }
          this.setState({ showList, surveyData, showData, isLoading })          
        } else {
          isLoading = true
          this.setState({ isLoading }) 
        }
      } else if (props.armsData) {
        if (props.armsData.networkStatus === 7) {
          isLoading = false
          for (let i=1; i<9; i++) {
            const dataSource = 'dataSource' + i            
            if (props.armsData[dataSource]) {
              surveyData[i] = props.armsData[dataSource]
            } else {
              surveyData[i] = []
            }
          }
          const updateArmsData = this.updateArmsData(surveyData)
          showList = updateArmsData.showList
          showData = updateArmsData.showData
          this.setState({ showList, surveyData, showData, isLoading })
        } else {
          isLoading = true
          this.setState({ isLoading })
        }
      }

      /*

      // Compose footnote
      let footnotes = []
      
      if (props.blockIndex === 0) {
        if (props.tailorfootnote) {
          if(props.tailorfootnote.networkStatus === 7 && props.tailorfootnote.tailorfootnote) {
            props.tailorfootnote.tailorfootnote.forEach(footnote => {
              const obj = {}
              obj.text = footnote.text
              obj.topic_abb = footnote.topic_abb  
              obj.sign = footnote.sign                  
              footnotes.push(obj)
            })
          }
        }
        // this.setState({footnotes})
      } else {
        if (props.armsdatafootnote.networkStatus === 7) {
          for (let i=1; i<9; i++) {
            const datasource = 'datasource'+i
            if (props.armsdatafootnote[datasource]) {
              props.armsdatafootnote[datasource].forEach(footnote => {
                const obj = {}
                obj.text = footnote.text
                obj.topic_abb = footnote.topic_abb  
                obj.sign = footnote.sign   
                footnotes.push(obj)
              })
            }
          }
          // this.setState({footnotes})
        }        
      }
      
      // ---------------------------------
      */
    }
    
  }

  updateArmsData(surveyData) {
    const showList = {}
    const showData = []
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

        if (survey.length > 0) {
          dataObj.report = survey[0].report_dim.header
          dataObj.subject = survey[0].subject_dim.header
          dataObj.serie = survey[0].serie_dim.header
          dataObj.serie_element = survey[0].serie_element_dim.name
          dataObj.serie2 = survey[0].serie2_dim.header
          dataObj.serie2_element = survey[0].serie2_element_dim.name
        } 
        survey.forEach((data, i) => {
          showList[index+data.topic_abb] = true
        })
        showData.push(dataObj)
      }          
    })
    return { showList, showData }
  }

  showLoadingbar() {
    document.getElementById('root').className = 'loading'
    document.body.style.overflow = 'hidden'
  }

  hideLoadingbar() {
    document.getElementById('root').className = ''
    document.body.style.overflow = 'unset'
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
    const { showList, showData, footnotes, isLoading } = this.state
    const { selectedYears, selectedStateNames, whichOneMultiple, blockIndex, fontSizeIndex, isGetSurveyData } = this.props
    const categories = whichOneMultiple === YEAR_SELECTED ? selectedYears.sort(function(a, b){return a-b}) : selectedStateNames
    if (isLoading) {
      this.showLoadingbar()
    } else {
      this.hideLoadingbar()
    }
    return (
      <div>
        <SheetDataChart 
          categories={categories}
          surveyData={showData} 
          showList={showList}
          whichOneMultiple={whichOneMultiple}
          blockIndex={blockIndex}
          fontSizeIndex={fontSizeIndex}              
          isGetSurveyData={isGetSurveyData}
          isLoading = {isLoading}     
        />
        <TableContainer 
          categories={categories}
          surveyData={showData}
          showList={showList}
          footnotes={footnotes}
          whichOneMultiple={whichOneMultiple}
          blockIndex={blockIndex}
          fontSizeIndex={fontSizeIndex}    
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
  tailoredReport,
  tailoredReport1,
  tailorfootnote,
  armsData,
  armsdatafootnote,
)(MainContainer)