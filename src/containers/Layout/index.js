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
    runQuery: '',
    priority: [],
    isRemoveDataSource: false
  }

  componentWillMount() {
    let filters = []
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
    }

    this.setState({filters, isRemoveDataSource})
  }

  componentWillReceiveProps(props) {

    let {filters, whichOneMultiple} = this.state

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
    

    filters[0].topic_abb = []
    if (props.topics && props.topics.length !== 0) {
      props.topics[0].forEach(topic => {
        filters[0].topic_abb.push(topic.abb)
      })
    }

    const isRemoveDataSource = false

    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      filters: filters,
      isRemoveDataSource
    })    
    
  }

  // initial LHS loading in `tailored report`
  // run query to refresh [serie, year, state]
  initialLoadingTailor = (report_num, subject_num, blockIndex) => {
    let {filters} = this.state

    const isRemoveDataSource = false

    filters[blockIndex].report_num = [report_num]
    filters[blockIndex].subject_num = [subject_num]
    this.setState({
      filters,
      isRemoveDataSource,
      priority: [],
      blockIndex,
      runQuery: 'resetQuery'
    })
  }

  resetFilterByBlockIndex = (blockIndex) => {

    const isRemoveDataSource = false

    let {filters, selectedYears, selectedStates} = this.state
    let runQuery = ''

    if (blockIndex === 0) {
      filters[blockIndex].serie = []
      filters[blockIndex].serie_element = []
      runQuery = 'resetQuery'
    } else {
      filters[blockIndex].subject_num = []
      filters[blockIndex].serie = []
      filters[blockIndex].serie_element = []
      filters[blockIndex].serie2 = []
      filters[blockIndex].serie2_element = []
      runQuery = 'ytDLAnalysis'
    }

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      selectedYears: blockIndex === 0 ? [] : selectedYears,
      selectedStates: blockIndex === 0 ? [] : selectedStates,
      priority: [],
      runQuery: runQuery
    })
  }  


  // reset [Filter By, Year, State]
  // run query to refresh [serie_element]
  resetSYRFilter = (serie, years, states, blockIndex) => {
    let {filters, whichOneMultiple} = this.state
    filters[blockIndex].serie = serie
    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1 

    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
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
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: 'tysQuery'
    })
  }

  // resest [ Filter By/Sub ]
  resetEFilter = (serie_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie_element = serie_element    

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: ''
    })
  }

  // reset [ Filter By/Sub, Year, Region]
  resetEYRFilter = (serie_element, years, states, blockIndex) => {
    let {filters, whichOneMultiple} = this.state
    filters[blockIndex].serie_element = serie_element

    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
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
    
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })

    this.setState({
      filters: filters,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      runQuery: ''
    })

  }

  // reset [ Year, Region ]
  resetYRFilter = (years, states, blockIndex) => {

    let {whichOneMultiple} = this.state
    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
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
    
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })
    

    this.setState({
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      selectedStates: selectedStates,
      statesInfo: statesInfo,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })

  }

  // reset [ Year ]
  resetYFilter = (years, blockIndex) => {

    let {whichOneMultiple} = this.state
    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
        infoObj.checked = true
        selectedYears.push(year)
      } else {
        infoObj.checked = false
      }          
      yearsInfo.push(infoObj)
    })

    this.setState({
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: ''
    })

  }

  // reset [ Region ]
  // set state
  resetRFilter = (states, blockIndex) => {

    let statesInfo = []
    let selectedStates = []
    let selectedStateNames = []

    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })
    

    this.setState({
      blockIndex,
      selectedStates: selectedStates,
      statesInfo: statesInfo,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })

  }

  // reset [ Filter By, Year ]
  // run query to refresh [ Filter By/Sub ]
  resetSYFilter = (serie, years, blockIndex) => {
    let {filters, whichOneMultiple} = this.state
    filters[blockIndex].serie = [serie]

    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
        infoObj.checked = true
        selectedYears.push(year)
      } else {
        infoObj.checked = false
      }          
      yearsInfo.push(infoObj)
    })

    this.setState({
      filters: filters,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: 'tysQuery'
    })
  }

  // reset [ Filter By ]
  // run query to refresh [ Filter By/Sub ]
  resetSFilter = (serie, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie = [serie]

    this.setState({
      filters: filters,
      blockIndex,
      runQuery: 'tysQuery'
    })
  }

  // reset [ Filter By/Sub, Year ]
  resetEYFilter = (serie_element, years, blockIndex) => {
    let {filters, whichOneMultiple} = this.state
    filters[blockIndex].serie_element = serie_element

    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
        infoObj.checked = true
        selectedYears.push(year)
      } else {
        infoObj.checked = false
      }          
      yearsInfo.push(infoObj)
    })

    this.setState({
      filters: filters,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: ''
    })
  }

  // reset[ Filter, Region ]
  // run query to reset [ Filter By/Sub ]
  resetSRFilter = (serie, states, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie = [serie]

    let statesInfo = []
    let selectedStates = []
    let selectedStateNames = []
    
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })
    

    this.setState({
      filters: filters,
      blockIndex,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: 'tysQuery'
    })
  }


  // reset [ Filter By/Sub, Region ]
  resetERFilter = (serie_element, states, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie_element = serie_element

    let statesInfo = []
    let selectedStates = []
    let selectedStateNames = []
    
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })
    

    this.setState({
      filters: filters,
      blockIndex,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: ''
    })
  }

  // report_num selected
  onSelectReportFilter = (report_num, topic_abb, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].report_num = report_num
    filters[blockIndex].topic_abb = topic_abb
    filters[blockIndex].subject_num = []
    filters[blockIndex].serie = []
    filters[blockIndex].serie_element = []
    const yearsInfo = []
    const statesInfo = []
    const selectedStateNames = []
    const selectedYears = []
    const selectedStates = []

    this.setState({
      filters: filters,
      blockIndex,
      yearsInfo,
      selectedYears,
      statesInfo,
      selectedStates,
      selectedStateNames,
      runQuery: 'reset1Query'
    })
  }

  // subject_num selected
  onSelectSubjectFilter = (subject_num, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].subject_num = subject_num
    filters[blockIndex].serie = []
    filters[blockIndex].serie_element = []
    const yearsInfo = []
    const statesInfo = []
    const selectedStateNames = []
    const selectedYears = []
    const selectedStates = []

    this.setState({
      filters: filters,
      blockIndex,
      yearsInfo,
      selectedYears,
      statesInfo,
      selectedStates,
      selectedStateNames,
      runQuery: 'resetQuery'
    })
  }

  // serie selected
  onSelectFilterByFilter = (serie, blockIndex) => {
    let {filters, priority} = this.state
    let runQuery = ''
    if (priority.indexOf('serie') < 0) {
      priority.push('serie')
    }
    filters[blockIndex].serie = serie
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
    this.setState({
      filters: filters,
      blockIndex,
      priority: priority,
      runQuery: runQuery
    })
  }

  // serie_element selected
  onSelectSubFilterByFilter = (serie_element, blockIndex) => {
    let {filters, priority} = this.state
    let runQuery = ''
    if (priority.indexOf('serie') < 0) {
      priority.push('serie')
    }
    filters[blockIndex].serie_element = serie_element
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
    }
    this.setState({
      filters: filters,
      blockIndex,
      priority: priority,
      runQuery: runQuery
    })
  }

  // Year selected
  onSelectYear = (index) => {
    let { yearsInfo, whichOneMultiple, priority, filters, blockIndex } = this.state
    let runQuery = ''
    if (priority.indexOf('year') < 0) {
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
      }
    } else {
      if (whichOneMultiple === YEAR_SELECTED) {
        runQuery = 'ytDLAnalysis'
      } else {
        runQuery = 'yAnalysis'
      }
    }

    const isRemoveDataSource = false

    this.setState({
      filters,
      isRemoveDataSource,
      priority: priority,
      yearsInfo: yearsInfo.slice(),
      selectedYears: selectedYears,
      runQuery: runQuery
    })
  }

  // state selected
  onSelectState = (index) => {
    let { statesInfo, whichOneMultiple, priority, filters, blockIndex } = this.state
    let runQuery = ''
    if (priority.indexOf('state') < 0) {
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
      }
    } else {
      if (whichOneMultiple === YEAR_SELECTED) {
        runQuery = 'tAnalysis'
      } else {
        runQuery = 'ytDLAnalysis'
      }
    }

    const isRemoveDataSource = false

    this.setState({
      filters,
      isRemoveDataSource,
      selectedStateNames,
      priority: priority,
      statesInfo: statesInfo.slice(),
      selectedStates: selectedStates,
      runQuery: runQuery
    })
  }

  // Arms Data Analysis Category selected firstly
  selectAnalysisCategory = () => {
    let {filters} = this.state
    const blockIndex = 1
    filters[blockIndex].report_num = [1]
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dAnalysis',
      blockIndex
    })
  }

  // Datasource block inital loading
  initialBlockLoadAnalysis = (topic_abb, subject_num, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].topic_abb = topic_abb
    filters[blockIndex].subject_num = subject_num
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dlfAnalysis',
      blockIndex
    })
  }

  // selected DataSource `Arms Data Analysis`
  selectDataSource = (report_num, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].report_num = report_num

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dAnalysis',
      blockIndex
    })
  }

  // selected DataLine in `Arms Data Analysis`
  selectDataLineAnalysis = (topic_abb, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].topic_abb = topic_abb
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: '',
      blockIndex
    })
  }

  // selected Farm Type in `Arms Data Analysis`
  selectFarmTypeAnalsysis = (subject_num, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].subject_num = subject_num
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dlfAnalysis',
      blockIndex
    })
  }

  // selected Filter1 in `Arms Data Analysis`
  selecteFilter1Analysis = (serie, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].serie = serie
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dlfsAnalysis',
      blockIndex
    })
  }

  // selected Filter1/Sub in `Arms Data Analysis`
  selectSubFilter1Analysis = (serie_element, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].serie_element = serie_element
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dlfseAnalysis',
      blockIndex
    })
  }

  // selected Filter2 in `Arms Data Analysis`
  selectFilter2Analysis = (serie2, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].serie2 = serie2
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: 'dlfsesAnalysis',
      blockIndex
    })
  }

  // selected Filterw2/Sub in `Arms Data Analysis`
  selectSubFilter2Analysis = (serie2_element, blockIndex) => {
    let {filters, whichOneMultiple} = this.state

    filters[blockIndex].serie2_element = serie2_element
    const isRemoveDataSource = false

    const runQuery = whichOneMultiple === YEAR_SELECTED ? 'dlfsesetAnalysis' : 'dlfseseyAnalysis'


    this.setState({
      isRemoveDataSource,
      filters: filters,
      runQuery: runQuery,
      blockIndex
    })
  }

  // reset year in `Arms Data Analysis`
  selectYearAnalysis = (years) => {
    let {filters, whichOneMultiple} = this.state

    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1

    const runQuery = whichOneMultiple === YEAR_SELECTED ? '' : 'dlfseseytAnalysis'

    let yearsInfo = []
    let selectedYears = []

    .years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
        infoObj.checked = true
        selectedYears.push(year)
      } else {
        infoObj.checked = false
      }          
      yearsInfo.push(infoObj)
    })

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      filters: filters,
      runQuery: runQuery
    })
  }

  // reset Region in `Arms Data Analysis`
  selectStateAnalysis = (states) => {
    let {filters, whichOneMultiple} = this.state

    const runQuery = whichOneMultiple === YEAR_SELECTED ? 'dlfsesetyAnalysis' : ''

    let statesInfo = []
    let selectedStates = []
    let selectedStateNames = []
    
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      filters: filters,
      runQuery: runQuery
    })
  }

  onSelectAnalysis = () => {
    let {filters, whichOneMultiple} = this.state
    const blockIndex = 1
    filters[blockIndex].report_num = [1]
    filters[blockIndex].subject_num = [1]

    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1
    
    let yearsInfo = []
    let selectedYears = []

    this.props.years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (this.props.years.indexOf(year) >= 0 && this.props.years.indexOf(year) < yearCount) {
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
    
    this.props.states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (this.props.states.indexOf(stateN) >= 0 && this.props.states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })
    

    const topic_abb = []
    if (this.props.topics) {
      topic_abb.push(this.props.topics[0][0].abb)
    }
    filters[blockIndex].topic_abb = topic_abb

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      filters: filters,
      runQuery: 'initAnalysis',
      blockIndex
    })
  }

  onResetYearAnalysis = (years, blockIndex) => {

    let {whichOneMultiple} = this.state
    const yearCount = whichOneMultiple === YEAR_SELECTED ? defaultYearCount : 1
    
    let yearsInfo = []
    let selectedYears = []
    years.forEach(year => {
      const infoObj = {}
      infoObj.year = year
      if (years.indexOf(year) >= 0 && years.indexOf(year) < yearCount) {
        infoObj.checked = true
        selectedYears.push(year)
      } else {
        infoObj.checked = false
      }          
      yearsInfo.push(infoObj)
    })
    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      blockIndex,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: 'ytDLAnalysis'
    })
  }

  onResetStateAnalysis = (states, blockIndex) => {
    let statesInfo = []
    let selectedStates = []
    let selectedStateNames = []
    states.forEach(stateN => {
      const obj = {}
      obj.name = stateN.name
      obj.id = stateN.id
      if (states.indexOf(stateN) >= 0 && states.indexOf(stateN) < defaultStateCount) {
        obj.checked = true
        selectedStates.push(stateN.id)
        selectedStateNames.push(stateN.name)
      } else {
        obj.checked = false 
      }    
      statesInfo.push(obj)     
    })

    const isRemoveDataSource = false

    this.setState({
      isRemoveDataSource,
      blockIndex,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      runQuery: 'ytDLAnalysis'
    })
  }

  onSelectDatasource = (report_num, topic_abb, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].report_num = report_num
    filters[blockIndex].topic_abb = topic_abb

    const isRemoveDataSource = false
    
    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: 'ytDLAnalysis'
    })
  }

  onSleectDataLine = (topic_abb, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].topic_abb = topic_abb

    const isRemoveDataSource = false

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: ''
    })
  }


  onSelectAnalysisFarm = (subject_num, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].subject_num = subject_num
    filters[blockIndex].serie = []
    filters[blockIndex].serie_element = []
    filters[blockIndex].serie2 = []
    filters[blockIndex].serie2_element = []

    const isRemoveDataSource = false

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: 'ytDLFAnalysis'
    })
  }


  onSelectAnalysisFilter1 = (serie, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie = serie
    filters[blockIndex].serie_element = []
    filters[blockIndex].serie2 = []
    filters[blockIndex].serie2_element = []

    const isRemoveDataSource = false

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: 'ytsAnalysis'
    })
  }

  onSelectAnalysisSubFilter1 = (serie_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie_element = serie_element
    filters[blockIndex].serie2 = []
    filters[blockIndex].serie2_element = []

    const isRemoveDataSource = false

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: 'ytseAnalysis'
    })
  }

  onSelectAnalysisFilter2 = (serie2, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie2 = serie2
    filters[blockIndex].serie2_element = []

    const isRemoveDataSource = false

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: 'ytsesAnalysis'
    })
  }

  onSelectAnalysisSubFilter2 = (serie2_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie2_element = serie2_element

    const isRemoveDataSource = false

    this.setState({
      filters: filters,
      isRemoveDataSource,
      blockIndex: blockIndex,
      runQuery: ''
    })
  }

  // Add Datasource
  addDataSource = (blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].report_num = [1]
    filters[blockIndex].subject_num = [1]

    const topic_abb = []
    if (this.props.topics) {
      topic_abb.push(this.props.topics[0][0].abb)
    }
    filters[blockIndex].topic_abb = topic_abb

    const runQuery = 'initAnalysis'

    const isRemoveDataSource = false

    this.setState({
      filters,
      isRemoveDataSource,
      blockIndex,
      runQuery
    })
  }

  // remove DataSource

  removeDataSource = (blockIndex) => {
    let {filters} = this.state

    for (let i=blockIndex; i<filters.length-2; i++) {
      filters[i] = filters[i+1]
    }
    filters[filters.length-1].report_num = []
    filters[filters.length-1].subject_num = []
    filters[filters.length-1].serie = []
    filters[filters.length-1].serie_element = []
    filters[filters.length-1].serie2 = []
    filters[filters.length-1].serie2_element = []

    const isRemoveDataSource = true

    this.setState({
      filters,
      blockIndex,
      isRemoveDataSource
    })
  }
  
  onSwitchMultiple = () => {
    let { 
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
    if (blockIndex !== 0 && yearsCount !== 1 && statesCount !== 1) {
      runQuery = 'ytDLAnalysis'
    }

    const isRemoveDataSource = false

    this.setState({ 
      whichOneMultiple: whichOneMultiple === YEAR_SELECTED ? 'NA':YEAR_SELECTED,
      selectedYears: selectedYears.slice(),
      selectedStates: selectedStates.slice(),
      selectedStateNames: selectedStateNames.slice(),
      yearsInfo,
      statesInfo,
      isRemoveDataSource,
      runQuery
    })
  }

  render() {
    console.log('%%%%%%%%%%%%', this.state, '%%%%%%%%%%%')
    const {
      selectedStateNames,
      blockIndex, 
      yearsInfo,
      selectedYears,
      statesInfo,
      selectedStates,
      whichOneMultiple,
      filters,
      runQuery,
      isRemoveDataSource
    } = this.state
    let serie = []
    let serie_element = []
    if (filters[blockIndex]){
      if (filters[blockIndex].serie_element.length > 1){
        serie_element = [0]
        serie = ['farm']
      } else {
        serie = filters[blockIndex].serie
        serie_element = filters[blockIndex].serie_element
      }
    }
    let serie2 = []
    let serie2_element = []
    if (filters[blockIndex]){
      if (filters[blockIndex].serie2_element.length > 1){
        serie2_element = [0]
        serie2 = ['farm']
      } else {
        serie2 = filters[blockIndex].serie2
        serie2_element = filters[blockIndex].serie2_element
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
      arms_report_num = arms_report_num.concat(filters[i].report_num)
      arms_subject_num = arms_subject_num.concat(filters[i].subject_num)
      arms_serie = arms_serie.concat(filters[i].serie)
      arms_serie_element = arms_serie_element.concat(filters[i].serie_element)
      arms_serie2 = arms_serie2.concat(filters[i].serie2)
      arms_serie2_element = arms_serie2_element.concat(filters[i].serie2_element)
      arms_topic_abb = arms_topic_abb.concat(filters[i].topic_abb)
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
          report_num = {filters[blockIndex] ? filters[blockIndex].report_num : []}
          topic_abb = {filters[blockIndex] ? filters[blockIndex].topic_abb : []}
          subject_num = {filters[blockIndex] ? filters[blockIndex].subject_num : []}
          serie = {filters[blockIndex] ? filters[blockIndex].serie : []}
          serie_element={filters[blockIndex] ? filters[blockIndex].serie_element : []}
          serie2 = {filters[blockIndex] ? filters[blockIndex].serie2 : []}
          serie2_element = {filters[blockIndex] ? filters[blockIndex].serie2_element : []}
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
          onSelectAnalysis = {this.onSelectAnalysis}
          onResetYearAnalysis = {this.onResetYearAnalysis}
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

          onResetStateAnalysis = {this.onResetStateAnalysis}
          onSelectAnalysisFilter1 = {this.onSelectAnalysisFilter1}
          onSelectAnalysisSubFilter1 = {this.onSelectAnalysisSubFilter1}
          onSelectAnalysisFilter2 = {this.onSelectAnalysisFilter2}
          onSelectAnalysisSubFilter2 = {this.onSelectAnalysisSubFilter2}
          onSelectDatasource = {this.onSelectDatasource}
          onSleectDataLine = {this.onSleectDataLine}
          onSelectAnalysisFarm = {this.onSelectAnalysisFarm}
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
            onSelectYear={this.onSelectYear} 
            onSelectState={this.onSelectState}
            onSwitchMultiple={this.onSwitchMultiple}
            whichOneMultiple={whichOneMultiple}          
          />
          <MainContainer
            selectedStates = {selectedStates}
            selectedStateNames = {selectedStateNames}
            selectedYears={selectedYears}
            report_num = {filters[blockIndex] ? filters[blockIndex].report_num : []}
            subject_num = {filters[blockIndex] ? filters[blockIndex].subject_num : []}
            serie = {serie}
            serie_element = {serie_element}
            serie2 = {serie2}
            serie2_element = {serie2_element}
            topic_abb = {filters[blockIndex] ? filters[blockIndex].topic_abb : []}
            blockIndex = {blockIndex}      
            whichOneMultiple={whichOneMultiple}
            isRemoveDataSource={isRemoveDataSource}          
          />        
          <Footnote />
        </Col>  
      </Grid>
    )
  }
}

