import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import FilterDropdown from '../../components/FilterDropdown';
import OptionGroup from '../../components/OptionGroup'

import { YEAR_SELECTED } from '../../helpers/constants'

// import './style.css'

const defaultYearCount = 5
const defaultStateCount = 1
const defaultSerie = 'farm'
const defaultSerie_element = 0
const dataSourceCounts = 8

const fontSizeArray = [
  { label: 'A', type: 'a1', size: '1em'},
  { label: 'A', type: 'a2', size: '1.5em'},
  { label: 'A', type: 'a2', size: '2em'},
]

export default class FilterContainer extends React.Component {
  state = {
    selectedStateNames: [],
    whichOneMultiple: YEAR_SELECTED,     
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: [],
    selectedYears: [],
    temp_Years: [],
    temp_States: [],
    selectedStates: [],
    filters: [],
    pre_filters:[],
    runQuery: '',
    priority: [],
    isRemoveDataSource: false,
    isAllDataSources: false,
    isGetSurveyData: false,
    isReset: false,
    fontSizeIndex: 0
  }
  
  componentWillMount() {
    // filters, and pre_filters state intialize
    let filters = this.initFilterState()
    let pre_filters = this.initFilterState()
    
    this.setState({
      filters,
      pre_filters
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

  componentWillReceiveProps(props) {
    let {runQuery, isReset, pre_filters} = this.state
    
    if (props.reports.length !== 0) {
      runQuery = 'initialize'
      isReset = true
      pre_filters[0].report_num = [1]
    }

    this.setState({
      pre_filters,      
      runQuery,
      isReset
    })    
  }

  // Repot category

  onSelectReportCategory = () => {
    const blockIndex = 0
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    let pre_filters = this.initFilterState()
    let runQuery = 'initialize'

    pre_filters[blockIndex].report_num = [1]

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      blockIndex,
      priority: [],
      runQuery,
      isReset: true
    })
  }

  // Arms Data Analysis Category selected firstly
  selectAnalysisCategory = () => {
    let pre_filters = this.initFilterState()
    const blockIndex = 1
    pre_filters[blockIndex].report_num = [1]
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery: 'dAnalysis',
      blockIndex
    })
  }

  // Reset LHS Filter
  resetFilterByBlockIndex = (blockIndex) => {
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    let {pre_filters} = this.state
    let runQuery = ''

    pre_filters[blockIndex].subject_num = []
    pre_filters[blockIndex].topic_abb = []
    pre_filters[blockIndex].serie = []
    pre_filters[blockIndex].serie_element = []

    if (blockIndex === 0) {      
      runQuery = 'dTailored'
    } else {
      pre_filters[blockIndex].serie2 = []
      pre_filters[blockIndex].serie2_element = []
      runQuery = 'dAnalysis'
    }

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      blockIndex: blockIndex,
      priority: [],
      runQuery: runQuery,
      isReset: true
    })
  }  


  initialLoadingTailor = (topic_abb, sub_report, blockIndex) => {
    let {pre_filters} = this.state

    const isRemoveDataSource = false
    const isGetSurveyData = false

    pre_filters[blockIndex].sub_report = sub_report
    pre_filters[blockIndex].topic_abb = topic_abb
    pre_filters[blockIndex].subject_num = []
    pre_filters[blockIndex].serie = []
    pre_filters[blockIndex].serie_element = []

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrTailored' : 'dlTailored'

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      priority: [],
      blockIndex,
      runQuery
    })
  }

  // Reset Year List
  resetYears(years) {
    let {temp_Years, selectedYears, whichOneMultiple, isReset} = this.state

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    let yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? (temp_Years.length===0 ? defaultYearCount : 0) : prevYearCount) : (temp_Years.length===0 ? 1 : 0)
    
    if (isReset) {
      yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1
      prevYearCount = 0
    }

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0
    temp_Years = []

    years.forEach(year => {
      temp_Years.push(year)
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
    if (reSelectedYears.length !== 0) {
      temp_Years = []
    }

    return { yearsInfo, temp_Years, reSelectedYears }
  }

  // reset States List 
  resetStates(states) {
    let {temp_States, selectedStates, whichOneMultiple, isReset} = this.state

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    let stateCount = whichOneMultiple === YEAR_SELECTED ? (temp_States.length === 0 ? defaultStateCount : 0) : (prevStateCount === 0 ? (temp_States.length === 0 ? defaultStateCount : 0) : prevStateCount)

    if (isReset) {
      prevStateCount = 0
      stateCount = defaultStateCount
    }

    temp_States = []
    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0

    states.forEach(stateN => {
      temp_States.push(stateN.id)
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

    if (reSelectedStates.length !== 0) {
      temp_States = []
    }

    return {statesInfo, temp_States, reSelectedStates, selectedStateNames}

  }


  // reset [Filter By, Year, State]
  // run query to refresh [serie_element]
  resetSYRFilter = (serie, years, states, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []

    const yearsData = this.resetYears(years)
    const statesData = this.resetStates(states)
    
    
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftysTailored' : 'dlftysTailored'

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsData.yearsInfo,
      temp_Years: yearsData.temp_Years,
      selectedYears: yearsData.reSelectedYears,
      statesInfo: statesData.statesInfo,
      temp_States: statesData.temp_States,
      selectedStates: statesData.selectedStates,
      selectedStateNames: statesData.selectedStateNames,
      runQuery
    })
  }

  // resest [ Filter By/Sub ]
  resetEFilter = (serie_element, blockIndex) => {
    let {pre_filters} = this.state
    pre_filters[blockIndex].serie_element = serie_element
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex: blockIndex,
      isReset: false,
      runQuery: '',
    })
  }

  // reset [ Filter By/Sub, Year, Region]
  resetEYRFilter = (serie_element, years, states, blockIndex) => {
    let {pre_filters} = this.state
    pre_filters[blockIndex].serie_element = serie_element

    const yearsData = this.resetYears(years)
    const statesData = this.resetStates(states)

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsData.yearsInfo,
      temp_Years: yearsData.temp_Years,
      selectedYears: yearsData.reSelectedYears,
      statesInfo: statesData.statesInfo,
      temp_States: statesData.temp_States,
      selectedStates: statesData.selectedStates,
      selectedStateNames: statesData.selectedStateNames,
      isReset: false,
      runQuery: ''
    })
  }

  // reset [ Year, Region ]
  resetYRFilter = (years, states, blockIndex) => {
    const yearsData = this.resetYears(years)
    const statesData = this.resetStates(states)
    

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsData.yearsInfo,
      temp_Years: yearsData.temp_Years,
      selectedYears: yearsData.reSelectedYears,
      statesInfo: statesData.statesInfo,
      temp_States: statesData.temp_States,
      selectedStates: statesData.selectedStates,
      selectedStateNames: statesData.selectedStateNames,
      isReset: false,
      runQuery: ''
    })
  }

  // reset [ Year ]
  resetYFilter = (years, blockIndex) => {

    let {filters, pre_filters, temp_Years, selectedYears, whichOneMultiple, isReset} = this.state

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    let yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? (temp_Years.length===0 ? defaultYearCount : 0) : prevYearCount) : (temp_Years.length===0 ? 1 : 0)

    if (isReset) {
      yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1
      prevYearCount = 0
    }

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0
    temp_Years = []

    years.forEach(year => {
      temp_Years.push(year)
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

    if (reSelectedYears.length !== 0) {
      temp_Years = []
    }

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      temp_Years,
      yearsInfo: yearsInfo,
      selectedYears: reSelectedYears,
      isReset: false,
      runQuery: ''
    })

  }

  // reset [ Region ]
  // set state
  resetRFilter = (states, blockIndex) => {

    let {filters, pre_filters, temp_States, selectedStates, whichOneMultiple, isReset} = this.state
    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    let stateCount = whichOneMultiple === YEAR_SELECTED ? (temp_States.length === 0 ? defaultStateCount : 0) : (prevStateCount === 0 ? (temp_States.length === 0 ? defaultStateCount : 0) : prevStateCount)

    if (isReset) {
      prevStateCount = 0
      stateCount = defaultStateCount
    }

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    temp_States = []

    states.forEach(stateN => {
      temp_States.push(stateN.id)
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

    if (reSelectedStates.length !== 0) {
      temp_States = []
    }
    
    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      selectedStates: reSelectedStates,
      temp_States,
      statesInfo: statesInfo,
      selectedStateNames: selectedStateNames,
      isReset: false,
      runQuery: ''
    })

  }

  // reset [ Filter By, Year ]
  // run query to refresh [ Filter By/Sub ]
  resetSYFilter = (serie, years, blockIndex) => {
    let {pre_filters, temp_Years, selectedYears, whichOneMultiple, isReset} = this.state
    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    let yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? (temp_Years.length===0 ? defaultYearCount : 0) : prevYearCount) : (temp_Years.length===0 ? 1 : 0)

    if (isReset) {
      yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1
      prevYearCount = 0
    }

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0
    temp_Years = []

    years.forEach(year => {
      temp_Years.push(year)
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

    if (reSelectedYears.length !== 0) {
      temp_Years = []
    }

    const isRemoveDataSource = false
    const isGetSurveyData = false

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftysTailored' : 'dlftysTailored'

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      temp_Years,
      selectedYears: reSelectedYears,
      runQuery
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

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftysTailored' : 'dlftysTailored'

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      runQuery
    })
  }

  // reset [ Filter By/Sub, Year ]
  resetEYFilter = (serie_element, years, blockIndex) => {
    let {filters, pre_filters, temp_Years, selectedYears, whichOneMultiple, isReset} = this.state
    pre_filters[blockIndex].serie_element = serie_element

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    let yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? (temp_Years.length===0 ? defaultYearCount : 0) : prevYearCount) : (temp_Years.length===0 ? 1 : 0)

    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0
    temp_Years = []

    if (isReset) {
      yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1
      prevYearCount = 0
    }

    years.forEach(year => {
      temp_Years.push(year)
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

    if (reSelectedYears.length !== 0) {
      temp_Years = []
    }

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      yearsInfo: yearsInfo,
      temp_Years,
      selectedYears: reSelectedYears,
      isReset: false,
      runQuery: ''
    })
  }

  // reset[ Filter, Region ]
  // run query to reset [ Filter By/Sub ]
  resetSRFilter = (serie, states, blockIndex) => {
    let {pre_filters, temp_States, selectedStates, whichOneMultiple, isReset} = this.state
    pre_filters[blockIndex].serie = serie
    pre_filters[blockIndex].serie_element = []

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    let stateCount = whichOneMultiple === YEAR_SELECTED ? (temp_States.length === 0 ? defaultStateCount : 0) : (prevStateCount === 0 ? (temp_States.length === 0 ? defaultStateCount : 0) : prevStateCount)

    if (isReset) {
      prevStateCount = 0
      stateCount = defaultStateCount
    }

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    temp_States = []

    states.forEach(stateN => {
      temp_States.push(stateN.id)
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

    if (reSelectedStates.length !== 0) {
      temp_States = []
    }
    
    const isRemoveDataSource = false
    const isGetSurveyData = false

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftysTailored' : 'dlftysTailored'

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      statesInfo: statesInfo,
      temp_States,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery
    })
  }


  // reset [ Filter By/Sub, Region ]
  resetERFilter = (serie_element, states, blockIndex) => {
    let {filters, pre_filters, temp_States, selectedStates, whichOneMultiple, isReset} = this.state
    pre_filters[blockIndex].serie_element = serie_element

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    let stateCount = whichOneMultiple === YEAR_SELECTED ? (temp_States.length === 0 ? defaultStateCount : 0) : (prevStateCount === 0 ? (temp_States.length === 0 ? defaultStateCount : 0) : prevStateCount)

    if (isReset) {
      prevStateCount = 0
      stateCount = defaultStateCount
    }

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    temp_States = []

    states.forEach(stateN => {
      temp_States.push(stateN.id)
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

    if (reSelectedStates.length !== 0) {
      temp_States = []
    }

    const isRemoveDataSource = false
    const isGetSurveyData = true

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      statesInfo: statesInfo,
      temp_States,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      isReset: false,
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
      runQuery: 'dTailored'
    })
  }

  onSelectSubReportFilter = (sub_report, blockIndex) => {
    let {pre_filters} = this.state
    pre_filters[blockIndex].sub_report = sub_report
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
      runQuery: 'dlrTailored'
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

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfTailored' : 'dlfTailored'

    this.setState({
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      runQuery
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
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfsTailored' : 'dlfsTailored'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('year') === 0) {
      // Year -> Serie -> ...
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfysTailored' : 'dlfysTailored'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('state') === 0) {
      // State -> Serie -> ...
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftsTailored' : 'dlftsTailored'
    } else if (priority.indexOf('serie') === 2){
      // ... -> ... -> Serie
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftysTailored' : 'dlftysTailored'
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
    let {filters, pre_filters, priority, isReset} = this.state
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
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfseTailored' : 'dlfseTailored'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('year') === 0) {
      // Year -> Serie/Serie_element -> ...
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfseyTailored' : 'dlfseyTailored'
    } else if (priority.indexOf('serie') === 1 &&  priority.indexOf('state') === 0) {
      // State -> Serie/Serie_element -> ...
      runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfsetTailored' : 'dlfsetTailored'
    } else if (priority.indexOf('serie') === 2){
      // ... -> ... -> Serie/Serie_element
      runQuery = ''
      isReset = false
      isGetSurveyData = true
    }

    this.setState({
      filters,
      pre_filters,
      isRemoveDataSource,
      isGetSurveyData,
      blockIndex,
      priority: priority,
      runQuery: runQuery,
      isReset
    })
  }

  // Year selected
  onSelectYear = (index) => {
    let { filters, pre_filters, yearsInfo, whichOneMultiple, priority, blockIndex, isReset } = this.state
    let runQuery = ''
    let isAllDataSources = false 
    
    let isGovernment = false
    for (let i=1; i<9; i++) {
      if (pre_filters[i].report_num.length !== 0 && pre_filters[i].report_num[0] === 6) {
        isGovernment = true
        break
      }
    }

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

    let temp_Years = []
    let selectedYears = []
    yearsInfo.forEach(yearN => {
      temp_Years.push(yearN)
      if (yearN.checked) {
        selectedYears.push(yearN.year)
      }
    })

    if (selectedYears.length !== 0) {
      temp_Years = []
    }

    let isGetSurveyData = false

    if (blockIndex === 0) {

      if (priority.indexOf('year') === 0) {

        // Year -> ... -> ...
        runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfyTailored' : 'dlfyTailored'
      } else if (priority.indexOf('year') === 1 &&  priority.indexOf('state') === 0) {
        // State -> Year -> ...
        runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftyTailored' : 'dlftyTailored'
      } else if (priority.indexOf('year') === 1 &&  priority.indexOf('serie') === 0) {
        // Serie -> Year -> ...
        runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfseyTailored' : 'dlfseyTailored'
      } else if (priority.indexOf('year') === 2){
        // ... -> ... -> Year
        runQuery = ''
        isReset = false
        isGetSurveyData = true
      }
    } else {
      if (whichOneMultiple === YEAR_SELECTED) {
        runQuery = ''
        isReset = false
        isGetSurveyData = true
        isAllDataSources = true
      } else {
        runQuery = isGovernment ? 'dlfseseytAnalysis' : 'dlfseseytAnalysis'
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
      temp_Years: temp_Years,
      runQuery: runQuery,
      isAllDataSources,
      isReset
    })
  }

  // state selected
  onSelectState = (index) => {
    let { filters, pre_filters, statesInfo, whichOneMultiple, priority, blockIndex, isReset } = this.state
    let runQuery = ''
    let isAllDataSources = false

    let isGovernment = false
    for (let i=1; i<9; i++) {
      if (pre_filters[i].report_num.length !== 0 && pre_filters[i].report_num[0] === 6) {
        isGovernment = true
        break
      }
    }

    const priorityIndex = priority.indexOf('state')
    if (priority.length === 3) {
      priority.splice(priorityIndex, 1)
      priority.push('state')
    }
    if (priorityIndex < 0) {
      priority.push('state')
    }

    let temp_States = []
    let selectedStates = []
    let selectedStateNames = []
    statesInfo[index].checked = !statesInfo[index].checked
    if (whichOneMultiple === YEAR_SELECTED) {
      statesInfo.forEach((stateN, i) => {
        if (i !== index) stateN.checked = false
      })
    }
    statesInfo.forEach(stateN => {
      temp_States.push(stateN.id)
      if (stateN.checked) {
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      }
    })

    if (selectedStates.length !== 0) {
      temp_States = []
    }

    let isGetSurveyData = false
    
    if (blockIndex === 0) {
      if (priority.indexOf('state') === 0) {
        // State -> ... -> ...
        runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftTailored' : 'dlftTailored'
      } else if (priority.indexOf('state') === 1 &&  priority.indexOf('year') === 0) {
        // Year -> State -> ...
        runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrftyTailored' : 'dlftyTailored'
      } else if (priority.indexOf('state') === 1 &&  priority.indexOf('serie') === 0) {
        // Serie -> State -> ...
        runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlrfsetTailored' : 'dlfsetTailored'
      } else if (priority.indexOf('state') === 2) {
        // ... -> ... -> State
        runQuery = ''
        isReset = false
        isGetSurveyData = true
      }
    } else {
      if (whichOneMultiple === YEAR_SELECTED) {
        runQuery = isGovernment ? 'dlfsesetyAnalysis' : 'dlfsesetyAnalysis'
      } else {
        runQuery = ''
        isReset = false
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
      temp_States: temp_States,
      runQuery: runQuery,
      isAllDataSources,
      isReset
    })
  }

  

  // Datasource block inital loading
  initialBlockLoadAnalysis = (topic_abb, sub_report, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].topic_abb = topic_abb
    pre_filters[blockIndex].sub_report = sub_report
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlAnalysis' : 'dlAnalysis'

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery,
      blockIndex
    })
  }

  // selected DataSource `Arms Data Analysis`
  selectDataSource = (report_num, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].report_num = report_num

    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
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
    const isAllDataSources = false

    this.setState({
      filters,
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery: '',
      isReset: false,
      blockIndex
    })
  }

  selectSubReportAnalysis = (sub_report, blockIndex) => {
    let {filters, pre_filters} = this.state

    pre_filters[blockIndex].sub_report = sub_report
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    this.setState({
      filters,
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery: 'dlAnalysis',
      isReset: false,
      blockIndex
    })
  }

  // selected Farm Type in `Arms Data Analysis`
  selectFarmTypeAnalsysis = (subject_num, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].subject_num = subject_num
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false
    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlfAnalysis' : 'dlfAnalysis'


    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery,
      blockIndex
    })
  }

  // selected Filter1 in `Arms Data Analysis`
  selectFilter1Analysis = (serie, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie = serie
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlfsAnalysis' : 'dlfsAnalysis'

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery,
      blockIndex
    })
  }

  // selected Filter1/Sub in `Arms Data Analysis`
  selectSubFilter1Analysis = (serie_element, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie_element = serie_element
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlfseAnalysis' : 'dlfseAnalysis'

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery,
      blockIndex
    })
  }

  // selected Filter2 in `Arms Data Analysis`
  selectFilter2Analysis = (serie2, blockIndex) => {
    let {pre_filters} = this.state

    pre_filters[blockIndex].serie2 = serie2
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    const runQuery = pre_filters[blockIndex].report_num[0] === 6 ? 'dlfsesAnalysis' : 'dlfsesAnalysis'

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery,
      blockIndex
    })
  }

  // selected Filterw2/Sub in `Arms Data Analysis`
  selectSubFilter2Analysis = (serie2_element, blockIndex) => {
    let {pre_filters, whichOneMultiple} = this.state

    pre_filters[blockIndex].serie2_element = serie2_element
    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    let isGovernment = false
    for (let i=1; i<9; i++) {
      if (pre_filters[i].report_num.length !== 0 && pre_filters[i].report_num[0] === 6) {
        isGovernment = true
        break
      }
    }

    const runQuery = whichOneMultiple === YEAR_SELECTED ? (isGovernment ? 'dlfseseyAnalysis' : 'dlfseseyAnalysis') : (isGovernment ? 'dlfsesetAnalysis' : 'dlfsesetAnalysis')


    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      pre_filters,
      runQuery,
      blockIndex
    })
  }

  // reset year in `Arms Data Analysis`
  selectYearAnalysis = (years) => {
    let {temp_Years, selectedYears, whichOneMultiple, isReset, pre_filters} = this.state

    let isGovernment = false
    for (let i=1; i<9; i++) {
      if (pre_filters[i].report_num.length !== 0 && pre_filters[i].report_num[0] === 6) {
        isGovernment = true
        break
      }
    }

    const runQuery = whichOneMultiple === YEAR_SELECTED ? (isGovernment ? 'dlfseseytAnalysis' : 'dlfseseytAnalysis') : ''    

    let prevYearCount = 0

    years.forEach(year => {
      if (selectedYears.indexOf(year) > -1) {
        prevYearCount++
      }
    })

    const yearCount = whichOneMultiple === YEAR_SELECTED ? (prevYearCount === 0 ? (temp_Years.length===0 ? defaultYearCount : 0) : prevYearCount) : (temp_Years.length===0 ? 1 : 0)


    let yearsInfo = []
    let reSelectedYears = []
    let currentYearCount = 0
    temp_Years = []

    years.forEach(year => {
      temp_Years.push(year)
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
    
    if (reSelectedYears.length !== 0) {
      temp_Years = []
    }

    const isRemoveDataSource = false

    let isAllDataSources = false
    let isGetSurveyData = false
    

    if (runQuery.length === 0) {
      isReset = false
      isGetSurveyData = true
      isAllDataSources = true
    }

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      yearsInfo: yearsInfo,
      temp_Years,
      selectedYears: reSelectedYears,
      runQuery: runQuery,
      isAllDataSources,
      isReset
    })
  }

  // reset Region in `Arms Data Analysis`
  selectStateAnalysis = (states) => {
    let {temp_States, selectedStates, whichOneMultiple, isReset, pre_filters} = this.state

    let isGovernment = false
    for (let i=1; i<9; i++) {
      if (pre_filters[i].report_num.length !== 0 && pre_filters[i].report_num[0] === 6) {
        isGovernment = true
        break
      }
    }

    const runQuery = whichOneMultiple === YEAR_SELECTED ? '' : (isGovernment ? 'dlfsesetyAnalysis' : 'dlfsesetyAnalysis')

    let prevStateCount = 0

    states.forEach(stateN => {
      if (selectedStates.indexOf(stateN.id) > -1) {
        prevStateCount++
      }
    })

    const stateCount = whichOneMultiple === YEAR_SELECTED ? (temp_States.length === 0 ? defaultStateCount : 0) : (prevStateCount === 0 ? (temp_States.length === 0 ? defaultStateCount : 0) : prevStateCount)

    let statesInfo = []
    let reSelectedStates = []
    let selectedStateNames = []
    let currentStateCount = 0
    temp_States = []

    states.forEach(stateN => {
      temp_States.push(stateN.id)
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

    if (reSelectedStates.length !== 0) {
      temp_States = []
    }

    const isRemoveDataSource = false

    let isAllDataSources = false
    let isGetSurveyData = false
    

    if (runQuery.length === 0) {
      isReset = false
      isGetSurveyData = true
      isAllDataSources = true
    }

    this.setState({
      isRemoveDataSource,
      isGetSurveyData,
      statesInfo: statesInfo,
      temp_States,
      selectedStates: reSelectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: runQuery,
      isAllDataSources,
      isReset
    })
  }

  // Add Datasource
  addDataSource = (blockIndex) => {
    let {pre_filters, filters} = this.state

    pre_filters[blockIndex].report_num = [1]

    filters[blockIndex].report_num = []
    filters[blockIndex].subject_num = []
    filters[blockIndex].serie = []
    filters[blockIndex].serie_element = []
    filters[blockIndex].serie2 = []
    filters[blockIndex].serie2_element = []
    pre_filters[blockIndex].subject_num = []
    pre_filters[blockIndex].serie = []
    pre_filters[blockIndex].serie_element = []
    pre_filters[blockIndex].serie2 = []
    pre_filters[blockIndex].serie2_element = []

    const runQuery = 'dAnalysis'

    const isRemoveDataSource = false
    const isGetSurveyData = false
    const isAllDataSources = false

    this.setState({
      pre_filters,
      filters,
      isRemoveDataSource,
      isGetSurveyData,
      isAllDataSources,
      blockIndex,
      runQuery
    })
  }

  // remove DataSource

  removeDataSource = (blockIndex) => {
    let {filters, pre_filters} = this.state

    for (let i=blockIndex; i<8; i++) {
      filters[i] = filters[i+1]
      pre_filters[i] = pre_filters[i+1]
    }
    filters[8].report_num = []
    filters[8].subject_num = []
    filters[8].serie = []
    filters[8].serie_element = []
    filters[8].serie2 = []
    filters[8].serie2_element = []
    pre_filters[8].report_num = []
    pre_filters[8].subject_num = []
    pre_filters[8].serie = []
    pre_filters[8].serie_element = []
    pre_filters[8].serie2 = []
    pre_filters[8].serie2_element = []

    const isRemoveDataSource = true
    const isGetSurveyData = false

    this.setState({
      filters,
      pre_filters,
      blockIndex,
      isRemoveDataSource,
      isGetSurveyData,
      runQuery: '',
      isReset: false
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
      blockIndex,
      isReset
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

    if (runQuery.length === 0) {
      isReset = false
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
      runQuery,
      isReset
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
  switchFontSize(fontSizeIndex) {
    this.setState({ fontSizeIndex })
  }

  render() {
    const {
      selectedStateNames,
      blockIndex, 
      yearsInfo,
      selectedYears,
      temp_Years,
      statesInfo,
      selectedStates,
      temp_States,
      whichOneMultiple,
      isSelectedAll,
      filters,
      pre_filters,
      runQuery,
      isRemoveDataSource,
      isAllDataSources,
      isGetSurveyData,
      isReset,
      fontSizeIndex
    } = this.state

    let serie = []
    let serie_element = []
    let serie2 = []
    let serie2_element = []

    for (let i=0; i<9; i++) {
      if (isGetSurveyData) {
        filters[i].report_num = pre_filters[i].report_num
        filters[i].sub_report = pre_filters[i].sub_report
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
        serie.push(filters[i].serie)
        serie_element.push(filters[i].serie_element)
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
    let arms_sub_report = []
    let arms_subject_num = []
    let arms_serie = []
    let arms_serie_element = []
    let arms_serie2 = []
    let arms_serie2_element = []
    let arms_topic_abb = []

    for (let i=1; i<dataSourceCounts+1; i++) {
      arms_report_num = arms_report_num.concat(pre_filters[i].report_num)
      arms_sub_report = arms_sub_report.concat(pre_filters[i].sub_report)
      arms_subject_num = arms_subject_num.concat(pre_filters[i].subject_num)
      arms_serie = arms_serie.concat(pre_filters[i].serie)
      arms_serie_element = arms_serie_element.concat(pre_filters[i].serie_element)
      arms_serie2 = arms_serie2.concat(pre_filters[i].serie2)
      arms_serie2_element = arms_serie2_element.concat(pre_filters[i].serie2_element)
      arms_topic_abb = arms_topic_abb.concat(pre_filters[i].topic_abb)
    }
    let sortedYears = yearsInfo.sort(function(a, b){return parseInt(b.year, 10) - parseInt(a.year, 10)})
    console.log('test', filters, pre_filters)


    return (  
      <div>
        <Sidebar
          arms_report_num = {arms_report_num}
          arms_sub_report = {arms_sub_report}
          arms_subject_num = {arms_subject_num}
          arms_topic_abb = {arms_topic_abb}
          arms_serie = {arms_serie}
          arms_serie_element = {arms_serie_element}
          arms_serie2 = {arms_serie2}
          arms_serie2_element = {arms_serie2_element}
          reports = {this.props.reports}
          report_num = {pre_filters[blockIndex].report_num}
          sub_report = {pre_filters[blockIndex].sub_report}
          topic_abb = {pre_filters[blockIndex].topic_abb}
          subject_num = {pre_filters[blockIndex].subject_num}
          serie = {pre_filters[blockIndex].serie}
          serie_element={pre_filters[blockIndex].serie_element}
          serie2 = {pre_filters[blockIndex].serie2}
          serie2_element = {pre_filters[blockIndex].serie2_element}
          selectedStates = {selectedStates.length === 0 ? temp_States : selectedStates}
          selectedYears={selectedYears.length === 0 ? temp_Years : selectedYears}
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
          onSelectReportCategory = {this.onSelectReportCategory}
          onSelectSubReportFilter = {this.onSelectSubReportFilter}
          onSelectSubjectFilter = {this.onSelectSubjectFilter}
          onSelectFilterByFilter = {this.onSelectFilterByFilter}
          onSelectSubFilterByFilter = {this.onSelectSubFilterByFilter} 
          selectAnalysisCategory = {this.selectAnalysisCategory}
          initialBlockLoadAnalysis = {this.initialBlockLoadAnalysis}
          selectDataSource = {this.selectDataSource}
          selectDataLineAnalysis = {this.selectDataLineAnalysis}
          selectSubReportAnalysis = {this.selectSubReportAnalysis}
          selectFarmTypeAnalsysis = {this.selectFarmTypeAnalsysis}
          selectFilter1Analysis = {this.selectFilter1Analysis}
          selectSubFilter1Analysis = {this.selectSubFilter1Analysis}
          selectFilter2Analysis =  {this.selectFilter2Analysis}
          selectSubFilter2Analysis = {this.selectSubFilter2Analysis}
          selectYearAnalysis = {this.selectYearAnalysis}
          selectStateAnalysis = {this.selectStateAnalysis}          
          addDataSource = {this.addDataSource}
          removeDataSource = {this.removeDataSource}
          isReset = {isReset}
          fontSizeIndex={fontSizeIndex}
        />
        <Col xs={12} md={12} sm={12} lg={9}>
          <div className="font-sizes">
            <OptionGroup options={fontSizeArray} selectedIndex={fontSizeIndex} tabIndex={900} onSelect={(index) => this.switchFontSize(index)} />
          </div>
          <h4 className="main-heading">
            {blockIndex > 0 ? 'ARMS Data Analysis' : 'Tailored Reports'}
          </h4>
          <FilterDropdown 
            yearsInfo={sortedYears} 
            statesInfo={statesInfo} 
            whichOneMultiple={whichOneMultiple}   
            fontSizeIndex={fontSizeIndex} 
            isSelectedAll={isSelectedAll}    
            onSelectAll={this.onSelectAll}
            onSelectYear={this.onSelectYear} 
            onSelectState={this.onSelectState}
            onSwitchMultiple={this.onSwitchMultiple}
          />
        </Col>
      </div>
    )
  }








}