import React from 'react';
import ReactLoading from 'react-loading';
import { Grid, Col } from 'react-bootstrap';
import MainContainer from '../MainContainer';
import Footnote from '../Footnote';
import FilterContainer from '../FilterContainer'
import { YEAR_SELECTED } from '../../helpers/constants'

import './style.css'

const defaultSerie = 'farm'
const defaultSerie_element = 0
const dataSourceCounts = 8

export default class Layout extends React.Component {

  state = {
    selectedStateNames: [],   
    blockIndex: 0,
    selectedYears: [],
    selectedStates: [],
    filters: [],
    isRemoveDataSource: false,
    isAllDataSources: false,
    isGetSurveyData: false,
    fontSizeIndex: 0,
    whichOneMultiple: YEAR_SELECTED,
  }

  componentWillMount() {
    let filters = this.initFilterState()
    this.setState({
      filters
    })
  }

  initFilterState() {
    let filters = []
    for (let i=0; i<=dataSourceCounts; i++) {
      const obj = {}
      obj.report_num = []
      obj.subject_num = []
      obj.sub_report = []
      obj.serie = []
      obj.serie_element = []
      if (i === 0) {
        obj.serie2 = [defaultSerie]
        obj.serie2_element = [defaultSerie_element]
      } else {
        obj.serie2 = []
        obj.serie2_element = []
      }      
      obj.topic_abb = []
      filters.push(obj)
    }
    return filters
  }

  switchFontSize = (fontSizeIndex) => {
    this.setState({fontSizeIndex})
  }

  getSurveyData = (
    runQuery,
    pre_filters,
    selectedYears,
    selectedStates,
    selectedStateNames, 
    isRemoveDataSource,
    blockIndex,
    whichOneMultiple
  ) => {
    if (runQuery.length === 0) {
      
      let filters = this.initFilterState()

      for (let i=0; i<=dataSourceCounts; i++) {      
        filters[i].report_num = pre_filters[i].report_num
        filters[i].sub_report = pre_filters[i].sub_report
        filters[i].subject_num = pre_filters[i].subject_num
        filters[i].topic_abb = pre_filters[i].topic_abb
        
        if (pre_filters[i].serie_element.length > 1){
          filters[i].serie = ['farm']
          filters[i].serie_element = [0]        
        } else {
          filters[i].serie = pre_filters[i].serie
          filters[i].serie_element = pre_filters[i].serie_element
        }
        if (pre_filters[i].serie2_element.length > 1){
          filters[i].serie2 = ['farm']
          filters[i].serie2_element = [0]
        } else {
          filters[i].serie2 = pre_filters[i].serie2
          filters[i].serie2_element = pre_filters[i].serie2_element
        }
      }
      this.setState({
        filters,
        selectedYears,
        selectedStates,
        selectedStateNames,   
        blockIndex,
        isRemoveDataSource,
        whichOneMultiple
      })
    }
  } 

