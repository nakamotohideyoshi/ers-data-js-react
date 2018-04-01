import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'
import armsfilter from '../../ApolloComponent/armsQuery'
// import { selectLimit } from 'async';
import resetQuery from '../../ApolloComponent/resetQuery'
import reset1Query from '../../ApolloComponent/reset1Query'
import sQuery from '../../ApolloComponent/sQuery'
import seQuery from '../../ApolloComponent/seQuery'
import setQuery from '../../ApolloComponent/setQuery'
import seyQuery from '../../ApolloComponent/seyQuery'
import tQuery from '../../ApolloComponent/tQuery'
import tsQuery from '../../ApolloComponent/tsQuery'
import tyQuery from '../../ApolloComponent/yQuery'
import tysQuery from '../../ApolloComponent/tysQuery'
import yQuery from '../../ApolloComponent/yQuery'
import ysQuery from '../../ApolloComponent/ysQuery'
import initAnalysis from '../../ApolloComponent/initAnalysis'
import yAnalysis from '../../ApolloComponent/yAnalysis'
import tAnalysis from '../../ApolloComponent/tAnalysis'
import ytDLAnalysis from '../../ApolloComponent/ytDLAnalysis'
import ytDLFAnalysis from '../../ApolloComponent/ytDLFAnalysis'
import ytsAnalysis from '../../ApolloComponent/ytsAnalysis'
import ytseAnalysis from '../../ApolloComponent/ytseAnalysis'
import ytsesAnalysis from '../../ApolloComponent/ytsesAnalysis'
import { compose } from 'react-apollo'



let isReports = true
let currentBlock =  0

class Sidebar extends React.Component {

  state = {
    isCategoryOpened: false,
    sidebarItems: [],
    categoryTitles: [],
    blockCount: 0,
    isSubFilterBy: false,
    isArmsFilter: []    
  }  
  
