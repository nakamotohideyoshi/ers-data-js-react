import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
import FilterDropdown from '../../components/FilterDropdown';
import { Col } from 'react-bootstrap';
import Footnote from '../Footnote';
// import { filter, concatSeries } from 'async';

const default_filter = {
  report_num: [],
  subject_num: [],
  serie: [],
  serie_element: [],
  serie2: ['farm'],
  serie2_element: [0],
  topic_abb: [],
  selectedYears: [2015, 2014],
  selectedStates: ['00'],
}

export default class Layout extends React.Component {
  state = {
    selectedStateNames: ['All survey states'],
    isYearsMultiple: true,     
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: [],
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
    obj.selectedYears = []
    obj.selectedStates = []
    filters.push(obj)

    this.setState({filters})
  }

  componentWillReceiveProps(props) {

    let {yearsInfo, statesInfo, filters, blockIndex} = this.state

    if (props.years &&  yearsInfo.length === 0) {
      props.years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          if (year === 2014 || year === 2015) {
            infoObj.checked = true
          } else {
            infoObj.checked = false
          }          
          yearsInfo.push(infoObj)
      })
    }

    if (props.states && statesInfo.length === 0) {
      props.states.forEach(stateN => {
        const obj = {}
        obj.name = stateN.name
        obj.id = stateN.id
        if (stateN.id === '00') {
          obj.checked = true
        } else {
          obj.checked = false
        }        
        statesInfo.push(obj)     
      })
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
      statesInfo: statesInfo,
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
    this.setState({
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
    filters[blockIndex].selectedYears = years.slice(-1)
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[years.length-1].checked = true
    }

    let statesInfo = []
    filters[blockIndex].selectedStates = [states[0].id]
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
      statesInfo: statesInfo,
      runQuery: 'tysQuery'
    })
  }

  // resest filter 2
  // set sereie_element
  onResetFilter2 = (serie_element) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = [serie_element]    

    this.setState({
      filters: filters,
      runQuery: ''
    })
  }

  // reset filter 3
  // set serie_element, year, state
  onResetFilter3 = (serie_element, years, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = [serie_element]

    let yearsInfo = []
    filters[blockIndex].selectedYears = years.slice(-1)
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[years.length-1].checked = true
    }

    let statesInfo = []
    filters[blockIndex].selectedStates = [states[0].id]
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
      statesInfo: statesInfo,
      runQuery: ''
    })

  }

  // reset filter 4
  // set year, state
  onResetFilter4 = (years, states) => {
    let {filters, blockIndex} = this.state

    let yearsInfo = []
    filters[blockIndex].selectedYears = years.slice(-1)
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[years.length-1].checked = true
    }

    let statesInfo = []
    filters[blockIndex].selectedStates = [states[0].id]
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
      statesInfo: statesInfo,
      runQuery: ''
    })

  }

  // reset filter 5
  // set year
  onResetFilter5 = (years) => {
    let {filters, blockIndex} = this.state

    let yearsInfo = []
    filters[blockIndex].selectedYears = years.slice(-1)
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[years.length-1].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
      runQuery: ''
    })

  }

  // reset filter 6
  // set state
  onResetFilter6 = (states) => {
    let {filters, blockIndex} = this.state

    let statesInfo = []
    filters[blockIndex].selectedStates = [states[0].id]
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
      runQuery: ''
    })

  }

  // reset filter 7 
  // run query to refresh [serie_element]
  onResetFilter7 = (serie, years) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie = [serie]

    let yearsInfo = []
    filters[blockIndex].selectedYears = years.slice(-1)
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[years.length-1].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
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
    filters[blockIndex].serie_element = [serie_element]

    let yearsInfo = []
    filters[blockIndex].selectedYears = years.slice(-1)
    if (years.length !== 0) {
      years.forEach(year => {
        const infoObj = {}
          infoObj.year = year
          infoObj.checked = false        
          yearsInfo.push(infoObj)
      })
      yearsInfo[years.length-1].checked = true
    }

    this.setState({
      filters: filters,
      yearsInfo: yearsInfo,
      runQuery: ''
    })
  }

  // reset filter 10
  // set serie, state
  onResetFilter10 = (serie, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie = [serie]

    let statesInfo = []
    filters[blockIndex].selectedStates = [states[0].id]
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
      runQuery: 'tysQuery'
    })
  }


  // reset filter 11
  // set serie_element, state
  onResetFilter11 = (serie_element, states) => {
    let {filters, blockIndex} = this.state
    filters[blockIndex].serie_element = [serie_element]

    let statesInfo = []
    filters[blockIndex].selectedStates = [states[0].id]
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
      runQuery: 'resetQuery'
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
      runQuery = 'tysQuery'
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
    filters[blockIndex].selectedYears = selectedYears
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
    this.setState({
      filters,
      priority: priority,
      yearsInfo: yearsInfo.slice(),
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
    
    filters[blockIndex].selectedStates = selectedStates

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
    this.setState({
      filters,
      selectedStateNames,
      priority: priority,
      statesInfo: statesInfo.slice(),
      runQuery: runQuery
    })
  }

  // onSelectArmsFilter = (report_num, topic_abb, subject_num, serie, blockIndex) => {
  //   this.setState({
  //     report_num: report_num,
  //     topic_abb: topic_abb,
  //     subject_num: subject_num,
  //     serie: serie,
  //     blockIndex: blockIndex
  //   })
  // }


  // onSleectSubFilter1 = (report_num, topic_abb, subject_num, serie, serie_element, blockIndex) => {
  //   this.setState({
  //     report_num: report_num,
  //     topic_abb: topic_abb,
  //     subject_num: subject_num,
  //     serie: serie, serie_element:
  //     serie_element,
  //     blockIndex: blockIndex
  //   })
  // }

  // onSelectFilter2 = (report_num, topic_abb, subject_num, serie, serie_element, serie2, blockIndex) => {
  //   this.setState({
  //     report_num: report_num,
  //     topic_abb: topic_abb,
  //     subject_num: subject_num,
  //     serie: serie,
  //     serie_element: serie_element,
  //     serie2: serie2,
  //     blockIndex: blockIndex
  //   })
  // }

  // onSelectSubFilter2 = (report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element, blockIndex) => {
  //   this.setState({
  //     report_num: report_num,
  //     topic_abb: topic_abb,
  //     subject_num: subject_num,
  //     serie: serie,
  //     serie_element: serie_element,
  //     serie2: serie2,
  //     serie2_element: serie2_element,
  //     blockIndex: blockIndex
  //   })
  // }

  // onSelectReportFilter = (report_num, topic_abb, subject_num, serie) => {
  //   this.setState({
  //     report_num: report_num,
  //     topic_abb: topic_abb,
  //     subject_num: subject_num,
  //     serie: serie,
  //     blockIndex: 0
  //   })
  // }

  // onSelectSubFilterBy = (filter_element) => {
  //   this.setState({
  //     serie_element: filter_element,
  //     blockIndex: 0
  //   })
  // }
 
  // onSelectCategory = (isReport) => {
  //   const report_num = default_filter.report_num
  //   const subject_num = default_filter.subject_num
  //   const serie = default_filter.serie
  //   const serie_element = default_filter.serie_element
  //   const topic_abb = [] 
  //   const serie2 = default_filter.serie2
  //   const serie2_element = default_filter.serie2_element
  //   let blockIndex = 0

  //   if (isReport) {
  //     this.props.topics[0].forEach(topic => {
  //       topic_abb.push(topic.abb)
  //     })     
      
  //   } else {
  //     topic_abb.push(this.props.topics[0][0].abb)
  //     blockIndex = 1      
  //   }

  //   this.setState({
  //     report_num: report_num,
  //     subject_num: subject_num,
  //     serie: serie,
  //     serie_element: serie_element,
  //     serie2: serie2,
  //     serie2_element: serie2_element,
  //     topic_abb: topic_abb,
  //     blockIndex: blockIndex
  //   })
  // }

  
  onSwitchMultiple = () => {
    let { 
      isYearsMultiple,
      selectedYears,
      selectedStates,
      selectedStateNames,
      yearsInfo,
      statesInfo
    } = this.state

    if (isYearsMultiple === true) {
      selectedYears = selectedYears.slice(0, 1)
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
    this.setState({ 
      isYearsMultiple: !isYearsMultiple,
      selectedYears: selectedYears.slice(),
      selectedStates: selectedStates.slice(),
      selectedStateNames: selectedStateNames.slice(),
      yearsInfo,
      statesInfo
    })
    
  }
  render() {
    console.log('%%%%%%%%%%%%', this.state, '%%%%%%%%%%%')
    const {
      selectedStateNames,
      blockIndex, 
      yearsInfo, 
      statesInfo,
      isYearsMultiple,
      filters,
      runQuery
    } = this.state
    return (
      <Grid>
        <Sidebar
          topics = {this.props.topics}
          reports = {this.props.reports}
          subjects = {this.props.subjects}
          report_num = {filters[blockIndex] ? filters[blockIndex].report_num : []}
          subject_num = {filters[blockIndex] ? filters[blockIndex].subject_num : []}
          serie = {filters[blockIndex] ? filters[blockIndex].serie : []}
          serie_element={filters[blockIndex] ? filters[blockIndex].serie_element : []}
          serie2 = {filters[blockIndex] ? filters[blockIndex].serie2 : []}
          serie2_element = {filters[blockIndex] ? filters[blockIndex].serie2_element : []}
          selectedStates = {filters[blockIndex] ? filters[blockIndex].selectedStates : []}
          selectedYears={filters[blockIndex] ? filters[blockIndex].selectedYears : []}
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
        />
        <Col xs={12} md={9} sm={12}>
          <h4 className="main-heading">Farm Business Balance Sheet Data 
          </h4>
          <FilterDropdown 
            yearsInfo={yearsInfo} 
            statesInfo={statesInfo} 
            onSelectYear={this.onSelectYear} 
            onSelectState={this.onSelectState}
            onSwitchMultiple={this.onSwitchMultiple}
            isYearsMultiple={isYearsMultiple}          
          />
          <MainContainer
            selectedStates = {filters[blockIndex] ? filters[blockIndex].selectedStates : []}
            selectedStateNames = {selectedStateNames}
            selectedYears={filters[blockIndex] ? filters[blockIndex].selectedYears : []}
            report_num = {filters[blockIndex] ? filters[blockIndex].report_num : []}
            subject_num = {filters[blockIndex] ? filters[blockIndex].subject_num : []}
            serie = {filters[blockIndex] ? filters[blockIndex].serie : []}
            serie_element = {filters[blockIndex] ? filters[blockIndex].serie_element : []}
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

