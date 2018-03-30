import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';
// import { filter, concatSeries } from 'async';

const defaultYears = [2015, 2014, 2013, 2012, 2011]
const default_filter = {
  report_num: [],
  subject_num: [],
  serie: [],
  serie_element: [],
  serie2: ['farm'],
  serie2_element: [0],
  topic_abb: [],
  selectedYears: defaultYears,
  selectedStates: ['00'],
}

export default class Layout extends React.Component {
  state = {
    selectedStateNames: ['All survey states'],
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

    let {filters} = this.state
    const obj = {}
    obj.report_num = []
    obj.subject_num = []
    obj.serie = []
    obj.serie_element = []
    obj.serie2 = ["farm"]
    obj.serie2_element = [0]
    obj.topic_abb  = []
    filters.push(obj)
    const obj1 = {}
    obj1.report_num = []
    obj1.subject_num = []
    obj1.serie = []
    obj1.serie_element = []
    obj1.serie2 = []
    obj1.serie2_element = []
    obj1.topic_abb  = []
    filters.push(obj1)

    this.setState({filters})
  }

  componentWillReceiveProps(props) {

    let {yearsInfo, statesInfo, filters, blockIndex, selectedStates, selectedYears} = this.state

    if (props.years &&  yearsInfo.length === 0) {
      props.years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          if (defaultYears.indexOf(year) >= 0) {
            infoObj.checked = true
          } else {
            infoObj.checked = false
          }          
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
      selectedYears = [props.years[0]]
    }

    if (props.states && statesInfo.length === 0) {
      props.states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false     
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
      selectedStates = [props.states[0].id]
    }

    const topicabb = []
    if (props.topics) {
      props.topics[0].forEach(topic => {
        topicabb.push(topic.abb)
      })
    }

    if (filters[blockIndex].topic_abb.length === 0) {
      filters[blockIndex].topic_abb = topicabb
    }

    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      topic_abb: topicabb,
      filters: filters
    })    
  }

  // static filter [report, subject] selected in `tailored report`
  // run query to refresh [serie, year, state]
  onStaticSelect = (report_num, subject_num) => {
    let {filters, blockIndex} = this.state

    filters[blockIndex].report_num = [report_num]
    filters[blockIndex].subject_num = [subject_num]
    this.setState({
      filters,
      priority: [],
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
  onResetFilter1 = (serie, years, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie = [serie]

    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      runQuery: 'tysQuery'
    })
  }

  // resest filter 2
  // set sereie_element
  onResetFilter2 = (serie_element) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = serie_element    

    this.setState({
      filters: filters,
      runQuery: ''
    })
  }

  // reset filter 3
  // set serie_element, year, state
  onResetFilter3 = (serie_element, years, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = serie_element

    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
      selectedYears,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      runQuery: ''
    })

  }

  // reset filter 4
  // set year, state
  onResetFilter4 = (years, states) => {

    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }

    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      selectedStates: selectedStates,
      statesInfo: statesInfo,
      runQuery: ''
    })

  }

  // reset filter 5
  // set year
  onResetFilter5 = (years) => {

    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: ''
    })

  }

  // reset filter 6
  // set state
  onResetFilter6 = (states) => {

    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }

    this.setState({
      selectedStates: selectedStates,
      statesInfo: statesInfo,
      runQuery: ''
    })

  }

  // reset filter 7 
  // run query to refresh [serie_element]
  onResetFilter7 = (serie, years) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie = [serie]

    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: 'tysQuery'
    })
  }

  // reset filter 8
  // set serie
  onResetFilter8 = (serie) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie = [serie]

    this.setState({
      filters: filters,
      runQuery: 'tysQuery'
    })
  }

  // reset filter 9
  // set serie_element, year
  onResetFilter9 = (serie_element, years) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = serie_element

    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: ''
    })
  }

  // reset filter 10
  // set serie, state
  onResetFilter10 = (serie, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie = [serie]

    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }

    this.setState({
      filters: filters,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      runQuery: 'tysQuery'
    })
  }


  // reset filter 11
  // set serie_element, state
  onResetFilter11 = (serie_element, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = serie_element

    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }

    this.setState({
      filters: filters,
      statesInfo: statesInfo,
      selectedStates: selectedStates,
      runQuery: ''
    })
  }

  // report_num selected
  onSelectReportFilter = (report_num, topic_abb) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].report_num = report_num
    filters[blockIndex].topic_abb = topic_abb
    this.setState({
      filters: filters,
      runQuery: 'reset1Query'
    })
  }

  // subject_num selected
  onSelectSubjectFilter = (subject_num) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].subject_num = subject_num
    this.setState({
      filters: filters,
      runQuery: 'resetQuery'
    })
  }

  // serie selected
  onSelectFilterByFilter = (serie) => {
    let {filters, blockIndex, priority} = this.state
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
      priority: priority,
      runQuery: runQuery
    })
  }

  // serie_element selected
  onSelectSubFilterByFilter = (serie_element) => {
    let {filters, blockIndex, priority} = this.state
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
        runQuery = 'yAnalysis'
      } else {
        runQuery = 'ytDLAnalysis'
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
        runQuery = 'ytDLAnalysis'
      } else {
        runQuery = 'tAnalysis'
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
  
  onSelecetAnalysis = () => {
    let {filters} = this.state
    const blockIndex = 1
    filters[blockIndex].report_num = [1]
    filters[blockIndex].subject_num = [1]
    
    let yearsInfo = []
    let selectedYears = []

    if (this.props.years) {
      this.props.years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false

          yearsInfo.push(infoObj)
      })
      yearsInfo[this.props.years.length-1].checked = true
      selectedYears = [this.props.years[0]]
    }
    
    let statesInfo = []
    let selectedStates = []

    if (this.props.states) {
      this.props.states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false     
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
      selectedStates = [this.props.states[0].id]
    }

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
      filters: filters,
      runQuery: 'initAnalysis',
      blockIndex
    })
  }

  onResetYearAnalysis = (years) => {
    
    let yearsInfo = []
    const selectedYears = [years[0]]
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[0].checked = true
    }

    this.setState({
      yearsInfo: yearsInfo,
      selectedYears: selectedYears,
      runQuery: 'ytDLAnalysis'
    })
  }

  onResetStateAnalysis = (states) => {
    let statesInfo = []
    const selectedStates = [states[0].id]
    if (states.length !== 0) {
      states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        obj.checked = false      
        statesInfo.push(obj)     
      })
      statesInfo[0].checked = true
    }
    this.setState({
      statesInfo: statesInfo,
      selectedStates: selectedStates,
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
      runQuery: 'ytDLAnalysis'
    })
  }


  onSelectAnalysisFarm = (subject_num, blockIndex) => {
    let {filters} = this.state

    filters[blockIndex].subject_num = subject_num
    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytDLFAnalysis'
    })
  }


  onSelectAnalysisFilter1 = (serie, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie = serie
    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytsAnalysis'
    })
  }

  onSelectAnalysisSubFilter1 = (serie_element, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie_element = serie_element
    this.setState({
      filters: filters,
      blockIndex: blockIndex,
      runQuery: 'ytseAnalysis'
    })
  }

  onSelectAnalysisFilter2 = (serie2, blockIndex) => {
    let {filters} = this.state
    filters[blockIndex].serie2 = serie2
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
    let serie1 = []
    let serie1_element = []
    if (filters[blockIndex]){
      if (filters[blockIndex].serie_element.length > 1){
        serie1_element = [0]
        serie1 = ['farm']
      } else {
        serie1 = filters[blockIndex].serie
        serie1_element = filters[blockIndex].serie_element
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
          onSelecetAnalysis = {this.onSelecetAnalysis}
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
            serie = {serie1}
            serie_element = {serie1_element}
            serie2 = {filters[blockIndex] ? filters[blockIndex].serie2 : []}
            serie2_element = {filters[blockIndex] ? filters[blockIndex].serie2_element : []}
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

