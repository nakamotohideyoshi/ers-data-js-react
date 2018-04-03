import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';
// import { filter, concatSeries } from 'async';

const defaultYearCount = 5
const defaultStateCount = 1
const defaultSerie = 'farm'
const defaultSerie_element = 0
const dataSourceCounts = 8

export default class Layout extends React.Component {
  state = {
    selectedStateNames: [],
    isYearsMultiple: true,     
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: [],
    selectedYears: [],
    selectedStates: [],
    filters: [],
    runQuery: '',
    priority: []
  }

  componentWillMount() {
    let filters = []

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

    this.setState({filters})
  }

  componentWillReceiveProps(props) {

    let {filters, isYearsMultiple} = this.state

    const yearCount = isYearsMultiple ? defaultYearCount : 1

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

    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      selectedStateNames: selectedStateNames,
      filters: filters
    })    
  }

  // static filter [report, subject] selected in `tailored report`
  // run query to refresh [serie, year, state]
  onStaticSelect = (report_num, subject_num, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].report_num = [report_num]
    filters[blockIndex].subject_num = [subject_num]
    this.setState({
      filters,
      priority: [],
      blockIndex,
      runQuery: 'resetQuery'
    })
  }

  onResetFilter = () => {

    let {filters} = this.state

    const blockIndex = 0

    filters[blockIndex].serie = []
    filters[blockIndex].serie_element = []
    const selectedYears = []
    const selectedStates = []

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      selectedYears: selectedYears,
      selectedStates: selectedStates,
      priority: [],
      runQuery: 'resetQuery'
    })
  }  


  // reset step 1
  // run query to refresh [serie_element]
  onResetFilter1 = (serie, years, states, blockIndex) => {
    let {filters, isYearsMultiple} = this.state
    filters[blockIndex].serie = serie
    const yearCount = isYearsMultiple ? defaultYearCount : 1 

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

  // resest filter 2
  // set sereie_element
  onResetFilter2 = (serie_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie_element = serie_element    

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: ''
    })
  }

  // reset filter 3
  // set serie_element, year, state
  onResetFilter3 = (serie_element, years, states, blockIndex) => {
    let {filters, isYearsMultiple} = this.state
    filters[blockIndex].serie_element = serie_element

    const yearCount = isYearsMultiple ? defaultYearCount : 1

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

  // reset filter 4
  // set year, state
  onResetFilter4 = (years, states, blockIndex) => {

    let {isYearsMultiple} = this.state
    const yearCount = isYearsMultiple ? defaultYearCount : 1

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

  // reset filter 5
  // set year
  onResetFilter5 = (years, blockIndex) => {

    let {isYearsMultiple} = this.state
    const yearCount = isYearsMultiple ? defaultYearCount : 1

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

  // reset filter 6
  // set state
  onResetFilter6 = (states, blockIndex) => {

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

  // reset filter 7 
  // run query to refresh [serie_element]
  onResetFilter7 = (serie, years, blockIndex) => {
    let {filters, isYearsMultiple} = this.state
    filters[blockIndex].serie = [serie]

    const yearCount = isYearsMultiple ? defaultYearCount : 1

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

  // reset filter 8
  // set serie
  onResetFilter8 = (serie, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie = [serie]

    this.setState({
      filters: filters,
      blockIndex,
      runQuery: 'tysQuery'
    })
  }

  // reset filter 9
  // set serie_element, year
  onResetFilter9 = (serie_element, years, blockIndex) => {
    let {filters, isYearsMultiple} = this.state
    filters[blockIndex].serie_element = serie_element

    const yearCount = isYearsMultiple ? defaultYearCount : 1

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

  // reset filter 10
  // set serie, state
  onResetFilter10 = (serie, states, blockIndex) => {
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


  // reset filter 11
  // set serie_element, state
  onResetFilter11 = (serie_element, states, blockIndex) => {
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
    let { yearsInfo, isYearsMultiple, priority, filters, blockIndex } = this.state
    let runQuery = ''
    if (priority.indexOf('year') < 0) {
      priority.push('year')
    }
    yearsInfo[index].checked = !yearsInfo[index].checked
    if (!isYearsMultiple) {
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
      if (isYearsMultiple) {
        runQuery = 'ytDLAnalysis'
      } else {
        runQuery = 'yAnalysis'
      }
    }
    this.setState({
      filters,
      priority: priority,
      yearsInfo: yearsInfo.slice(),
      selectedYears: selectedYears,
      runQuery: runQuery
    })
  }

  // state selected
  onSelectState = (index) => {
    let { statesInfo, isYearsMultiple, priority, filters, blockIndex } = this.state
    let runQuery = ''
    if (priority.indexOf('state') < 0) {
      priority.push('state')
    }
    let selectedStates = []
    let selectedStateNames = []
    statesInfo[index].checked = !statesInfo[index].checked
    if (isYearsMultiple) {
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
      if (isYearsMultiple) {
        runQuery = 'tAnalysis'
      } else {
        runQuery = 'ytDLAnalysis'
      }
    }
    this.setState({
      filters,
      selectedStateNames,
      priority: priority,
      statesInfo: statesInfo.slice(),
      selectedStates: selectedStates,
      runQuery: runQuery
    })
  }
  
  onSelectAnalysis = () => {
    let {filters, isYearsMultiple} = this.state
    const blockIndex = 1
    filters[blockIndex].report_num = [1]
    filters[blockIndex].subject_num = [1]

    const yearCount = isYearsMultiple ? defaultYearCount : 1
    
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

    this.setState({
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

    let {isYearsMultiple} = this.state
    const yearCount = isYearsMultiple ? defaultYearCount : 1
    
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

    this.setState({
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
    
    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytDLAnalysis'
    })
  }

  onSleectDataLine = (topic_abb, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].topic_abb = topic_abb
    this.setState({
      filters: filters,
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

    this.setState({
      filters: filters,
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

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytsAnalysis'
    })
  }

  onSelectAnalysisSubFilter1 = (serie_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie_element = serie_element
    filters[blockIndex].serie2 = []
    filters[blockIndex].serie2_element = []

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytseAnalysis'
    })
  }

  onSelectAnalysisFilter2 = (serie2, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie2 = serie2
    filters[blockIndex].serie2_element = []

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytsesAnalysis'
    })
  }

  onSelectAnalysisSubFilter2 = (serie2_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie2_element = serie2_element

    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: ''
    })
  }

  // Add Datasource
  addDataSource = () => {
    let {filters} = this.state

    const obj = {}
    obj.report_num = [1]
    obj.subject_num = [1]
    obj.serie = []
    obj.serie_element = []
    obj.serie2 = []
    obj.serie2_element = []
    obj.topic_abb  = []
    filters.push(obj)

    const runQuery = 'initAnalysis'

    this.setState({filters, runQuery})
  }
  
  onSwitchMultiple = () => {
    let { 
      isYearsMultiple,
      selectedYears,
      selectedStates,
      selectedStateNames,
      yearsInfo,
      statesInfo,
      blockIndex
    } = this.state

    if (isYearsMultiple === true) {
      selectedYears = [selectedYears[0]]
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
    if (blockIndex !== 0) {
      runQuery = 'ytDLAnalysis'
    } 
    this.setState({ 
      isYearsMultiple: !isYearsMultiple,
      selectedYears: selectedYears.slice(),
      selectedStates: selectedStates.slice(),
      selectedStateNames: selectedStateNames.slice(),
      yearsInfo,
      statesInfo,
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
      isYearsMultiple,
      filters,
      runQuery,
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
    let sortedYears = yearsInfo.sort(function(a, b){return parseInt(b.year, 10) - parseInt(a.year, 10)})
    return (
      <Grid>
        <Sidebar
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
          onResetFilter = {this.onResetFilter}
          onStaticSelect = {this.onStaticSelect}
          onResetFilter1 = {this.onResetFilter1}
          onResetFilter2 = {this.onResetFilter2}
          onResetFilter3 = {this.onResetFilter3}
          onResetFilter4 = {this.onResetFilter4}
          onResetFilter5 = {this.onResetFilter5}
          onResetFilter6 = {this.onResetFilter6}
          onResetFilter7 = {this.onResetFilter7}
          onResetFilter8 = {this.onResetFilter8}
          onResetFilter9 = {this.onResetFilter9}
          onResetFilter10 = {this.onResetFilter10}
          onResetFilter11 = {this.onResetFilter11}
          onSelectReportFilter = {this.onSelectReportFilter}
          onSelectSubjectFilter = {this.onSelectSubjectFilter}
          onSelectFilterByFilter = {this.onSelectFilterByFilter}
          onSelectSubFilterByFilter = {this.onSelectSubFilterByFilter}
          onSelectAnalysis = {this.onSelectAnalysis}
          onResetYearAnalysis = {this.onResetYearAnalysis}
          onResetStateAnalysis = {this.onResetStateAnalysis}
          onSelectAnalysisFilter1 = {this.onSelectAnalysisFilter1}
          onSelectAnalysisSubFilter1 = {this.onSelectAnalysisSubFilter1}
          onSelectAnalysisFilter2 = {this.onSelectAnalysisFilter2}
          onSelectAnalysisSubFilter2 = {this.onSelectAnalysisSubFilter2}
          onSelectDatasource = {this.onSelectDatasource}
          onSleectDataLine = {this.onSleectDataLine}
          onSelectAnalysisFarm = {this.onSelectAnalysisFarm}
        />
        <Col xs={12} md={9} sm={12}>
          <h4 className="main-heading">
            {blockIndex > 0 ? 'ARMS Data Analysis' : 'Tailored Reports'}
          </h4>
          <FilterDropdown 
            yearsInfo={sortedYears} 
            statesInfo={statesInfo} 
            onSelectYear={this.onSelectYear} 
            onSelectState={this.onSelectState}
            onSwitchMultiple={this.onSwitchMultiple}
            isYearsMultiple={isYearsMultiple}          
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
            isYearsMultiple={isYearsMultiple}          
          />        
          <Footnote />
        </Col>  
      </Grid>
    )
  }
}

