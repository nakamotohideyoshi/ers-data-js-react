import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';

import { YEAR_SELECTED } from '../../helpers/constants'

// import { filter, concatSeries } from 'async';

const defaultYearCount = 5
const defaultStateCount = 1
const defaultSerie = 'farm'
const defaultSerie_element = 0
const dataSourceCounts = 8

export default class Layout extends React.Component {
  state = {
    selectedStateNames: [],
    whichOneMultiple: YEAR_SELECTED,     
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: [],
    selectedYears: [],
    selectedStates: [],
    filters: [],
    pre_filters:[],
    runQuery: '',
    priority: [],
    isRemoveDataSource: false,
    isAllDataSources: false,
    isGetSurveyData: false
  }

  componentWillMount() {
    let filters = []
    let pre_filters = []
    const isRemoveDataSource = false

    for (let i=0; i<dataSourceCounts+1; i++) {
      const obj = {}
      obj.report_num = []
      obj.subject_num = []
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
      const obj1 = {}
      obj1.report_num = []
      obj1.subject_num = []
      obj1.serie = []
      obj1.serie_element = []
      if (i === 0) {
        obj1.serie2 = [defaultSerie]
        obj1.serie2_element = [defaultSerie_element]
      } else {
        obj1.serie2 = []
        obj1.serie2_element = []
      }      
      obj1.topic_abb = []
      pre_filters.push(obj1)
    }
    
    const isGetSurveyData = false

    this.setState({filters, pre_filters, isRemoveDataSource, isGetSurveyData})
  }