  componentWillReceiveProps(props) {
    console.log('****************', props, '****************')
    let {categoryTitles, sidebarItems, blockCount, isSubFilterBy, isArmsFilter} = this.state

    if (categoryTitles.length === 0) {

      // initial loading
     if (props.reports.length !== 0) {
       // `tailored report`
      currentBlock = 0
            
      // generate static LHS menu
      categoryTitles.push([
        {num: 0, header: 'Tailored Reports'},
        { num: 1, header: 'ARMS Data Analysis'}
      ])
      sidebarItems.push({
        isOpened: false,
        selectedIndex: 0,
        isCategory: true,
        blockIndex: currentBlock,
        visible: true,  headingTitle: ''
      })
      const report_num = props.reports[0].num
      let reports = []
      props.reports.forEach(report => {
        const obj = {}
        obj.num = report.num
        obj.header = report.header
        reports.push(obj)
      })
      categoryTitles.push(reports)
      sidebarItems.push({
        isOpened: false,
        selectedIndex: 0,
        isCategory: false,
        blockIndex: currentBlock,
        visible: true,
        headingTitle: 'Report'
      })

      const subject_num = props.subjects[0].num
      let subjects = []
      props.subjects.forEach(subject => {
        const obj = {}
        obj.num = subject.num
        obj.header = subject.header
        subjects.push(obj)
      })
      categoryTitles.push(subjects)
      sidebarItems.push({
        isOpened: false,
        selectedIndex: 0,
        isCategory: false,
        blockIndex: currentBlock,
        visible: true,
        headingTitle: 'Subject'
      })

      // get dynamic filter [Serie, Year, State]
      this.setState({
        categoryTitles: categoryTitles,
        sidebarItems: sidebarItems
      }, this.props.onStaticSelect(report_num, subject_num))

     }

    } else if (categoryTitles.length !== 0 && currentBlock === 0) {

      if (props.runQuery === 'reset1Query') {

        // click subject filter
        if ((props.reset1Query.networkStatus === 1 || props.reset1Query.networkStatus ===7) && props.reset1Query.arms_filter) {
          // generate `subject` LHS menu
          let subjects = []
          const subject_num = [props.reset1Query.arms_filter.subject[0].num]
          props.reset1Query.arms_filter.subject.forEach(subject => {
            const obj = {}
            obj.num = subject.num
            obj.header = subject.header
            subjects.push(obj)
          })
          if (categoryTitles.length<3) {
            categoryTitles.push(subjects)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Subject'
            })
          } else {
            categoryTitles[2] = subjects
            sidebarItems[2] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Subject'
            }
          }
          
          // update subject
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectSubjectFilter(subject_num))
        }        
      } else if (props.runQuery === 'resetQuery') {

        // click reset or static filter updated
        if ((props.resetQuery.networkStatus
          === 1 || props.resetQuery.networkStatus
          === 7) && props.resetQuery.arms_filter) {
          // generate `Filter By` LHS menu
          let series = []
          const serie = [props.resetQuery.arms_filter.serie[0].abb]
          props.resetQuery.arms_filter.serie.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series.push(obj)
          })
          if (categoryTitles.length<4) {
            categoryTitles.push(series)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            }
          }
          
          // update [Year, State] list, and get Serie_element
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter1(serie, props.resetQuery.arms_filter.year, props.resetQuery.arms_filter.state, currentBlock))
        }        
      } else if (props.runQuery === 'tysQuery') {

        // update `Filter By/Sub` LHS menu
        if ((props.tysQuery.networkStatus
          === 1 || props.tysQuery.networkStatus
          === 7) && props.tysQuery.arms_filter) {
          let series_element = [{
            num: 0,
            header: 'All'
          }]
          let serie_element = []
          props.tysQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
            serie_element.push(element.id)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            }
          }
          sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
          if (props.tysQuery.arms_filter.serie_element.length === 1 && props.tysQuery.arms_filter.serie_element[0].id === 0) {
            sidebarItems[4].visible = false
          }
          
          // update serie_element filter
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter2(serie_element))
        }   
             
      } else if (props.runQuery === 'sQuery') {

        // Serie -> 
        if ((props.sQuery.networkStatus === 1 || props.sQuery.networkStatus === 7)  && props.sQuery.arms_filter) {
          let series_element = [{
            num: 0,
            header: 'All'
          }]
          let serie_element = []

          // generate `Filter By/Sub` LHS menu
          props.sQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
            serie_element.push(element.id)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            }
          }
          sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
          if (props.sQuery.arms_filter.serie_element.length === 1 && props.sQuery.arms_filter.serie_element[0].id === 0) {
            sidebarItems[4].visible = false
          }
          
          // update serie_element, [Year, State] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter3(serie_element, props.sQuery.arms_filter.year, props.sQuery.arms_filter.state))
        }

      } else if (props.runQuery === 'seQuery') {

        // Serie/Serie_element -> 
        if ((props.seQuery.networkStatus === 1 || props.seQuery.networkStatus === 7) && props.seQuery.arms_filter) {
          // update [Year, State] list              
          this.props.onResetFilter4(props.seQuery.arms_filter.year, props.seQuery.arms_filter.state)
        }   

      } else if (props.runQuery === 'setQuery') {

        // Serie/Serie_element -> State
        if ((props.setQuery.networkStatus === 1 || props.setQuery.networkStatus === 7) && props.setQuery.arms_filter) {
          // Update [year] list       
          this.props.onResetFilter5(props.setQuery.arms_filter.year)
        }  

      } else if (props.runQuery === 'seyQuery') {

        // Serie/Serie_element -> Year
        if ((props.seyQuery.networkStatus === 1 || props.seyQuery.networkStatus === 7) && props.seyQuery.arms_filter) {
           // Update [State] list       
          this.props.onResetFilter6(props.seyQuery.arms_filter.state)
        }  

      } else if (props.runQuery === 'tQuery') {

        // State - > 
        if ((props.tQuery.networkStatus === 1 || props.tQuery.networkStatus ===7) && props.tQuery.arms_filter) {
          let series = []
          const serie = props.tQuery.arms_filter.serie[0].abb

          // Generate `Filter By` LHS menu
          props.tQuery.arms_filter.serie.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series.push(obj)
          })
          if (categoryTitles.length<4) {
            categoryTitles.push(series)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            }
          } 
          
          // update serie, [Year] list , get serie_element
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter7(serie, props.tQuery.arms_filter.year))
        }

      } else if (props.runQuery === 'tyQuery') {
        // State -> Year
        if ((props.tyQuery.networkStatus === 1 || props.tyQuery.networkStatus === 7) && props.tyQuery.arms_filter) {
          let series = []
          const serie = props.tQuery.arms_filter.serie[0].abb

          // Generate `Filter By` LHS menu
          props.tyQuery.arms_filter.serie.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series.push(obj)
          })
          if (categoryTitles.length<4) {
            categoryTitles.push(series)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            }
          }
          
          // update serie, and get serie_element
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter8(serie))
        }

      } else if (props.runQuery === 'tsQuery') {
        // State -> Serie
        if ((props.tsQuery.networkStatus === 1 || props.tsQuery.networkStatus === 7) && props.tsQuery.arms_filter) {
          let series_element = [{
            num: 0,
            header: 'All'
          }]

          // Generate `Filter By/Sub` LHS menu
          let serie_element = []
          props.tsQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
            serie_element.push(element.id)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            }
          }
          sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
          if (props.tsQuery.arms_filter.serie_element.length === 1 && props.tsQuery.arms_filter.serie_element[0].id === 0) {
            sidebarItems[4].visible = false
          }
          
          // update serie_element, and [Year] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter9(serie_element, props.tsQuery.arms_filter.year))
        }

      } else if (props.runQuery === 'yQuery') {
        // Year - > 
        if ((props.yQuery.networkStatus === 1 || props.yQuery.networkStatus ===  7) && props.yQuery.arms_filter) {
          let series = []
          const serie = props.yQuery.arms_filter.serie[0].abb

          // Generate `Filter By` LHS menu
          props.yQuery.arms_filter.serie.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series.push(obj)
          })
          if (categoryTitles.length<4) {
            categoryTitles.push(series)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter by'
            }
          }
          
          // update serie, [state] list, and get serie_element
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter10(serie, props.yQuery.arms_filter.state))
        }

      } else if (props.runQuery === 'ysQuery') {
        // Year -> Serie
        if ((props.ysQuery.networkStatus === 1 || props.ysQuery.networkStatus === 7) && props.ysQuery.arms_filter) {
          let series_element = [{
            num: 0,
            header: 'All'
          }]
          
          // Generate `Filter By/Sub` LHS menu
          let serie_element = []
          props.ysQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
            serie_element.push(element.id)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            }
          }
          sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
          if (props.ysQuery.arms_filter.serie_element.length === 1 && props.ysQuery.arms_filter.serie_element[0].id === 0) {
            sidebarItems[4].visible = false
          }
          // update serie_element, [state] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter11(serie_element, props.ysQuery.arms_filter.state))
        }

      }
    } else if (categoryTitles.length !== 0 && currentBlock !== 0) {
      if (props.runQuery === 'initAnalysis') {
        if ((props.initAnalysis.networkStatus === 1 || props.initAnalysis.networkStatus === 7) && props.initAnalysis.arms_filter) {
          
          let reports = []
          props.reports.forEach(report => {
            const obj = {}
            obj.num = report.num
            obj.header = report.header
            reports.push(obj)
          })

          const topics = []
          props.topics[0].forEach(topic => {
            const obj = {}
            obj.num = topic.abb
            obj.header = topic.header
            topics.push(obj)
          })
        
          let subjects = []
          props.subjects.forEach(subject => {
            const obj = {}
            obj.num = subject.num
            obj.header = subject.header
            subjects.push(obj)
          })

          let series = []
          const serie = [props.initAnalysis.arms_filter.serie[0].abb]
          props.initAnalysis.arms_filter.serie.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series.push(obj)
          })
          
          if (categoryTitles.length<6) {
            categoryTitles.push(reports)
            categoryTitles.push(topics)
            categoryTitles.push(subjects)
            categoryTitles.push(series)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Data Source'
            })
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Data Line'
            })
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Farm Type'
            })
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter1'
            })
          } else {
            categoryTitles[5] = reports
            categoryTitles[6] = topics
            categoryTitles[7] = subjects
            categoryTitles[8] = series
            sidebarItems[5] ={
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Data Source'
            }
            sidebarItems[6] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Data Line'
            }
            sidebarItems[7] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Farm Type'
            }
            sidebarItems[8] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter1'
            }
          }
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectAnalysisFilter1(serie, 1))

        }
      } else if (props.runQuery === 'yAnalysis') {
        if ((props.yAnalysis.networkStatus === 1 || props.yAnalysis.networkStatus === 7) && props.yAnalysis.arms_filter) {

          this.props.onResetStateAnalysis(props.yAnalysis.arms_filter.state)

        }
      } else if (props.runQuery === 'tAnalysis') {
        if ((props.tAnalysis.networkStatus === 1 || props.tAnalysis.networkStatus === 7) && props.tAnalysis.arms_filter) {

          this.props.onResetYearAnalysis(props.tAnalysis.arms_filter.year)

        }
      } else if (props.runQuery === 'ytDLAnalysis') {
        if ((props.ytDLAnalysis.networkStatus === 1 || props.ytDLAnalysis.networkStatus === 7) && props.ytDLAnalysis.arms_filter) {

          let subjects = []
          props.ytDLAnalysis.arms_filter.subject.forEach(subject => {
            const obj = {}
            obj.num = subject.num
            obj.header = subject.header
            subjects.push(obj)
          })

          const index = 7*(currentBlock-1) + 7
          categoryTitles[index] = subjects
          sidebarItems[index].isOpened = false
          sidebarItems[index].selectedIndex = 0            
          
          const subject_num = [props.ytDLAnalysis.arms_filter.subject[0].num]
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectAnalysisFarm(subject_num, currentBlock))

        }
      } else if (props.runQuery === 'ytDLFAnalysis') {
        if ((props.ytDLFAnalysis.networkStatus === 1 || props.ytDLFAnalysis.networkStatus === 7) && props.ytDLFAnalysis.arms_filter) {

          let series = []
          props.ytDLFAnalysis.arms_filter.serie.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series.push(obj)
          })

          const index = 7*(currentBlock-1) + 8
          categoryTitles[index] = series
          sidebarItems[index].isOpened = false
          sidebarItems[index].selectedIndex = 0            
          
          const serie = [props.ytDLFAnalysis.arms_filter.serie[0].abb]
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectAnalysisFilter1(serie, currentBlock))

        }
      } else if (props.runQuery === 'ytsAnalysis') {
        // Year -> Serie
        if ((props.ytsAnalysis.networkStatus === 1 || props.ytsAnalysis.networkStatus === 7) && props.ytsAnalysis.arms_filter) {
          let series_element = []
          
          // Generate `Filter By/Sub` LHS menu
          let serie_element = []
          props.ytsAnalysis.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
            serie_element.push(element.id)
          })
          const index = 7*(currentBlock-1) + 9
          if (categoryTitles.length < index+1) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: -1,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[index] = series_element
            sidebarItems[index] = {
              isOpened: false,
              selectedIndex: -1,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            }
          }
          sidebarItems[index].headingTitle = categoryTitles[index-1][sidebarItems[index-1].selectedIndex].header
          if (props.ytsAnalysis.arms_filter.serie_element.length === 1 && props.ytsAnalysis.arms_filter.serie_element[0].id === 0) {
            sidebarItems[index].visible = false
          }
          // update serie_element, [state] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectAnalysisSubFilter1(serie_element, currentBlock))
        }

      } else if (props.runQuery === 'ytseAnalysis') {
        if ((props.ytseAnalysis.networkStatus === 1 || props.ytseAnalysis.networkStatus === 7) && props.ytseAnalysis.arms_filter) {
          
          let series2 = []
          let serie2 = [props.ytseAnalysis.arms_filter.serie2[0].abb]
          props.ytseAnalysis.arms_filter.serie2.forEach(serie => {
            const obj = {}
            obj.num = serie.abb
            obj.header = serie.header
            series2.push(obj)
          })
          const index = 7*(currentBlock-1) + 10
          if (categoryTitles.length<index+1) {
            categoryTitles.push(series2)            
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter2'
            })
          } else {
            categoryTitles[index] = series2            
            sidebarItems[index] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: 'Filter2'
            }
          }
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectAnalysisFilter2(serie2, currentBlock))

        }
      } else if (props.runQuery === 'ytsesAnalysis') {
        // Year -> Serie
        if ((props.ytsesAnalysis.networkStatus === 1 || props.ytsesAnalysis.networkStatus === 7) && props.ytsesAnalysis.arms_filter) {
          let series2_element = []
          
          // Generate `Filter By/Sub` LHS menu
          let serie2_element = []
          props.ytsesAnalysis.arms_filter.serie2_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series2_element.push(obj)
            serie2_element.push(element.id)
          })
          const index = 7*(currentBlock-1) + 11
          if (categoryTitles.length < index+1) {
            categoryTitles.push(series2_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[index] = series2_element
            sidebarItems[index] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: currentBlock,
              visible: true,
              headingTitle: ''
            }
          }
          sidebarItems[index].headingTitle = categoryTitles[index-1][sidebarItems[index-1].selectedIndex].header
          if (props.ytsesAnalysis.arms_filter.serie2_element.length === 1 && props.ytsesAnalysis.arms_filter.serie2_element[0].id === 0) {
            sidebarItems[index].visible = false
          }
          // update serie_element, [state] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onSelectAnalysisSubFilter2(serie2_element, currentBlock))
        }

      }
    }
  }

  
  toggleCategoryOptions = (selectedItemIndex) => {    
    const { sidebarItems } =this.state    
    sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened       
    this.setState({ sidebarItems })
  }

  updateFilter = (sidebarItemIndex, selectedIndex) => {

    const { sidebarItems, categoryTitles} =this.state

    // current Block index
    currentBlock = sidebarItems[sidebarItemIndex].blockIndex

    sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex

    if (sidebarItemIndex === 0) {

      // Category
      const count = sidebarItems.length
      for (let i = 1; i<count; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0  
        sidebarItems[i].isOpened = false
      }
      if (selectedIndex === 0) {
        // Tailored Report
        currentBlock = 0
        isReports = true
        
        sidebarItems[1].visible = true
        sidebarItems[2].visible = true
       
        this.setState({sidebarItems}, this.props.onResetFilter())        
      } else {
        // Arms Data Analaysis      
        currentBlock = 1
        this.props.onSelecetAnalysis()
        isReports = false
      }
    } else {

      if (sidebarItemIndex === 1) {

        // Tailored Report/Report
        const report_num = []
        const topic_abb = []
        report_num.push(categoryTitles[1][sidebarItems[1].selectedIndex].num)
        this.props.topics[sidebarItems[1].selectedIndex].forEach(topic => {
          topic_abb.push(topic.abb)
        })
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectReportFilter(report_num, topic_abb))

      } else if (sidebarItemIndex === 2) {

        // Tailored Report/Subject
        const subject_num = []
        subject_num.push(categoryTitles[2][sidebarItems[2].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubjectFilter(subject_num))

      } else if (sidebarItemIndex === 3) {

        // Tailored Report/Filter By
        const serie = []
        serie.push(categoryTitles[3][sidebarItems[3].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectFilterByFilter(serie))

      } else if (sidebarItemIndex === 4) {

        // Tailoared Reort/Sub Filter By
        const serie_element = []
        if (selectedIndex !== 0) {
          serie_element.push(categoryTitles[4][sidebarItems[4].selectedIndex].num)
        } else {
          for (let i = 1; i<categoryTitles[4].length; i++) {
            serie_element.push(categoryTitles[4][i].num)
          }
        }        
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubFilterByFilter(serie_element))

      } else if ((sidebarItemIndex - 5)%7===0){
        
        // Arms Data Analaysis/Data Source
        const report_num = []
        const topic_abb = []

        report_num.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)

        sidebarItems[sidebarItemIndex+1].selectedIndex=0
        sidebarItems[sidebarItemIndex+1].isOpened = false

        topic_abb.push(this.props.topics[sidebarItems[sidebarItemIndex].selectedIndex][0].abb)

        let topics = []
        this.props.topics[sidebarItems[sidebarItemIndex].selectedIndex].forEach(topic => {
          const obj = {}
          obj.num = topic.abb
          obj.header = topic.header
          topics.push(obj)
        })
        categoryTitles[sidebarItemIndex+1] = topics

        this.setState({sidebarItems, categoryTitles}, this.props.onSelectDatasource(report_num, topic_abb, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===1){

        // Arms Data Analysis/Data Line
        const topic_abb = []

        topic_abb.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)

        this.setState({sidebarItems, categoryTitles}, this.props.onSleectDataLine(topic_abb, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===2){

        // Arms Data Analaysis/Farm Type
        const subject_num = []

        subject_num.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectAnalysisFarm(subject_num, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===3){

        // Arms Data Analysis/Filter1
        const serie = []
        serie.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectAnalysisFilter1(serie, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===4){

        // Arms Data Analaysis/Sub Filter1
        const serie_element = []

        serie_element.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectAnalysisSubFilter1(serie_element, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===5){

        // Arms Data Analysis/Filter2
        const serie2 = []
        serie2.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectAnalysisFilter2(serie2, currentBlock))
      } else if ((sidebarItemIndex - 5)%7===6){

        // Arms Data Analysis/Sub Filter2
        const serie2_element = []

        serie2_element.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectAnalysisSubFilter2(serie2_element, currentBlock))

      }

      // if (sidebarItemIndex>=1 && sidebarItemIndex<=4) {
      //   report_num.push(categoryTitles[1][sidebarItems[1].selectedIndex].num)
      //   this.props.topics[sidebarItems[1].selectedIndex].forEach(topic => {
      //     topic_abb.push(topic.abb)
      //   })
      //   subject_num.push(categoryTitles[2][sidebarItems[2].selectedIndex].num)
      //   serie.push(categoryTitles[3][sidebarItems[3].selectedIndex].num)
      //   if (sidebarItemIndex !== 4) {
      //     this.setState({sidebarItems, categoryTitles, isSubFilterBy: true}, () => this.props.onSelectReportFilter(report_num, topic_abb, subject_num, serie))
      //   } else {
      //     serie_element.push(categoryTitles[4][sidebarItems[4].selectedIndex].num)
      //     this.setState({sidebarItems, categoryTitles, isSubFilterBy: false}, () => this.props.onSelectSubFilterBy(serie_element))
      //   }
        
      // }  else {
      //   const index = 5+7*(currentBlock-1)        
      //   report_num.push(categoryTitles[index][sidebarItems[index].selectedIndex].num)
      //   if (sidebarItemIndex === index) {
      //     categoryTitles[index+1] =[]
      //     this.props.topics[selectedIndex].forEach(topic => {
      //       const obj = {}
      //       obj.num = topic.abb
      //       obj.header = topic.header
      //       categoryTitles[index+1].push(obj)
      //     })
      //     sidebarItems[index+1].selectedIndex = 0
      //   }
      //   topic_abb.push(categoryTitles[index+1][sidebarItems[index+1].selectedIndex].num)
      //   subject_num.push(categoryTitles[index+2][sidebarItems[index+2].selectedIndex].num)
      //   serie.push(categoryTitles[index+3][sidebarItems[index+3].selectedIndex].num)
      //   if(categoryTitles[index+4].length === 0) {
      //     serie_element = [0]
      //   } else {
      //     serie_element.push(categoryTitles[index+4][sidebarItems[index+4].selectedIndex].num)
      //   }
      //   if (categoryTitles[index+5].length===0) {
      //     serie2 = ['farm']
      //   } else {
      //     serie2.push(categoryTitles[index+5][sidebarItems[index+5].selectedIndex].num)
      //   }
      //   if (categoryTitles[index+6].length === 0) {
      //     serie2_element = [0]
      //   } else {
      //     serie2_element.push(categoryTitles[index+6][sidebarItems[index+6].selectedIndex].num)
      //   }
        
      //   if (sidebarItemIndex === index || sidebarItemIndex === index + 2 || sidebarItemIndex === index + 3) {

      //     isArmsFilter[currentBlock-1].isFilter1 = true
      //     this.setState({
      //       sidebarItems,
      //       categoryTitles,
      //       isArmsFilter: isArmsFilter
      //     }, this.props.onSelectArmsFilter(report_num, topic_abb, subject_num, serie, currentBlock))

      //   } else if (sidebarItemIndex === index + 4) {

      //     isArmsFilter[currentBlock-1].isSubFilter1 = true
      //     this.setState({
      //       sidebarItems,
      //       categoryTitles,
      //       isArmsFilter: isArmsFilter
      //     }, this.props.onSleectSubFilter1(report_num, topic_abb, subject_num, serie, serie_element, currentBlock))

      //   } else if (sidebarItemIndex === index + 5) {

      //     isArmsFilter[currentBlock-1].isFitler2 = true
      //     this.setState({
      //       sidebarItems,
      //       categoryTitles,
      //       isArmsFilter: isArmsFilter
      //     }, this.props.onSelectFilter2(report_num, topic_abb, subject_num, serie, serie_element, serie2, currentBlock))

      //   } else if (sidebarItemIndex === index + 6 || sidebarItemIndex === index +1) {
      //     isArmsFilter[currentBlock-1].isFilter1 = false
      //     isArmsFilter[currentBlock-1].isSubFilter1 = false
      //     isArmsFilter[currentBlock-1].isFitler2 = false
      //     this.setState({
      //       sidebarItems,
      //       categoryTitles,
      //       isArmsFilter: isArmsFilter
      //     }, this.props.onSelectSubFilter2(report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element, currentBlock))
      //   }
      // }      
    }
    this.toggleCategoryOptions(sidebarItemIndex)
    
  }

  removeDataSource = (blockindex) => {
    // let {categoryTitles, sidebarItems, isArmsFilter} = this.state
    // const index = 5+7*(blockindex-1)
    // for (let i=0; i<7; i++){
    //   sidebarItems[index+i].visible=false
    // }
    // currentBlock = blockindex
    // isArmsFilter[currentBlock-1].isFilter1 = false
    // isArmsFilter[currentBlock-1].isSubFilter1 = false
    // isArmsFilter[currentBlock-1].isFitler2 = false
    // this.setState({categoryTitles, sidebarItems, isArmsFilter}, this.props.onSelectSubFilter2([], [], [], [], [], [], [], currentBlock))
  }

  addDataSource() {
    // let {categoryTitles, sidebarItems, currentBlock, isArmsFilter} = this.state
    // currentBlock++
    // currentBlock = currentBlock
    // let datasource = []
    // this.props.reports.forEach(report => {
    //   const obj = {}
    //   obj.num = report.num
    //   obj.header = report.header
    //   datasource.push(obj)
    // })
    // categoryTitles.push(datasource)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: currentBlock, visible: true,  headingTitle: "Data Source"})

    // let dataline = []
    // this.props.topics[0].forEach(topic => {
    //   const obj = {}
    //   obj.num = topic.abb
    //   obj.header = topic.header
    //   dataline.push(obj)
    // })
    // categoryTitles.push(dataline)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: currentBlock, visible: true,  headingTitle: "Data Line"})

    // let farmtype = []
    // this.props.subjects.forEach(subject => {
    //   const obj = {}
    //   obj.num = subject.num
    //   obj.header = subject.header
    //   farmtype.push(obj)
    // })
    // categoryTitles.push(farmtype)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: currentBlock, visible: true,  headingTitle: "Farm Type"})

    // let filter1 = []
    // this.props.series.forEach(serie => {
    //   const obj = {}
    //   obj.num = serie.abb
    //   obj.header = serie.header
    //   filter1.push(obj)
    // })
    
    // categoryTitles.push(filter1)
    // sidebarItems.push({isOpened: false, selectedIndex: -0, isCategory: false, blockIndex: currentBlock, visible: true,  headingTitle: "Filter1"})

    // let subfilter1= []   
    // const obj = {}
    // obj.num = 0
    // obj.header = 'Total'
    // subfilter1.push(obj)
    
    // categoryTitles.push(subfilter1)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: currentBlock, visible: false,  headingTitle: ""})

    // let filter2 = []
    // this.props.series2.forEach(serie2 => {
    //   const obj = {}
    //   obj.num = serie2.abb
    //   obj.header = serie2.header
    //   filter2.push(obj)
    // })
    // categoryTitles.push(filter2)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: currentBlock, visible: true,  headingTitle: "Filter2"})

    // let subfilter2= []
    // subfilter2.push(obj)
    // categoryTitles.push(subfilter2)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: currentBlock, visible: false,  headingTitle: ""})
    // isArmsFilter.push({isFilter1: false, isSubFilter1: false, isFitler2: false, isSubFilter2: false})
    // this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, currentBlock: currentBlock, isArmsFilter: isArmsFilter}, this.props.onSelectSubFilter2([1], ["kount"], [1], ['farm'], [0], ['farm'], [0], currentBlock))
  }

  resetFilter = ( blockIndex ) => {
    this.props.onResetFilter()
  //   const { sidebarItems, categoryTitles, isArmsFilter } =this.state
  //  currentBlock = blockIndex
  //   if(blockIndex === 0) {
  //     isReports = true
  //     for (let i = 1; i<=4; i++) {
  //       sidebarItems[i].selectedIndex = 0          
  //       sidebarItems[i].isOpened = false
  //       if (i !== 4) {
  //         sidebarItems[i].visible = true
  //       } else {
  //         sidebarItems[i].visible = false
  //       }    
  //     }
  //     this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, currentBlock: 1}, this.props.onSelectCategory(isReports))
  //   } else {
  //     let report_num =[], topic_abb=[], subject_num=[], serie=[]
  //     const index = 5+7*(currentBlock-1)        
  //     report_num.push(categoryTitles[index][sidebarItems[index].selectedIndex].num)      
  //     topic_abb.push(categoryTitles[index+1][sidebarItems[index+1].selectedIndex].num)
  //     for (let i=2; i<=6; i++) {
  //       sidebarItems[index+i].selectedIndex=0
  //       sidebarItems[index+i].isOpened=false
  //       sidebarItems[index+i].visible=true
  //       if (i===4 || i===6){
  //         sidebarItems[index+i].visible=false
  //       }
  //     }
  //     subject_num.push(categoryTitles[index+2][sidebarItems[index+2].selectedIndex].num)
  //     serie.push(categoryTitles[index+3][sidebarItems[index+3].selectedIndex].num)
  //     isArmsFilter[currentBlock-1].isFilter1 = true, isArmsFilter[currentBlock-1].isSubFilter1 = false, isArmsFilter[currentBlock-1].isFitler2 = false, isArmsFilter[currentBlock-1].isSubFilter2=false
  //     this.setState({sidebarItems, categoryTitles, isArmsFilter: isArmsFilter}, this.props.onSelectArmsFilter(report_num, topic_abb, subject_num, serie, currentBlock))
      
  //   }
    
    
  }
  
  render() {  
    const {sidebarItems, categoryTitles, blockCount} = this.state    
    return (
    <Col sm={3} md={3} xs={12} className="sidebar-container">
      {        
        sidebarItems.map((val, i) => {
          let isBlock = false
          let isDataReset = false
          let isRemoval = false
          if ((i-11)%7 === 1) {
            isRemoval = true
          }else if ((i-4)%7 === 2){
            isDataReset = true
          } else if ((i-4)%7 === 0) {
            isBlock = true
          }
          return (
            <SidebarItem 
              headingTitle={val.headingTitle}
              titles={categoryTitles[i]}
              visible={val.visible}              
              selectedIndex={val.selectedIndex}
              isOpened={val.isOpened}
              isCategory={val.isCategory} 
              isReports={isReports}
              isRemoval={isRemoval}
              isDataReset={isDataReset}
              isBlock={isBlock}
              toggleCategoryOptions={() => this.toggleCategoryOptions(i)}
              updateFilter={(index) => this.updateFilter(i, index)}   
              resetFilter={() => this.resetFilter(val.blockIndex)}
              removeDataSource={() => this.removeDataSource(val.blockIndex)}                 
            />
          )
        })
      }
      {
        !isReports && (
        <div class="block">
          
        </div>
      )
    }      
      {
        !isReports && (
          <div>
            <a className="pull-right reset" onClick={() => this.addDataSource()}>
              <img src={Reset} alt="" />Add Another DataSource
            </a>
          </div>
        )
      }      
      </Col>
    )
  }
}

export default compose(
  resetQuery,
  reset1Query,
  sQuery,
  seQuery,
  seyQuery,
  setQuery,
  tQuery,
  tsQuery,
  tyQuery,
  tysQuery,
  yQuery,
  ysQuery,
  initAnalysis,
  yAnalysis,
  tAnalysis,
  ytDLAnalysis,
  ytDLFAnalysis,
  ytsAnalysis,
  ytseAnalysis,
  ytsesAnalysis
)(Sidebar)