  render() {
    
    const {
      selectedStateNames,
      blockIndex, 
      selectedYears,
      selectedStates,
      filters,
      isRemoveDataSource,
      fontSizeIndex,
      whichOneMultiple
    } = this.state
    return (             
      <Grid>        
        <div
          className='loading-bar'
        >
          <ReactLoading
            type='bars'
            color='#95ceff'
          />
        </div>
        <FilterContainer
          reports = {this.props.reports}
          getSurveyData = {this.getSurveyData}
          switchFontSize = {this.switchFontSize}
        />      
        
        <Col xs={12} md={12} sm={12} lg={9} className="main">
          <MainContainer
            selectedStates = {selectedStates}
            selectedStateNames = {selectedStateNames}
            selectedYears={selectedYears}

            report_num_0 = {filters[0].report_num}
            sub_report_0 = {filters[0].sub_report}
            subject_num_0 = {filters[0].subject_num}
            serie_0 = {filters[0].serie}
            serie_element_0 = {filters[0].serie_element}
            serie2_0 = {filters[0].serie2}
            serie2_element_0 = {filters[0].serie2_element}
            topic_abb_0 = {filters[0].topic_abb}
            
            report_num_1 = {filters[1].report_num}
            subject_num_1 = {filters[1].subject_num}
            serie_1 = {filters[1].serie}
            serie_element_1 = {filters[1].serie_element}
            serie2_1 = {filters[1].serie2}
            serie2_element_1 = {filters[1].serie2_element}
            topic_abb_1 = {filters[1].topic_abb}

            report_num_2 = {filters[2].report_num}
            subject_num_2 = {filters[2].subject_num}
            serie_2 = {filters[2].serie}
            serie_element_2 = {filters[2].serie_element}
            serie2_2 = {filters[2].serie2}
            serie2_element_2 = {filters[2].serie2_element}
            topic_abb_2 = {filters[2].topic_abb}

            report_num_3 = {filters[3].report_num}
            subject_num_3 = {filters[3].subject_num}
            serie_3 = {filters[3].serie}
            serie_element_3 = {filters[3].serie_element}
            serie2_3 = {filters[3].serie2}
            serie2_element_3 = {filters[3].serie2_element}
            topic_abb_3 = {filters[3].topic_abb}

            report_num_4 = {filters[4].report_num}
            subject_num_4 = {filters[4].subject_num}
            serie_4 = {filters[4].serie}
            serie_element_4 = {filters[4].serie_element}
            serie2_4 = {filters[4].serie2}
            serie2_element_4 = {filters[4].serie2_element}
            topic_abb_4 = {filters[4].topic_abb}

            report_num_5 = {filters[5].report_num}
            subject_num_5 = {filters[5].subject_num}
            serie_5 = {filters[5].serie}
            serie_element_5 = {filters[5].serie_element}
            serie2_5 = {filters[5].serie2}
            serie2_element_5 = {filters[5].serie2_element}
            topic_abb_5 = {filters[5].topic_abb}

            report_num_6 = {filters[6].report_num}
            subject_num_6 = {filters[6].subject_num}
            serie_6 = {filters[6].serie}
            serie_element_6 = {filters[6].serie_element}
            serie2_6 = {filters[6].serie2}
            serie2_element_6 = {filters[6].serie2_element}
            topic_abb_6 = {filters[6].topic_abb}

            report_num_7 = {filters[7].report_num}
            subject_num_7 = {filters[7].subject_num}
            serie_7 = {filters[7].serie}
            serie_element_7 = {filters[7].serie_element}
            serie2_7 = {filters[7].serie2}
            serie2_element_7 = {filters[7].serie2_element}
            topic_abb_7 = {filters[7].topic_abb}

            report_num_8 = {filters[8].report_num}
            subject_num_8 = {filters[8].subject_num}
            serie_8 = {filters[8].serie}
            serie_element_8 = {filters[8].serie_element}
            serie2_8 = {filters[8].serie2}
            serie2_element_8 = {filters[8].serie2_element}
            topic_abb_8 = {filters[8].topic_abb}

            blockIndex = {blockIndex}      
            whichOneMultiple={whichOneMultiple}
            isRemoveDataSource={isRemoveDataSource}
            filters={filters}   
            
            fontSizeIndex={fontSizeIndex}  
          />        
          <Footnote
            blockIndex = {blockIndex}

            report_num_0 = {filters[0].report_num}
            topic_abb_0 = {filters[0].topic_abb}
            
            report_num_1 = {filters[1].report_num}
            topic_abb_1 = {filters[1].topic_abb}

            report_num_2 = {filters[2].report_num}
            topic_abb_2 = {filters[2].topic_abb}

            report_num_3 = {filters[3].report_num}
            topic_abb_3 = {filters[3].topic_abb}

            report_num_4 = {filters[4].report_num}
            topic_abb_4 = {filters[4].topic_abb}

            report_num_5 = {filters[5].report_num}
            topic_abb_5 = {filters[5].topic_abb}

            report_num_6 = {filters[6].report_num}
            topic_abb_6 = {filters[6].topic_abb}

            report_num_7 = {filters[7].report_num}
            topic_abb_7 = {filters[7].topic_abb}

            report_num_8 = {filters[8].report_num}
            topic_abb_8 = {filters[8].topic_abb}

            fontSizeIndex={fontSizeIndex}  
          />
        </Col>  
      </Grid>
    )
  }
}