  componentWillReceiveProps(props) {

    let {pre_filters, whichOneMultiple} = this.state

    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    let yearsInfo = []
    let selectedYears = []
    props.years.forEach(year => {
      const infoObj = {}
        infoObj.year = year
        if (props.years.indexOf(year) >= 0 && props.years.indexOf(year) < yearCount) {
          infoObj.checked = true
          selectedYears.push(year)
        } else {
          infoObj.checked = false
        }          
        yearsInfo.push(infoObj)
    })
    

    let statesInfo = []
    let selectedStates = []
    let selectedStateNames = []
   
    props.states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (props.states.indexOf(stateN) >= 0 && props.states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      } 
      statesInfo.push(obj)     
    })

    const isRemoveDataSource = false
    const isGetSurveyData = false


    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      pre_filters: pre_filters,
      isRemoveDataSource,
      isGetSurveyData
    })    
    
  }

  // initial LHS loading in `tailored report`
  // run query to refresh [serie, year, state]
  initialLoadingTailor = (topic_abb, subject_num, blockIndex) => {
    let {pre_filters} = this.state

    const isRemoveDataSource = false
    const isGetSurveyData = false

    pre_filters[blockIndex].topic_abb = topic_abb
    pre_filters[blockIndex].subject_num = subject_num
    pre_filters[blockIndex].serie = []
    pre_filters[blockIndex].serie_element = []

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      priority: [],
      blockIndex,
      runQuery: 'resetQuery'
    })
  }

  resetFilterByBlockIndex = (blockIndex) => {

    const isRemoveDataSource = false
    const isGetSurveyData = false

    let {pre_filters} = this.state
    let runQuery = ''

    if (blockIndex === 0) {
      pre_filters[blockIndex].serie = []
      pre_filters[blockIndex].serie_element = []
      runQuery = 'resetQuery'
    } else {
      pre_filters[blockIndex].serie = []
      pre_filters[blockIndex].serie_element = []
      pre_filters[blockIndex].serie2 = []
      pre_filters[blockIndex].serie2_element = []
      runQuery = 'dlfAnalysis'
    }

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex: blockIndex,
      priority: [],
      runQuery: runQuery
    })
  }  


  // reset [Filter By, Year, State]
  // run query to refresh [serie_element]
  resetSYRFilter = (serie, years, states, blockIndex) => {
    let {pre_filters, selectedYears, selectedStates, whichOneMultiple} = this.state

    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []
    
    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })


    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex: blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      statesInfo: statesInfo,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: 'tysQuery'
    })
  }

  // resest [ Filter By/Sub ]
  resetEFilter = (serie_element, blockIndex) => {
    let {pre_filters, filters} = this.state
    pre_filters[blockIndex].serie_element = serie_element
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      pre_filters,
      filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex: blockIndex,
      runQuery: ''
    })
  }

  // reset [ Filter By/Sub, Year, Region]
  resetEYRFilter = (serie_element, years, states, blockIndex) => {
    let {filters, pre_filters, selectedYears, selectedStates, whichOneMultiple} = this.state
    pre_filters[blockIndex].serie_element = serie_element

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      statesInfo: statesInfo,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })

  }

  // reset [ Year, Region ]
  resetYRFilter = (years, states, blockIndex) => {

    let {filters, pre_filters, selectedYears, selectedStates, whichOneMultiple} = this.state

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })
    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })


    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      selectedStates: reSelectedStates,
      statesInfo: statesInfo,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })

  }

  // reset [ Year ]
  resetYFilter = (years, blockIndex) => {

    let {filters, pre_filters, selectedYears, whichOneMultiple} = this.state

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      runQuery: ''
    })

  }

  // reset [ Region ]
  // set state
  resetRFilter = (states, blockIndex) => {

    let {filters, pre_filters, selectedStates, whichOneMultiple} = this.state
    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })
    
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      selectedStates: reSelectedStates,
      statesInfo: statesInfo,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })

  }

  // reset [ Filter By, Year ]
  // run query to refresh [ Filter By/Sub ]
  resetSYFilter = (serie, years, blockIndex) => {
    let {pre_filters, selectedYears, whichOneMultiple} = this.state
    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })

    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      runQuery: 'tysQuery'
    })
  }

  // reset [ Filter By ]
  // run query to refresh [ Filter By/Sub ]
  resetSFilter = (serie, blockIndex) => {
    let {pre_filters} = this.state
    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []

    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      runQuery: 'tysQuery'
    })
  }

  // reset [ Filter By/Sub, Year ]
  resetEYFilter = (serie_element, years, blockIndex) => {
    let {filters, pre_filters, selectedYears, whichOneMultiple} = this.state
    pre_filters[blockIndex].serie_element = serie_element

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      runQuery: ''
    })
  }

  // reset[ Filter, Region ]
  // run query to reset [ Filter By/Sub ]
  resetSRFilter = (serie, states, blockIndex) => {
    let {pre_filters, selectedStates, whichOneMultiple} = this.state
    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })
    
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      statesInfo: statesInfo,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: 'tysQuery'
    })
  }


  // reset [ Filter By/Sub, Region ]
  resetERFilter = (serie_element, states, blockIndex) => {
    let {filters, pre_filters, selectedStates, whichOneMultiple} = this.state
    pre_filters[blockIndex].serie_element = serie_element

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      statesInfo: statesInfo,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })
  }

  // report_num selected
  onSelectReportFilter = (report_num, blockIndex) => {
    let {pre_filters} = this.state
    pre_filters[blockIndex].report_num = report_num
    pre_filters[blockIndex].topic_abb = []
    pre_filters[blockIndex].subject_num = []
    pre_filters[blockIndex].serie = []
    pre_filters[blockIndex].serie_element = []

    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      runQuery: 'reset1Query'
    })
  }

  // subject_num selected
  onSelectSubjectFilter = (subject_num, blockIndex) => {
    let {pre_filters} = this.state
    pre_filters[blockIndex].subject_num = subject_num
    pre_filters[blockIndex].serie = []
    pre_filters[blockIndex].serie_element = []

    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      runQuery: 'resetQuery'
    })
  }

  // serie selected
  onSelectFilterByFilter = (serie, blockIndex) => {
    let {pre_filters, priority} = this.state
    let runQuery = ''
    const priorityIndex = priority.indexOf('serie')
    if (priority.length === 3) {
      priority.splice(priorityIndex, 1)
      priority.push('serie')
    }
    if (priorityIndex < 0) {
      priority.push('serie')
    }
    
    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []
    if (priority.indexOf('serie') === 0) {
      // Serie -> ... -> ...
      runQuery = 'sQuery'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('year') === 0) {
      // Year -> Serie -> ...
      runQuery = 'ysQuery'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('state') === 0) {
      // State -> Serie -> ...
      runQuery = 'tsQuery'
    } else if (priority.indexOf('serie') === 2){
      // ... -> ... -> Serie
      runQuery = 'tysQuery'
    }

    const isRemoveDataSource = false
    const isGetSurveyData = false
    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      priority: priority,
      runQuery: runQuery
    })
  }

  // serie_element selected
  onSelectSubFilterByFilter = (serie_element, blockIndex) => {
    let {filters, pre_filters, priority} = this.state
    let runQuery = ''

    const priorityIndex = priority.indexOf('serie')
    if (priority.length === 3) {
      priority.splice(priorityIndex, 1)
      priority.push('serie')
    }
    if (priorityIndex < 0) {
      priority.push('serie')
    }
    const isRemoveDataSource = false
    let isGetSurveyData = false

    pre_filters[blockIndex].serie_element = serie_element
    if (priority.indexOf('serie') === 0) {
      // Serie/Serie_element -> ... -> ...
      runQuery = 'seQuery'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('year') === 0) {
      // Year -> Serie/Serie_element -> ...
      runQuery = 'seyQuery'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('state') === 0) {
      // State -> Serie/Serie_element -> ...
      runQuery = 'setQuery'
    } else if (priority.indexOf('serie') === 2){
      // ... -> ... -> Serie/Serie_element
      runQuery = ''
      isGetSurveyData = true
    }

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      priority: priority,
      runQuery: runQuery
    })
  }

  // Year selected
  onSelectYear = (index) => {
    let { filters, pre_filters, yearsInfo, whichOneMultiple, priority, blockIndex } = this.state
    let runQuery = ''
    let isAllDataSources = false

    const priorityIndex = priority.indexOf('year')
    if (priority.length === 3) {
      priority.splice(priorityIndex, 1)
      priority.push('year')
    }
    if (priorityIndex < 0) {
      priority.push('year')
    }

    yearsInfo[index].checked = !yearsInfo[index].checked
    if (whichOneMultiple !== YEAR_SELECTED) {
      yearsInfo.forEach((yearN, i) => {
        if (i !== index) yearN.checked = false
      })
    }
    let selectedYears = []
    yearsInfo.forEach(yearN => {
      if (yearN.checked) {
        selectedYears.push(yearN.year)
      }
    })
    let isGetSurveyData = false

    if (blockIndex === 0) {

      if (priority.indexOf('year') === 0) {

        // Year -> ... -> ...
        runQuery = 'yQuery'
      } else if (priority.indexOf('year') === 1 &&  priority.indexOf('state') === 0) {
        // State -> Year -> ...
        runQuery = 'tyQuery'
      } else if (priority.indexOf('year') === 1 &&  priority.indexOf('serie') === 0) {
        // Serie -> Year -> ...
        runQuery = 'seyQuery'
      } else if (priority.indexOf('year') === 2){
        // ... -> ... -> Year
        runQuery = ''
        isGetSurveyData = true
      }
    } else {
      if (whichOneMultiple === YEAR_SELECTED) {
        runQuery = ''
        isGetSurveyData = true
        isAllDataSources = true
      } else {
        runQuery = 'dlfseseytAnalysis'
      }
    }

    const isRemoveDataSource = false

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      priority: priority,
      yearsInfo: yearsInfo.slice(),
      selectedYears: selectedYears,
      runQuery: runQuery,
      isAllDataSources
    })
  }

  // state selected
  onSelectState = (index) => {
    let { filters, pre_filters, statesInfo, whichOneMultiple, priority, blockIndex } = this.state
    let runQuery = ''
    let isAllDataSources = false

    const priorityIndex = priority.indexOf('state')
    if (priority.length === 3) {
      priority.splice(priorityIndex, 1)
      priority.push('state')
    }
    if (priorityIndex < 0) {
      priority.push('state')
    }

    let selectedStates = []
    let selectedStateNames = []
    statesInfo[index].checked = !statesInfo[index].checked
    if (whichOneMultiple === YEAR_SELECTED) {
      statesInfo.forEach((stateN, i) => {
        if (i !== index) stateN.checked = false
      })
    }
    statesInfo.forEach(stateN => {
      if (stateN.checked) {
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      }
    })

    let isGetSurveyData = false
    
    if (blockIndex === 0) {
      if (priority.indexOf('state') === 0) {
        // State -> ... -> ...
        runQuery = 'tQuery'
      } else if (priority.indexOf('state') === 1 &&  priority.indexOf('year') === 0) {
        // Year -> State -> ...
        runQuery = 'tyQuery'
      } else if (priority.indexOf('state') === 1 &&  priority.indexOf('serie') === 0) {
        // Serie -> State -> ...
        runQuery = 'setQuery'
      } else if (priority.indexOf('state') === 2) {
        // ... -> ... -> State
        runQuery = ''
        isGetSurveyData = true
      }
    } else {
      if (whichOneMultiple === YEAR_SELECTED) {
        runQuery = 'dlfsesetyAnalysis'
      } else {
        runQuery = ''
        isGetSurveyData = true
        isAllDataSources = true
      }
    }

    const isRemoveDataSource = false

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      selectedStateNames,
      priority: priority,
      statesInfo: statesInfo.slice(),
      selectedStates: selectedStates,
      runQuery: runQuery,
      isAllDataSources
    })
  }

  // Arms Data Analysis Category selected firstly
  selectAnalysisCategory = () => {
    let {pre_filters} = this.state
    const blockIndex = 1
    pre_filters[blockIndex].report_num = [1]
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      pre_filters,
      runQuery: 'initAnalysis',
      blockIndex
    })
  }

  // Datasource block inital loading
  initialBlockLoadAnalysis = (topic_abb, subject_num, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].topic_abb = topic_abb
    pre_filters[blockIndex].subject_num = subject_num
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: 'dlfAnalysis',
      blockIndex
    })
  }

  // selected DataSource `Arms Data Analysis`
  selectDataSource = (report_num, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].report_num = report_num

    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: 'dAnalysis',
      blockIndex
    })
  }

  // selected DataLine in `Arms Data Analysis`
  selectDataLineAnalysis = (topic_abb, blockIndex) => {
    let {filters, pre_filters} = this.state

    pre_filters[blockIndex].topic_abb = topic_abb
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: '',
      blockIndex
    })
  }

  // selected Farm Type in `Arms Data Analysis`
  selectFarmTypeAnalsysis = (subject_num, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].subject_num = subject_num
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: 'dlfAnalysis',
      blockIndex
    })
  }

  // selected Filter1 in `Arms Data Analysis`
  selecteFilter1Analysis = (serie, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie = serie
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: 'dlfsAnalysis',
      blockIndex
    })
  }

  // selected Filter1/Sub in `Arms Data Analysis`
  selectSubFilter1Analysis = (serie_element, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie_element = serie_element
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: 'dlfseAnalysis',
      blockIndex
    })
  }

  // selected Filter2 in `Arms Data Analysis`
  selectFilter2Analysis = (serie2, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie2 = serie2
    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: 'dlfsesAnalysis',
      blockIndex
    })
  }

  // selected Filterw2/Sub in `Arms Data Analysis`
  selectSubFilter2Analysis = (serie2_element, blockIndex) => {
    let {pre_filters, whichOneMultiple} = this.state

    pre_filters[blockIndex].serie2_element = serie2_element
    const isRemoveDataSource = false
    const isGetSurveyData = false

    const runQuery = whichOneMultiple === YEAR_SELECTED ? 'dlfsesetAnalysis' : 'dlfseseyAnalysis'


    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      pre_filters,
      runQuery: runQuery,
      blockIndex
    })
  }

  // reset year in `Arms Data Analysis`
  selectYearAnalysis = (years) => {
    let {selectedYears, whichOneMultiple} = this.state

    const runQuery = whichOneMultiple === YEAR_SELECTED ? '' : 'dlfseseytAnalysis'
    const isGetSurveyData =whichOneMultiple === YEAR_SELECTED ? true : false
    const isAllDataSources = whichOneMultiple === YEAR_SELECTED ? true : false

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? defaultYearCount : prevYearCount) : 1

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0

    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (prevYearCount === 0) {
        if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
        } else {
          infoObj.checked = false
        }
      } else {
        if (selectedYears.indexOf(year) > -1 && currentYearCount < yearCount) {
          infoObj.checked = true
          reSelectedYears.push(year)
          currentYearCount++
        } else {
          infoObj.checked = false
        }
      }        
      yearsInfo.push(infoObj)
    })

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      runQuery: runQuery,
      isAllDataSources
    })
  }

  // reset Region in `Arms Data Analysis`
  selectStateAnalysis = (states) => {
    let {selectedStates, whichOneMultiple} = this.state

    const runQuery = whichOneMultiple === YEAR_SELECTED ? 'dlfsesetyAnalysis' : ''
    const isGetSurveyData = whichOneMultiple === YEAR_SELECTED ? false : true
    const isAllDataSources = whichOneMultiple === YEAR_SELECTED ? false : true

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? defaultStateCount : (prevStateCount === 0 ? defaultStateCount : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (prevStateCount === 0) {
        if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
        } else {
          obj.checked = false 
        }
      } else {
        if (selectedStates.indexOf(stateN.id) > -1 && currentStateCount < stateCount) {
          obj.checked = true
          reSelectedStates.push(stateN.id)
          selectedStateNames.push(stateN.name)
          currentStateCount++
        } else {
          obj.checked = false
        }
      }   
      statesInfo.push(obj)     
    })

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      statesInfo: statesInfo,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: runQuery,
      isAllDataSources
    })
  }

  // Add Datasource
  addDataSource = (blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].report_num = [1]

    const runQuery = 'dAnalysis'

    const isRemoveDataSource = false
    const isGetSurveyData = false

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      runQuery
    })
  }

  // remove DataSource

  removeDataSource = (blockIndex) => {
    let {filters, pre_filters} = this.state

    for (let i=blockIndex; i<filters.length-2; i++) {
      filters[i] = filters[i+1]
      pre_filters[i] = pre_filters[i+1]
    }
    filters[filters.length-1].report_num = []
    filters[filters.length-1].subject_num = []
    filters[filters.length-1].serie = []
    filters[filters.length-1].serie_element = []
    filters[filters.length-1].serie2 = []
    filters[filters.length-1].serie2_element = []
    pre_filters[pre_filters.length-1].report_num = []
    pre_filters[pre_filters.length-1].subject_num = []
    pre_filters[pre_filters.length-1].serie = []
    pre_filters[pre_filters.length-1].serie_element = []
    pre_filters[pre_filters.length-1].serie2 = []
    pre_filters[pre_filters.length-1].serie2_element = []

    const isRemoveDataSource = true
    const isGetSurveyData = false

    this.setState({
      filters,
      pre_filters,
      blockIndex,
      isRemoveDataSource,
      isGetSurveyData,
      runQuery: ''
    })
  }
  
  onSwitchMultiple = () => {
    let {
      filters,
      pre_filters, 
      whichOneMultiple,
      selectedYears,
      selectedStates,
      selectedStateNames,
      yearsInfo,
      statesInfo,
      blockIndex
    } = this.state

    const yearsCount = selectedYears.length
    const statesCount = selectedStates.length

    if (whichOneMultiple === YEAR_SELECTED) {
      selectedYears = selectedYears.slice(-1)
      yearsInfo.forEach(yearN => {
        if (yearN.year !== selectedYears[0]) {
          yearN.checked = false
        }
      })
    } else {
      selectedStates = selectedStates.slice(0, 1)
      selectedStateNames = selectedStateNames.slice(0, 1)
      statesInfo.forEach(stateN => {
        if (stateN.id !== selectedStates[0]) {
          stateN.checked = false
        }
      })
    }
    let runQuery = ''
    let isGetSurveyData = true
    if (blockIndex !== 0 && yearsCount !== 1 && statesCount !== 1) {
      runQuery = 'ytDLAnalysis'
      isGetSurveyData = false
    }
    
    const isRemoveDataSource = false

    this.setState({
      filters,
      pre_filters, 
      whichOneMultiple: whichOneMultiple === YEAR_SELECTED ? 'NA':YEAR_SELECTED,
      selectedYears: selectedYears.slice(),
      selectedStates: selectedStates.slice(),
      selectedStateNames: selectedStateNames.slice(),
      yearsInfo,
      statesInfo,
      isSelectedAll: false,
      isRemoveDataSource,
      isGetSurveyData,
      runQuery
    })
  }

  onSelectAll = (whichOneMultiple) => {
    let { isSelectedAll, yearsInfo, statesInfo } = this.state
    isSelectedAll = !isSelectedAll
    if (whichOneMultiple === YEAR_SELECTED) {
      yearsInfo.forEach(yearN => {
        yearN.checked = isSelectedAll
      })
    } else {
      statesInfo.forEach(stateN => {
        stateN.checked = isSelectedAll
      })
    }

    let selectedYears = []
    let selectedStates = []
    let selectedStateNames = []
    yearsInfo.forEach(yearN => {
      if (yearN.checked) {
        selectedYears.push(yearN.year)
      }
    })
    statesInfo.forEach(stateN => {
      if (stateN.checked) {
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      }
    })

    if (selectedYears.length === 0) {
      const yearN = yearsInfo[0]
      yearN.checked = true
      selectedYears.push(yearN.year)
    }
    if (selectedStates.length === 0) {
      const stateN = statesInfo[0]
      stateN.checked = true
      selectedStates.push(stateN.id)
      selectedStateNames.push(stateN.name)
    }
    this.setState({ isSelectedAll, yearsInfo, statesInfo, selectedYears, selectedStates, selectedStateNames })
  }

  render() {
    // console.log('%%%%%%%%%%%%', this.state, '%%%%%%%%%%%')
    const {
      selectedStateNames,
      blockIndex, 
      yearsInfo,
      selectedYears,
      statesInfo,
      selectedStates,
      whichOneMultiple,
      isSelectedAll,
      filters,
      pre_filters,
      runQuery,
      isRemoveDataSource,
      isAllDataSources,
      isGetSurveyData
    } = this.state

    let serie = []
    let serie_element = []
    let serie2 = []
    let serie2_element = []

    for (let i=0; i<9; i++) {
      if (isGetSurveyData) {
        filters[i].report_num = pre_filters[i].report_num
        filters[i].subject_num = pre_filters[i].subject_num
        filters[i].topic_abb = pre_filters[i].topic_abb
        filters[i].serie = pre_filters[i].serie
        filters[i].serie_element = pre_filters[i].serie_element
        filters[i].serie2 = pre_filters[i].serie2
        filters[i].serie2_element = pre_filters[i].serie2_element
      }
      if (filters[i].serie_element.length > 1){
        serie_element.push([0])
        serie.push(['farm'])
      } else {
        serie.push(filters[blockIndex].serie)
        serie_element.push(filters[blockIndex].serie_element)
      }
      if (filters[i].serie2_element.length > 1){
        serie2_element.push([0])
        serie2.push(['farm'])
      } else {
        serie2.push(filters[i].serie2)
        serie2_element.push(filters[i].serie2_element)
      }
    }

    let arms_report_num = []
    let arms_subject_num = []
    let arms_serie = []
    let arms_serie_element = []
    let arms_serie2 = []
    let arms_serie2_element = []
    let arms_topic_abb = []

    for (let i=1; i<dataSourceCounts+1; i++) {
      arms_report_num = arms_report_num.concat(pre_filters[i].report_num)
      arms_subject_num = arms_subject_num.concat(pre_filters[i].subject_num)
      arms_serie = arms_serie.concat(pre_filters[i].serie)
      arms_serie_element = arms_serie_element.concat(pre_filters[i].serie_element)
      arms_serie2 = arms_serie2.concat(pre_filters[i].serie2)
      arms_serie2_element = arms_serie2_element.concat(pre_filters[i].serie2_element)
      arms_topic_abb = arms_topic_abb.concat(pre_filters[i].topic_abb)
    }
    let sortedYears = yearsInfo.sort(function(a, b){return parseInt(b.year, 10) - parseInt(a.year, 10)})
    return (
      <Grid>
        <Sidebar
          arms_report_num = {arms_report_num}
          arms_subject_num = {arms_subject_num}
          arms_topic_abb = {arms_topic_abb}
          arms_serie = {arms_serie}
          arms_serie_element = {arms_serie_element}
          arms_serie2 = {arms_serie2}
          arms_serie2_element = {arms_serie2_element}
          topics = {this.props.topics}
          reports = {this.props.reports}
          subjects = {this.props.subjects}
          report_num = {pre_filters[blockIndex].report_num}
          topic_abb = {pre_filters[blockIndex].topic_abb}
          subject_num = {pre_filters[blockIndex].subject_num}
          serie = {pre_filters[blockIndex].serie}
          serie_element={pre_filters[blockIndex].serie_element}
          serie2 = {pre_filters[blockIndex].serie2}
          serie2_element = {pre_filters[blockIndex].serie2_element}
          selectedStates = {selectedStates}
          selectedYears={selectedYears}
          runQuery={runQuery}
          resetFilterByBlockIndex = {this.resetFilterByBlockIndex}
          initialLoadingTailor  = {this.initialLoadingTailor }
          resetSYRFilter = {this.resetSYRFilter}
          resetEFilter = {this.resetEFilter}
          resetEYRFilter = {this.resetEYRFilter}
          resetYRFilter = {this.resetYRFilter}
          resetYFilter = {this.resetYFilter}
          resetRFilter = {this.resetRFilter}
          resetSYFilter = {this.resetSYFilter}
          resetSFilter = {this.resetSFilter}
          resetEYFilter = {this.resetEYFilter}
          resetSRFilter = {this.resetSRFilter}
          resetERFilter = {this.resetERFilter}
          onSelectReportFilter = {this.onSelectReportFilter}
          onSelectSubjectFilter = {this.onSelectSubjectFilter}
          onSelectFilterByFilter = {this.onSelectFilterByFilter}
          onSelectSubFilterByFilter = {this.onSelectSubFilterByFilter} 
          selectAnalysisCategory = {this.selectAnalysisCategory}
          initialBlockLoadAnalysis = {this.initialBlockLoadAnalysis}
          selectDataSource = {this.selectDataSource}
          selectDataLineAnalysis = {this.selectDataLineAnalysis}
          selectFarmTypeAnalsysis = {this.selectFarmTypeAnalsysis}
          selecteFilter1Analysis = {this.selecteFilter1Analysis}
          selectSubFilter1Analysis = {this.selectSubFilter1Analysis}
          selectFilter2Analysis =  {this.selectFilter2Analysis}
          selectSubFilter2Analysis = {this.selectSubFilter2Analysis}
          selectYearAnalysis = {this.selectYearAnalysis}
          selectStateAnalysis = {this.selectStateAnalysis}          
          addDataSource = {this.addDataSource}
          removeDataSource = {this.removeDataSource}
        />
        <Col xs={12} md={12} sm={12} lg={9}>
          <h4 className="main-heading">
            {blockIndex > 0 ? 'ARMS Data Analysis' : 'Tailored Reports'}
          </h4>
          <FilterDropdown 
            yearsInfo={sortedYears} 
            statesInfo={statesInfo} 
            whichOneMultiple={whichOneMultiple}    
            isSelectedAll={isSelectedAll}    
            onSelectAll={this.onSelectAll}  
            onSelectYear={this.onSelectYear} 
            onSelectState={this.onSelectState}
            onSwitchMultiple={this.onSwitchMultiple}
          />
          <MainContainer
            selectedStates = {selectedStates}
            selectedStateNames = {selectedStateNames}
            selectedYears={selectedYears}

            report_num_0 = {filters[0].report_num}
            subject_num_0 = {filters[0].subject_num}
            serie_0 = {serie[0]}
            serie_element_0 = {serie_element[0]}
            serie2_0 = {serie2[0]}
            serie2_element_0 = {serie2_element[0]}
            topic_abb_0 = {filters[blockIndex].topic_abb}
            
            report_num_1 = {filters[1].report_num}
            subject_num_1 = {filters[1].subject_num}
            serie_1 = {serie[1]}
            serie_element_1 = {serie_element[1]}
            serie2_1 = {serie2[1]}
            serie2_element_1 = {serie2_element[1]}
            topic_abb_1 = {filters[1].topic_abb}

            report_num_2 = {filters[2].report_num}
            subject_num_2 = {filters[2].subject_num}
            serie_2 = {serie[2]}
            serie_element_2 = {serie_element[2]}
            serie2_2 = {serie2[2]}
            serie2_element_2 = {serie2_element[2]}
            topic_abb_2 = {filters[2].topic_abb}

            report_num_3 = {filters[3].report_num}
            subject_num_3 = {filters[3].subject_num}
            serie_3 = {serie[3]}
            serie_element_3 = {serie_element[3]}
            serie2_3 = {serie2[3]}
            serie2_element_3 = {serie2_element[3]}
            topic_abb_3 = {filters[3].topic_abb}

            report_num_4 = {filters[4].report_num}
            subject_num_4 = {filters[4].subject_num}
            serie_4 = {serie[4]}
            serie_element_4 = {serie_element[4]}
            serie2_4 = {serie2[4]}
            serie2_element_4 = {serie2_element[4]}
            topic_abb_4 = {filters[4].topic_abb}

            report_num_5 = {filters[5].report_num}
            subject_num_5 = {filters[5].subject_num}
            serie_5 = {serie[5]}
            serie_element_5 = {serie_element[5]}
            serie2_5 = {serie2[5]}
            serie2_element_5 = {serie2_element[5]}
            topic_abb_5 = {filters[5].topic_abb}

            report_num_6 = {filters[6].report_num}
            subject_num_6 = {filters[6].subject_num}
            serie_6 = {serie[6]}
            serie_element_6 = {serie_element[6]}
            serie2_6 = {serie2[6]}
            serie2_element_6 = {serie2_element[6]}
            topic_abb_6 = {filters[6].topic_abb}

            report_num_7 = {filters[7].report_num}
            subject_num_7 = {filters[7].subject_num}
            serie_7 = {serie[7]}
            serie_element_7 = {serie_element[7]}
            serie2_7 = {serie2[7]}
            serie2_element_7 = {serie2_element[7]}
            topic_abb_7 = {filters[7].topic_abb}

            report_num_8 = {filters[8].report_num}
            subject_num_8 = {filters[8].subject_num}
            serie_8 = {serie[8]}
            serie_element_8 = {serie_element[8]}
            serie2_8 = {serie2[8]}
            serie2_element_8 = {serie2_element[8]}
            topic_abb_8 = {filters[8].topic_abb}

            blockIndex = {blockIndex}      
            whichOneMultiple={whichOneMultiple}
            isRemoveDataSource={isRemoveDataSource}
            isAllDataSources = {isAllDataSources} 
            isGetSurveyData = {isGetSurveyData}
            filters={filters}
            pre_filters={pre_filters}        
          />        
          <Footnote />
        </Col>  
      </Grid>
    )
  }
}

