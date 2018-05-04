import React from 'react';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'
// import { selectLimit } from 'async';
import dlfTailored from '../../ApolloComponent/dlfTailored'
import dTailored from '../../ApolloComponent/dTailored'
import dlfsTailored from '../../ApolloComponent/dlfsTailored'
import dlfseTailored from '../../ApolloComponent/dlfseTailored'
import setQuery from '../../ApolloComponent/setQuery'
import seyQuery from '../../ApolloComponent/seyQuery'
import tQuery from '../../ApolloComponent/tQuery'
import dlftsTailored from '../../ApolloComponent/dlftsTailored'
import tyQuery from '../../ApolloComponent/yQuery'
import dlftysTailored from '../../ApolloComponent/dlftysTailored'
import yQuery from '../../ApolloComponent/yQuery'
import dlfysTailored from '../../ApolloComponent/dlfysTailored'
import initAnalysis from '../../ApolloComponent/initAnalysis'
import dAnalysis from '../../ApolloComponent/dAnalysis'
import dlfAnalysis from '../../ApolloComponent/dlfAnalysis'
import dlfsAnalysis from '../../ApolloComponent/dlfsAnalysis'
import dlfseAnalysis from '../../ApolloComponent/dlfseAnalysis'
import dlfsesAnalysis from '../../ApolloComponent/dlfsesAnalysis'
import dlfsesetAnalysis from '../../ApolloComponent/dlfsesetAnalysis'
import dlfseseyAnalysis from '../../ApolloComponent/dlfseseyAnalysis'
import dlfseseytAnalysis from '../../ApolloComponent/dlfseseytAnalysis'
import dlfsesetyAnalysis from '../../ApolloComponent/dlfsesetyAnalysis'
import { compose } from 'react-apollo'

class Sidebar extends React.Component {

  state = {
    isCategoryOpened: false,
    blockCount: 1,
    isSubFilterBy: false,
    isArmsFilter: []    
  }

  componentWillMount() {
    let categoryTitles = []
    let sidebarItems = []
    const currentBlock = 0
    const isReports = true

    // Generate Category LHS
    categoryTitles.push([
      {num: 0, header: 'Tailored Reports'},
      { num: 1, header: 'ARMS Data Analysis'}
    ])

    sidebarItems.push({
      isOpened: false,
      selectedIndex: 0,
      isCategory: true,
      blockIndex: currentBlock,
      visible: true, 
      headingTitle: ''
    })

    this.setState({
      categoryTitles,
      sidebarItems,
      currentBlock,
      isReports
    })    
  }

  componentWillReceiveProps(props) {
    
    if (props.runQuery.length !== 0){

      let {categoryTitles, sidebarItems, currentBlock} = this.state
      const runQuery = props.runQuery

      if (['initialize'].indexOf(props.runQuery)>-1) {

        const reports = this.generateReports(props.reports, currentBlock)
        
        categoryTitles.push(reports.categoryTitle)
        sidebarItems.push(reports.sidebarItem)

        this.setState({
          categoryTitles,
          sidebarItems,
          currentBlock
        }, props.resetFilterByBlockIndex(currentBlock))

      } else if (props[runQuery].networkStatus === 7 && props[runQuery][runQuery]) {
        
        switch (props.runQuery) {
          case 'dTailored':

            const topic_abb = []
            props[runQuery][runQuery].topic.forEach(topic => {
              topic_abb.push(topic.abb)
            })

            
            let subject_num = [props[runQuery][runQuery].subject[0].num]          
            const subjects = this.generateSubjects(props[runQuery][runQuery].subject, currentBlock)          

            if (categoryTitles.length < 3) {

              categoryTitles.push(subjects.categoryTitle)
              sidebarItems.push(subjects.sidebarItem)

            } else {
              const prev_subject = [categoryTitles[2][sidebarItems[2].selectedIndex].header]
              
              const current_index = this.updateSubjects(prev_subject, subjects.categoryTitle)
              subjects.sidebarItem.selectedIndex = current_index

              if (subjects.categoryTitle.length === 1) {
                subjects.sidebarItem.visible = false
              }

              categoryTitles[2] = subjects.categoryTitle
              sidebarItems[2] = subjects.sidebarItem

              subject_num = [subjects.categoryTitle[current_index].num]
              
            }

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.initialLoadingTailor(topic_abb, subject_num, currentBlock))
            break
          
          case 'dlfTailored':

            let serie = [props[runQuery][runQuery].serie[0].abb]
            const series = this.generateSeries(props[runQuery][runQuery].serie, currentBlock)
            const years = props[runQuery][runQuery].year
            const states = props[runQuery][runQuery].state

            if (categoryTitles.length < 4) {

              categoryTitles.push(series.categoryTitle)
              sidebarItems.push(series.sidebarItem)

            } else  {
              
              const prev_serie = [categoryTitles[3][sidebarItems[3].selectedIndex].header]

              const current_index = this.updateSeries(prev_serie, series.categoryTitle)

              series.sidebarItem.selectedIndex = current_index

              categoryTitles[3] = series.categoryTitle
              sidebarItems[3] = series.sidebarItem

              serie = [series.categoryTitle[current_index].num]

            }

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.resetSYRFilter(serie, years, states, currentBlock))
            break

          case 'dlftysTailored':
          case 'dlfsTailored':
          case 'dlfysTailored':
          case 'dlftsTailored':
            
            const series_element = this.generateElements(props[runQuery][runQuery].serie_element, currentBlock)
            let serie_element = series_element.serie_element

            if (categoryTitles.length < 5) {

              categoryTitles.push(series_element.categoryTitle)
              sidebarItems.push(series_element.sidebarItem)

            } else {

              const prev_serie_element = [categoryTitles[4][sidebarItems[4].selectedIndex].header]

              const current_index = this.updateElements(prev_serie_element, series_element.categoryTitle)

              series_element.sidebarItem.selectedIndex = current_index
              
              if (series_element.categoryTitle[current_index].num !== 0) {
                serie_element = [series_element.categoryTitle[current_index].num]
              }

              categoryTitles[4] = series_element.categoryTitle
              sidebarItems[4] = series_element.sidebarItem

            }

            sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
            if (props[runQuery][runQuery].serie_element.length === 1 && props[runQuery][runQuery].serie_element[0].id === 0) {
              sidebarItems[4].visible = false
            }

            if (props[runQuery][runQuery].year && props[runQuery][runQuery].state) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetEYRFilter(serie_element, props[runQuery][runQuery].year, props[runQuery][runQuery].state, currentBlock))

            } else if (props[runQuery][runQuery].state) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetERFilter(serie_element, props[runQuery][runQuery].state, currentBlock))
              
            } else if (props[runQuery][runQuery].year) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetEYFilter(serie_element, props[runQuery][runQuery].year, currentBlock))

            } else {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetEFilter(serie_element, currentBlock))

            }
            
            break

          case 'dlfseTailored':
            
            if (props[runQuery][runQuery].year) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetYFilter(props[runQuery][runQuery].year, currentBlock))

            }
            
            break

          default: break          
          
        }
      }
    } 
  }

  generateReports(reports, currentBlock) {
    const categoryTitle = []

    reports.forEach(report => {
      const obj = {}
      obj.num = report.num
      obj.header = report.header
      categoryTitle.push(obj)
    })

    const sidebarItem = {
      isOpened: false,
      selectedIndex: 0,
      isCategory: false,
      blockIndex: currentBlock,
      visible: true,
      headingTitle: 'Report'
    }

    return { categoryTitle, sidebarItem }

  }

  generateSubjects(subjects, currentBlock) {

    const categoryTitle = []
    subjects.forEach(subject => {
      const obj = {}
      obj.num = subject.num
      obj.header = subject.header
      categoryTitle.push(obj)
    })

    const sidebarItem = {
      isOpened: false,
      selectedIndex: 0,
      isCategory: false,
      blockIndex: currentBlock,
      visible: true,
      headingTitle: 'Subject'
    }

    return { categoryTitle, sidebarItem }
  }

  updateSubjects(prev_subject, subjects) {
    let current_index = 0

    if (!this.props.isReset) {
      subjects.forEach((subject, i) => {
        if (prev_subject.indexOf(subject.header) > -1) {
          current_index = i
        }
      })
    }

    return current_index
  }

  generateSeries(series, currentBlock) {
    
    const categoryTitle = []
    series.forEach(serie => {
      const obj = {}
      obj.num = serie.abb
      obj.header = serie.header
      categoryTitle.push(obj)
    })

    const sidebarItem = {
      isOpened: false,
      selectedIndex: 0,
      isCategory: false,
      blockIndex: currentBlock,
      visible: true,
      headingTitle: 'Filter by'
    }

    return { categoryTitle, sidebarItem }
  }

  updateSeries(prev_serie, series) {
    let current_index = 0

    if (!this.props.isReset) {
      series.forEach((serie, i) => {
        if ( prev_serie.indexOf(serie.header) > -1) {
          current_index = i
        }
      })
    }

    return current_index
  }

  generateElements(elements, currentBlock) {
    const serie_element = []

    const categoryTitle = [{
      num: 0,
      header: 'All'
    }]
    elements.forEach(element => {
      const obj = {}
      obj.num = element.id
      obj.header = element.name
      categoryTitle.push(obj)
      serie_element.push(element.id)
    })

    const sidebarItem = {
      isOpened: false,
      selectedIndex: 0,
      isCategory: false,
      blockIndex: currentBlock,
      visible: true,
      headingTitle: ''
    }

    return { categoryTitle, sidebarItem, serie_element}

  }

  updateElements(prev_element, elements) {

    let current_index = 0

    elements.forEach((element, i) => {
      if (prev_element.indexOf(element.header) > -1) {
        current_index = i
      }
    })

    return current_index
  }

  // componentWillReceiveProps(props) {
  //   let {categoryTitles, sidebarItems} = this.state

  //   if (categoryTitles.length === 0) {

  //     // initial loading
  //    if (props.reports.length !== 0) {
  //      // `tailored report`
  //     currentBlock = 0
            
  //     // generate static LHS menu
  //     categoryTitles.push([
  //       {num: 0, header: 'Tailored Reports'},
  //       { num: 1, header: 'ARMS Data Analysis'}
  //     ])
  //     sidebarItems.push({
  //       isOpened: false,
  //       selectedIndex: 0,
  //       isCategory: true,
  //       blockIndex: currentBlock,
  //       visible: true,  headingTitle: ''
  //     })
  //     const report_num = [props.reports[0].num]
  //     let reports = []
  //     props.reports.forEach(report => {
  //       const obj = {}
  //       obj.num = report.num
  //       obj.header = report.header
  //       reports.push(obj)
  //     })
  //     categoryTitles.push(reports)
  //     sidebarItems.push({
  //       isOpened: false,
  //       selectedIndex: 0,
  //       isCategory: false,
  //       blockIndex: currentBlock,
  //       visible: true,
  //       headingTitle: 'Report'
  //     })

  //     // get dynamic filter [Serie, Year, State]
  //     this.setState({
  //       categoryTitles: categoryTitles,
  //       sidebarItems: sidebarItems
  //     }, this.props.onSelectReportFilter(report_num, currentBlock))

  //    }

  //   } else if (categoryTitles.length !== 0 && currentBlock === 0) {

  //     if (props.reset1Query) {

  //       // click subject filter
  //       if (props.reset1Query.networkStatus ===7 && props.reset1Query.reset1Query) {
  //         // generate `subject` LHS menu

  //         let topic_abb = []

  //         props.reset1Query.reset1Query.topic.forEach(topic => {
  //           topic_abb.push(topic.abb)
  //         })

  //         let subjects = []
  //         let subject_num = [props.reset1Query.reset1Query.subject[0].num]
          

  //         props.reset1Query.reset1Query.subject.forEach(subject => {
  //           const obj = {}
  //           obj.num = subject.num
  //           obj.header = subject.header
  //           subjects.push(obj)
  //         })

  //         if (categoryTitles.length<3) {
  //           categoryTitles.push(subjects)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Subject'
  //           })
  //         } else {
  //           const prev_subject = [categoryTitles[2][sidebarItems[2].selectedIndex].header]
  //           let current_index = 0
  //           if (!props.isReset) { 
  //             props.reset1Query.reset1Query.subject.forEach((subject, i) => {              
  //               if (prev_subject.indexOf(subject.header) > -1) {
  //                 current_index = i
  //                 subject_num = [subject.num]
  //               }
  //             })
  //           }

  //           categoryTitles[2] = subjects
  //           sidebarItems[2].isOpened = false
  //           sidebarItems[2].selectedIndex = current_index
  //           sidebarItems[2].visible = true
  //         }

  //         if (props.reset1Query.reset1Query.subject.length === 1) {
  //           sidebarItems[2].visible = false
  //         }
          
  //         // update subject
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.initialLoadingTailor(topic_abb, subject_num, currentBlock))
  //       }        
  //     } else if (props.resetQuery) {

  //       // click reset or static filter updated
  //       if (props.resetQuery.networkStatus
  //         === 7 && props.resetQuery.resetQuery) {
  //         // generate `Filter By` LHS menu
  //         let series = []
  //         let serie = [props.resetQuery.resetQuery.serie[0].abb]          

  //         props.resetQuery.resetQuery.serie.forEach(serieN => {
  //           const obj = {}
  //           obj.num = serieN.abb
  //           obj.header = serieN.header
  //           series.push(obj)
  //         })
  //         if (categoryTitles.length<4) {
  //           categoryTitles.push(series)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Filter by'
  //           })
  //         } else {

  //           let prev_serie = [categoryTitles[3][sidebarItems[3].selectedIndex].header]
  //           let current_index = 0

  //           if (!props.isReset) {

  //             series.forEach((serieN, i) => {
  //               if (prev_serie.indexOf(serieN.header) > -1) {
  //                 serie = [serieN.num]
  //                 current_index = i
  //               }
  //             })
  //           }

  //           categoryTitles[3] = series
  //           sidebarItems[3].isOpened = false
  //           sidebarItems[3].selectedIndex = current_index
  //           sidebarItems[3].visible = true
  //         }
          
  //         // update [Year, State] list, and get Serie_element
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetSYRFilter(serie, props.resetQuery.resetQuery.year, props.resetQuery.resetQuery.state, currentBlock))
  //       }        
  //     } else if (props.tysQuery) {

  //       // update `Filter By/Sub` LHS menu
  //       if (props.tysQuery.networkStatus
  //         === 7 && props.tysQuery.tysQuery) {
  //         let series_element = [{
  //           num: 0,
  //           header: 'All'
  //         }]
  //         let serie_element = []
  //         props.tysQuery.tysQuery.serie_element.forEach(element => {
  //           const obj = {}
  //           obj.num = element.id
  //           obj.header = element.name
  //           series_element.push(obj)
  //           serie_element.push(element.id)
  //         })
  //         if (categoryTitles.length < 5) {
  //           categoryTitles.push(series_element)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: ''
  //           })
  //         } else {
  //           let prev_serie_element = [categoryTitles[4][sidebarItems[4].selectedIndex].header]
  //           let current_index = 0

  //           series_element.forEach((serie_elementN, i) => {
  //             if (prev_serie_element.indexOf(serie_elementN.header) > -1) {
  //               if (serie_elementN.num !== 0) {
  //                 serie_element = [serie_elementN.num]
  //               } 
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[4] = series_element
  //           sidebarItems[4].isOpened = false
  //           sidebarItems[4].selectedIndex = current_index 
  //           sidebarItems[4].visible = true
  //         }
  //         sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
  //         if (props.tysQuery.tysQuery.serie_element.length === 1 && props.tysQuery.tysQuery.serie_element[0].id === 0) {
  //           sidebarItems[4].visible = false
  //         }
          
  //         // update [ Filter By/Sub ] filter
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetEFilter(serie_element, currentBlock))
  //       }   
             
  //     } else if (props.sQuery) {

  //       // Serie -> 
  //       if (props.sQuery.networkStatus === 7  && props.sQuery.sQuery) {
  //         let series_element = [{
  //           num: 0,
  //           header: 'All'
  //         }]
  //         let serie_element = []

  //         // generate `Filter By/Sub` LHS menu
  //         props.sQuery.sQuery.serie_element.forEach(element => {
  //           const obj = {}
  //           obj.num = element.id
  //           obj.header = element.name
  //           series_element.push(obj)
  //           serie_element.push(element.id)
  //         })
  //         if (categoryTitles.length < 5) {
  //           categoryTitles.push(series_element)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: ''
  //           })
  //         } else {
  //           let prev_serie_element = [categoryTitles[4][sidebarItems[4].selectedIndex].header]
  //           let current_index = 0

  //           series_element.forEach((serie_elementN, i) => {
  //             if (prev_serie_element.indexOf(serie_elementN.header) > -1) {
  //               if (serie_elementN.num !== 0) {
  //                 serie_element = [serie_elementN.num]
  //               } 
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[4] = series_element
  //           sidebarItems[4].isOpened = false
  //           sidebarItems[4].selectedIndex = current_index 
  //           sidebarItems[4].visible = true
  //         }
  //         sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
  //         if (props.sQuery.sQuery.serie_element.length === 1 && props.sQuery.sQuery.serie_element[0].id === 0) {
  //           sidebarItems[4].visible = false
  //         }
          
  //         // update serie_element, [Year, State] list
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetEYRFilter(serie_element, props.sQuery.sQuery.year, props.sQuery.sQuery.state, currentBlock))
  //       }

  //     } else if (props.seQuery) {

  //       // Serie/Serie_element -> 
  //       if (props.seQuery.networkStatus === 7 && props.seQuery.seQuery) {
  //         // update [Year, State] list              
  //         this.props.resetYRFilter(props.seQuery.seQuery.year, props.seQuery.seQuery.state, currentBlock)
  //       }   

  //     } else if (props.setQuery) {

  //       // Serie/Serie_element -> State
  //       if (props.setQuery.networkStatus === 7 && props.setQuery.setQuery) {
  //         // Update [year] list       
  //         this.props.resetYFilter(props.setQuery.setQuery.year, currentBlock)
  //       }  

  //     } else if (props.seyQuery) {

  //       // Serie/Serie_element -> Year
  //       if (props.seyQuery.networkStatus === 7 && props.seyQuery.seyQuery) {
  //          // Update [State] list       
  //         this.props.resetRFilter(props.seyQuery.seyQuery.state, currentBlock)
  //       }  

  //     } else if (props.tQuery) {

  //       // State - > 
  //       if (props.tQuery.networkStatus ===7 && props.tQuery.tQuery) {

  //         let series = []
  //         let serie = [props.tQuery.tQuery.serie[0].abb]

  //         // Generate `Filter By` LHS menu
  //         props.tQuery.tQuery.serie.forEach(serieN => {
  //           const obj = {}
  //           obj.num = serieN.abb
  //           obj.header = serieN.header
  //           series.push(obj)
  //         })
  //         if (categoryTitles.length<4) {
  //           categoryTitles.push(series)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Filter by'
  //           })
  //         } else {
  //           let prev_serie = [categoryTitles[3][sidebarItems[3].selectedIndex].header]
  //           let current_index = 0

  //           series.forEach((serieN, i) => {
  //             if (prev_serie.indexOf(serieN.header) > -1) {
  //               serie = [serieN.num]
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[3] = series
  //           sidebarItems[3].isOpened = false
  //           sidebarItems[3].selectedIndex = current_index
  //           sidebarItems[3].visible = true
  //         } 
          
  //         // update serie, [Year] list , get serie_element
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetSYFilter(serie, props.tQuery.tQuery.year, currentBlock))
  //       }

  //     } else if (props.tyQuery) {
  //       // State -> Year
  //       if (props.tyQuery.networkStatus === 7 && props.tyQuery.tyQuery) {
  //         let series = []
  //         let serie = [props.tyQuery.tyQuery.serie[0].abb]

  //         // Generate `Filter By` LHS menu
  //         props.tyQuery.tyQuery.serie.forEach(serieN => {
  //           const obj = {}
  //           obj.num = serieN.abb
  //           obj.header = serieN.header
  //           series.push(obj)
  //         })
  //         if (categoryTitles.length<4) {
  //           categoryTitles.push(series)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Filter by'
  //           })
  //         } else {
  //           let prev_serie = [categoryTitles[3][sidebarItems[3].selectedIndex].header]
  //           let current_index = 0

  //           series.forEach((serieN, i) => {
  //             if (prev_serie.indexOf(serieN.header) > -1) {
  //               serie = [serieN.num]
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[3] = series
  //           sidebarItems[3].isOpened = false
  //           sidebarItems[3].selectedIndex = current_index
  //           sidebarItems[3].visible = true
  //         }
          
  //         // update serie, and get serie_element
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetSFilter(serie, currentBlock))
  //       }

  //     } else if (props.tsQuery) {
  //       // State -> Serie
  //       if (props.tsQuery.networkStatus === 7 && props.tsQuery.tsQuery) {
  //         let series_element = [{
  //           num: 0,
  //           header: 'All'
  //         }]

  //         // Generate `Filter By/Sub` LHS menu
  //         let serie_element = []
  //         props.tsQuery.tsQuery.serie_element.forEach(element => {
  //           const obj = {}
  //           obj.num = element.id
  //           obj.header = element.name
  //           series_element.push(obj)
  //           serie_element.push(element.id)
  //         })
  //         if (categoryTitles.length < 5) {
  //           categoryTitles.push(series_element)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: ''
  //           })
  //         } else {
  //           let prev_serie_element = [categoryTitles[4][sidebarItems[4].selectedIndex].header]
  //           let current_index = 0

  //           series_element.forEach((serie_elementN, i) => {
  //             if (prev_serie_element.indexOf(serie_elementN.header) > -1) {
  //               if (serie_elementN.num !== 0) {
  //                 serie_element = [serie_elementN.num]
  //               } 
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[4] = series_element
  //           sidebarItems[4].isOpened = false
  //           sidebarItems[4].selectedIndex = current_index 
  //           sidebarItems[4].visible = true
  //         }
  //         sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
  //         if (props.tsQuery.tsQuery.serie_element.length === 1 && props.tsQuery.tsQuery.serie_element[0].id === 0) {
  //           sidebarItems[4].visible = false
  //         }
          
  //         // update serie_element, and [Year] list
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetEYFilter(serie_element, props.tsQuery.tsQuery.year, currentBlock))
  //       }

  //     } else if (props.yQuery) {
  //       // Year - > 
  //       if (props.yQuery.networkStatus ===  7 && props.yQuery.yQuery) {
  //         let series = []
  //         let serie = [props.yQuery.yQuery.serie[0].abb]

  //         // Generate `Filter By` LHS menu
  //         props.yQuery.yQuery.serie.forEach(serieN => {
  //           const obj = {}
  //           obj.num = serieN.abb
  //           obj.header = serieN.header
  //           series.push(obj)
  //         })
  //         if (categoryTitles.length<4) {
  //           categoryTitles.push(series)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Filter by'
  //           })
  //         } else {
  //           let prev_serie = [categoryTitles[3][sidebarItems[3].selectedIndex].header]
  //           let current_index = 0

  //           series.forEach((serieN, i) => {
  //             if (prev_serie.indexOf(serieN.header) > -1) {
  //               serie = [serieN.num]
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[3] = series
  //           sidebarItems[3].isOpened = false
  //           sidebarItems[3].selectedIndex = current_index
  //           sidebarItems[3].visible = true
  //         }
          
  //         // update serie, [state] list, and get serie_element
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetSRFilter(serie, props.yQuery.yQuery.state, currentBlock))
  //       }

  //     } else if (props.ysQuery) {
  //       // Year -> Serie
  //       if (props.ysQuery.networkStatus === 7 && props.ysQuery.ysQuery) {
  //         let series_element = [{
  //           num: 0,
  //           header: 'All'
  //         }]
          
  //         // Generate `Filter By/Sub` LHS menu
  //         let serie_element = []
  //         props.ysQuery.ysQuery.serie_element.forEach(element => {
  //           const obj = {}
  //           obj.num = element.id
  //           obj.header = element.name
  //           series_element.push(obj)
  //           serie_element.push(element.id)
  //         })
  //         if (categoryTitles.length < 5) {
  //           categoryTitles.push(series_element)
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: ''
  //           })
  //         } else {
  //           let prev_serie_element = [categoryTitles[4][sidebarItems[4].selectedIndex].header]
  //           let current_index = 0

  //           series_element.forEach((serie_elementN, i) => {
  //             if (prev_serie_element.indexOf(serie_elementN.header) > -1) {
  //               if (serie_elementN.num !== 0) {
  //                 serie_element = [serie_elementN.num]
  //               } 
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[4] = series_element
  //           sidebarItems[4].isOpened = false
  //           sidebarItems[4].selectedIndex = current_index 
  //           sidebarItems[4].visible = true
  //         }
  //         sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
  //         if (props.ysQuery.ysQuery.serie_element.length === 1 && props.ysQuery.ysQuery.serie_element[0].id === 0) {
  //           sidebarItems[4].visible = false
  //         }
  //         // update serie_element, [state] list
  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.resetERFilter(serie_element, props.ysQuery.ysQuery.state, currentBlock))
  //       }

  //     }
  //   } else if (categoryTitles.length !== 0 && currentBlock !== 0) {
  //     if (props.initAnalysis) {
  //       if (props.initAnalysis.networkStatus === 7 && props.initAnalysis.initAnalysis) {
          
  //         // Generate `Data Source` LHS
  //         let reports = []
  //         props.reports.forEach(report => {
  //           const obj = {}
  //           obj.num = report.num
  //           obj.header = report.header
  //           reports.push(obj)
  //         })

  //         // Generate `Data Line` LHS
  //         const topics = []
  //         props.initAnalysis.initAnalysis.topic.forEach(topic => {
  //           const obj = {}
  //           obj.num = topic.abb
  //           obj.header = topic.header
  //           topics.push(obj)
  //         })
        
  //         // Generate `Farm Type` LHS
  //         let subjects = []
  //         props.initAnalysis.initAnalysis.subject.forEach(subject => {
  //           const obj = {}
  //           obj.num = subject.num
  //           obj.header = subject.header
  //           subjects.push(obj)
  //         })

  //         // Index based on Block
  //         const index = 7*(currentBlock-1) + 5
          
  //         if (categoryTitles.length<index+1) {

  //           // LHS Generating (initailize)
  //           categoryTitles.push(reports)
  //           categoryTitles.push(topics)
  //           categoryTitles.push(subjects)

  //           // Data Source
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Data Source ' + currentBlock
  //           })

  //           // Data Line
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: [0],
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Data Line'
  //           })

  //           // Farm Type
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Farm Type'
  //           })

  //         } else {

  //           // LHS Generate (Update)
  //           categoryTitles[index+1] = topics
  //           categoryTitles[index+2] = subjects
            
  //           for (let i=0; i<3; i++) {
  //             sidebarItems[index+i].isOpened = false
  //             sidebarItems[index+i].selectedIndex = 0
  //             sidebarItems[index+i].visible = true
  //             if (i === 1) {
  //               sidebarItems[index+i].selectedIndex = [0]
  //             }              
  //           }
            
  //         }

  //         // If `Farm Type` list contain only one item, invisible

  //         if (subjects.length === 1){
  //           sidebarItems[index+2].visible = false
  //         }

  //         const topic_abb = [categoryTitles[index+1][0].num]
  //         const subject_num = [categoryTitles[index+2][0].num]

  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.initialBlockLoadAnalysis(topic_abb, subject_num, currentBlock))
  //       }

  //     } else if (props.dAnalysis) {
  //       if (props.dAnalysis.networkStatus === 7 && props.dAnalysis.dAnalysis) {
          
  //         // Generate `Data Source` LHS
  //         let reports = []
  //         props.reports.forEach(report => {
  //           const obj = {}
  //           obj.num = report.num
  //           obj.header = report.header
  //           reports.push(obj)
  //         })

  //         // Generate `Data Line` LHS
  //         const topics = []
  //         let topic_abb = []
  //         props.dAnalysis.dAnalysis.topic.forEach(topic => {
  //           const obj = {}
  //           obj.num = topic.abb
  //           obj.header = topic.header
  //           topics.push(obj)
  //         })
        
  //         // Generate `Farm Type` LHS
  //         let subjects = []
  //         let subject_num = [props.dAnalysis.dAnalysis.subject[0].num]
  //         props.dAnalysis.dAnalysis.subject.forEach(subject => {
  //           const obj = {}
  //           obj.num = subject.num
  //           obj.header = subject.header
  //           subjects.push(obj)
  //         })

  //         // Index based on Block
  //         const index = 7*(currentBlock-1) + 5
          
  //         if (categoryTitles.length<index+1) {

  //           // LHS Generating (initailize)
  //           categoryTitles.push(reports)
  //           categoryTitles.push(topics)
  //           categoryTitles.push(subjects)

  //           // Data Source
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Data Source ' + currentBlock
  //           })

  //           // Data Line
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: [0],
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Data Line'
  //           })

  //           // Farm Type
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Farm Type'
  //           })

  //         } else {
  //           const prev_subject = [categoryTitles[index+2][sidebarItems[index+2].selectedIndex].header]
  //           let subject_index = 0

  //           if (!props.isReset) {
  //             props.dAnalysis.dAnalysis.subject.forEach((subject, i) => {
  //               if (prev_subject.indexOf(subject.header) > -1) {
  //                 subject_index = i
  //                 subject_num = [subject.num]
  //               }
  //             })
  //           }

  //           let prev_topic = []
  //           let topic_index = []
  //           sidebarItems[index+1].selectedIndex.forEach(i=> {
  //             prev_topic.push(categoryTitles[index+1][i].header)
  //           })

  //           props.dAnalysis.dAnalysis.topic.forEach((topic, i) => {
  //             if (prev_topic.indexOf(topic.header) >  -1) {
  //               topic_index.push(i)
  //               topic_abb.push(topic.abb)
  //             }
  //           })

  //           if (topic_index.length === 0) {
  //             topic_index = [0]
  //             topic_abb = [props.dAnalysis.dAnalysis.topic[0].abb]
  //           }



  //           // LHS Generate (Update)
  //           categoryTitles[index+1] = topics
  //           categoryTitles[index+2] = subjects

  //           for (let i=1; i<3; i++) {
  //             sidebarItems[index+i].isOpened = false
  //             sidebarItems[index+i].visible = true
  //             if (i === 1) {
  //               sidebarItems[index+i].selectedIndex = topic_index
  //             } else {
  //               sidebarItems[index+i].selectedIndex = subject_index
  //             }              
  //           }
            
  //         }

  //         // If `Farm Type` list contain only one item, invisible

  //         if (subjects.length === 1){
  //           sidebarItems[index+2].visible = false
  //         }

  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.initialBlockLoadAnalysis(topic_abb, subject_num, currentBlock))
  //       }

  //     } else if (props.dlfAnalysis) {

  //       if (props.dlfAnalysis.networkStatus === 7 && props.dlfAnalysis.dlfAnalysis) {

  //         // Generate `Filter1` LHS
  //         let series = []
  //         let serie = [props.dlfAnalysis.dlfAnalysis.serie[0].abb];
  //         props.dlfAnalysis.dlfAnalysis.serie.forEach(serie => {
  //           const obj = {}
  //           obj.num = serie.abb
  //           obj.header = serie.header
  //           series.push(obj)
  //         })

  //         // Index based on Block
  //         const index = 7*(currentBlock-1) + 8

  //         if (categoryTitles.length<index+1) {
  //           // LHS Generating (initailize)
  //           categoryTitles.push(series)

  //           // Filter1
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Filter1'
  //           })
  //         } else {
  //           // LHS Generate (Update)

  //           let prev_serie = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
  //           let current_index = 0
            
  //           if (!props.isReset) {
  //             series.forEach((serieN, i) => {
  //               if (prev_serie.indexOf(serieN.header) > -1) {
  //                 serie = [serieN.num]
  //                 current_index = i
  //               }
  //             })
  //           }
            
  //           categoryTitles[index] = series
  //           sidebarItems[index].isOpened = false
  //           sidebarItems[index].selectedIndex = current_index
  //           sidebarItems[index].visible = true
  //         }

  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.selectFilter1Analysis(serie, currentBlock))
  //       }

  //     } else if (props.dlfsAnalysis) {

  //       if (props.dlfsAnalysis.networkStatus === 7 && props.dlfsAnalysis.dlfsAnalysis) {
          
  //         // Filter1/Sub LHS Generate
  //         let series_element = [{
  //           num: 0,
  //           header: 'All'
  //         }]
  //         let serie_element = []

  //         props.dlfsAnalysis.dlfsAnalysis.serie_element.forEach(element => {
  //           const obj = {}
  //           obj.num = element.id
  //           obj.header = element.name
  //           series_element.push(obj)
  //           serie_element.push(element.id)
  //         })

  //         // Index based on Block
  //         const index = 7*(currentBlock-1) + 9

  //         if (categoryTitles.length < index+1) {
  //           // LHS Generating (initailize)
  //           categoryTitles.push(series_element)

  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: ''
  //           })
  //         } else {
  //           // LHS Generate (Update)

  //           let prev_serie_element = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
  //           let current_index = 0

  //           series_element.forEach((serie_elementN, i) => {
  //             if (prev_serie_element.indexOf(serie_elementN.header) > -1) {
  //               if (serie_elementN.num !== 0) {
  //                 serie_element = [serie_elementN.num]
  //               } 
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[index] = series_element
  //           sidebarItems[index].isOpened = false
  //           sidebarItems[index].selectedIndex = current_index
  //           sidebarItems[index].visible = true
  //         }

  //         sidebarItems[index].headingTitle = categoryTitles[index-1][sidebarItems[index-1].selectedIndex].header

  //         if (props.dlfsAnalysis.dlfsAnalysis.serie_element.length === 1 && props.dlfsAnalysis.dlfsAnalysis.serie_element[0].id === 0) {
  //           sidebarItems[index].visible = false
  //         }

  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.selectSubFilter1Analysis(serie_element, currentBlock))

  //       }

  //     } else if (props.dlfseAnalysis) {

  //       if (props.dlfseAnalysis.networkStatus === 7 && props.dlfseAnalysis.dlfseAnalysis) {
  //         // Generate `Filter2` LHS
  //         let series2 = []
  //         let serie2 = [props.dlfseAnalysis.dlfseAnalysis.serie2[0].abb]
  //         props.dlfseAnalysis.dlfseAnalysis.serie2.forEach(serie2N => {
  //           const obj = {}
  //           obj.num = serie2N.abb
  //           obj.header = serie2N.header
  //           series2.push(obj)
  //         })

  //         // Index based on Block
  //         const index = 7*(currentBlock-1) + 10
  //         const serie_element_num = sidebarItems[index-1].selectedIndex

  //         if (categoryTitles.length<index+1) {
  //           // LHS Generating (initailize)
  //           categoryTitles.push(series2)

  //           // Filter1
  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: 'Filter2'
  //           })
  //         } else {
  //           // LHS Generate (Update)

  //           let prev_serie2 = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
  //           let current_index = 0
            
  //           if (serie_element_num !== 0) {
  //             series2.forEach((serie2N, i) => {
  //               if (prev_serie2.indexOf(serie2N.header) > -1) {
  //                 serie2 = [serie2N.num]
  //                 current_index = i
  //               }
  //             })
  //           }

  //           categoryTitles[index] = series2
  //           sidebarItems[index].isOpened = false
  //           sidebarItems[index].selectedIndex = current_index
  //           sidebarItems[index].visible = true
  //         }

  //         if (serie_element_num === 0) {
  //           sidebarItems[index].visible = false
  //         }
          

  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.selectFilter2Analysis(serie2, currentBlock))
  //       }

  //     } else if (props.dlfsesAnalysis) {

  //       if (props.dlfsesAnalysis.networkStatus === 7 && props.dlfsesAnalysis.dlfsesAnalysis) {
          
  //         // Filter1/Sub LHS Generate
  //         let series2_element = [{
  //           num: 0,
  //           header: 'All'
  //         }]
  //         let serie2_element = []

  //         props.dlfsesAnalysis.dlfsesAnalysis.serie2_element.forEach(element => {
  //           const obj = {}
  //           obj.num = element.id
  //           obj.header = element.name
  //           series2_element.push(obj)
  //           serie2_element.push(element.id)
  //         })

  //         // Index based on Block
  //         const index = 7*(currentBlock-1) + 11

  //         if (categoryTitles.length < index+1) {
  //           // LHS Generating (initailize)
  //           categoryTitles.push(series2_element)

  //           sidebarItems.push({
  //             isOpened: false,
  //             selectedIndex: 0,
  //             isCategory: false,
  //             blockIndex: currentBlock,
  //             visible: true,
  //             headingTitle: ''
  //           })
  //         } else {
  //           // LHS Generate (Update)

  //           let prev_serie2_element = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
  //           let current_index = 0

  //           series2_element.forEach((serie2_elementN, i) => {
  //             if (prev_serie2_element.indexOf(serie2_elementN.header) > -1) {
  //               if (serie2_elementN.num !== 0) {
  //                 serie2_element = [serie2_elementN.num]
  //               } 
  //               current_index = i
  //             }
  //           })

  //           categoryTitles[index] = series2_element
  //           sidebarItems[index].isOpened = false
  //           sidebarItems[index].selectedIndex = current_index
  //           sidebarItems[index].visible = true
  //         }

  //         sidebarItems[index].headingTitle = categoryTitles[index-1][sidebarItems[index-1].selectedIndex].header

  //         if (props.dlfsesAnalysis.dlfsesAnalysis.serie2_element.length === 1 && props.dlfsesAnalysis.dlfsesAnalysis.serie2_element[0].id === 0) {
  //           sidebarItems[index].visible = false
  //         }

  //         this.setState({
  //           categoryTitles: categoryTitles,
  //           sidebarItems: sidebarItems
  //         }, this.props.selectSubFilter2Analysis(serie2_element, currentBlock))

  //       }

  //     } else if (props.dlfsesetAnalysis) {

  //       if (props.dlfsesetAnalysis.networkStatus === 7 && props.dlfsesetAnalysis.dlfsesetAnalysis) {

  //         this.props.selectStateAnalysis(props.dlfsesetAnalysis.dlfsesetAnalysis.state)

  //       }

  //     } else if (props.dlfseseyAnalysis) {

  //       if (props.dlfseseyAnalysis.networkStatus === 7 && props.dlfseseyAnalysis.dlfseseyAnalysis) {
          
  //         this.props.selectYearAnalysis(props.dlfseseyAnalysis.dlfseseyAnalysis.year)

  //       }

  //     } else if (props.dlfsesetyAnalysis) {

  //       if (props.dlfsesetyAnalysis.networkStatus === 7 && props.dlfsesetyAnalysis.dlfsesetyAnalysis) {

  //         this.props.selectYearAnalysis(props.dlfsesetyAnalysis.dlfsesetyAnalysis.year)

  //       }

  //     } else if (props.dlfseseytAnalysis) {

  //       if (props.dlfseseytAnalysis.networkStatus === 7 && props.dlfseseytAnalysis.dlfseseytAnalysis) {
          
  //         this.props.selectStateAnalysis(props.dlfseseytAnalysis.dlfseseytAnalysis.state)

  //       }

  //     }
  //   }
  // }

  toggleCategoryOptions = (selectedItemIndex) => {
    if (this.props.runQuery.length === 0) {    
      const { sidebarItems } =this.state    
      sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened       
      this.setState({ sidebarItems })
    }
  }

  updateFilter = (sidebarItemIndex, selectedIndex) => {

    let { sidebarItems, categoryTitles, currentBlock, isReports} =this.state

    // current Block index
    currentBlock = sidebarItems[sidebarItemIndex].blockIndex

    if ((sidebarItemIndex - 5)%7!==1) {
      sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex
    }

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
        sidebarItems[1].selectedIndex = 0
        sidebarItems[2].visible = true
       
        this.setState({sidebarItems, isReports, currentBlock}, this.props.onSelectReportCategory())        
      } else {
        // Arms Data Analaysis      
        currentBlock = 1
        this.props.selectAnalysisCategory()
        isReports = false
      }
    } else {

      if (sidebarItemIndex === 1) {

        // Tailored Report/Report
        const report_num = []
        report_num.push(categoryTitles[1][sidebarItems[1].selectedIndex].num)

        this.setState({sidebarItems, categoryTitles}, this.props.onSelectReportFilter(report_num, currentBlock))

      } else if (sidebarItemIndex === 2) {

        // Tailored Report/Subject
        const subject_num = []
        subject_num.push(categoryTitles[2][sidebarItems[2].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubjectFilter(subject_num, currentBlock))

      } else if (sidebarItemIndex === 3) {

        // Tailored Report/Filter By
        const serie = []
        serie.push(categoryTitles[3][sidebarItems[3].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectFilterByFilter(serie, currentBlock))

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
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubFilterByFilter(serie_element, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===0){
        
        // Arms Data Analaysis/Data Source
        const report_num = []

        report_num.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)

        this.setState({sidebarItems, categoryTitles}, this.props.selectDataSource(report_num, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===1){

        // Arms Data Analysis/Data Line
        const topic_abb = []

        const index = sidebarItems[sidebarItemIndex].selectedIndex.indexOf(selectedIndex)
        if (index > -1) {
          if (sidebarItems[sidebarItemIndex].selectedIndex.length !== 1) {
            sidebarItems[sidebarItemIndex].selectedIndex.splice(index, 1)
          }          
        } else {
          sidebarItems[sidebarItemIndex].selectedIndex.push(selectedIndex)
        }
        for (let i=0; i<sidebarItems[sidebarItemIndex].selectedIndex.length; i++) {
          topic_abb.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex[i]].num)
        }        

        this.setState({sidebarItems, categoryTitles}, this.props.selectDataLineAnalysis(topic_abb, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===2){

        // Arms Data Analaysis/Farm Type
        const subject_num = []

        subject_num.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        
        this.setState({sidebarItems, categoryTitles}, this.props.selectFarmTypeAnalsysis(subject_num, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===3){

        // Arms Data Analysis/Filter1
        const serie = []
        serie.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.selectFilter1Analysis(serie, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===4){

        // Arms Data Analaysis/Sub Filter1
        const serie_element = []
        if (selectedIndex !== 0) {
          serie_element.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        } else {
          for (let i = 1; i<categoryTitles[sidebarItemIndex].length; i++) {
            serie_element.push(categoryTitles[sidebarItemIndex][i].num)
          }
        }

        this.setState({sidebarItems, categoryTitles}, this.props.selectSubFilter1Analysis(serie_element, currentBlock))

      } else if ((sidebarItemIndex - 5)%7===5){

        // Arms Data Analysis/Filter2
        const serie2 = []
        serie2.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.selectFilter2Analysis(serie2, currentBlock))
      } else if ((sidebarItemIndex - 5)%7===6){

        // Arms Data Analysis/Sub Filter2
        const serie2_element = []
        if (selectedIndex !== 0) {
          serie2_element.push(categoryTitles[sidebarItemIndex][sidebarItems[sidebarItemIndex].selectedIndex].num)
        } else {
          for (let i = 1; i<categoryTitles[sidebarItemIndex].length; i++) {
            serie2_element.push(categoryTitles[sidebarItemIndex][i].num)
          }
        }

        this.setState({sidebarItems, categoryTitles}, this.props.selectSubFilter2Analysis(serie2_element, currentBlock))

      }      
    }
    if((sidebarItemIndex - 5)%7!==1) {
      this.toggleCategoryOptions(sidebarItemIndex)
    }
    
  }

  removeDataSource = (blockindex) => {
    let {categoryTitles, sidebarItems, blockCount} = this.state

    blockCount--

    for (let i=blockindex; i<=blockCount; i++) {
      const index = 7*(i-1) + 5
      for (let j=0; j<7; j++) {
        categoryTitles[index+j] = categoryTitles[index+j+7]
        sidebarItems[index+j] = sidebarItems[index+j+7]
        sidebarItems[index+j].blockIndex = i       
      }
      sidebarItems[index].headingTitle = 'Data Source ' + i
    }

    for (let i=0; i<7; i++) {
      categoryTitles.pop()
      sidebarItems.pop()
    }

    this.setState({categoryTitles, sidebarItems, blockCount}, this.props.removeDataSource(blockindex))
  }

  addDataSource() {
    let {blockCount, currentBlock} = this.state
    if (blockCount <8) {
      blockCount++

      currentBlock = blockCount
      this.setState({blockCount}, this.props.addDataSource(currentBlock))
    }    
  }

  resetFilter = ( blockIndex ) => {
    const currentBlock = blockIndex
    this.setState({currentBlock}, this.props.resetFilterByBlockIndex(blockIndex))
    
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.sidebarWrapper && !this.sidebarWrapper.contains(event.target)) {
      const { sidebarItems } = this.state    
      sidebarItems.forEach((singleItem) => {
        singleItem.isOpened = false
      })
      this.setState({ sidebarItems })
    }
  }

  render() {  
    const { sidebarItems, categoryTitles, isReports} = this.state
    const { fontSizeIndex } = this.props
    let isAdd = true    
    return (
    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
      <div className="sidebar-container" ref={node => this.sidebarWrapper = node} tabIndex="0">
        {        
          sidebarItems.map((val, i) => {
            let isBlock = false
            let isDataReset = false
            let isRemoval = false
            let isDataLine = false
            if ((i-11)%7 === 1) {
              isRemoval = true
            }else if ((i-4)%7 === 2){
              isDataReset = true
            } else if ((i-4)%7 === 0) {
              isBlock = true
            }
            if ((i-5)%7===1) {
              isDataLine = true
            }
            if ((i-4)/7>7) {
              isAdd = false
            }
            return (
              <SidebarItem 
                tabIndex={(i+1)*20}
                key={i+1}
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
                isDataLine={isDataLine}
                fontSizeIndex={fontSizeIndex}
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
          <div className="divider">
            
          </div>
        )
      }      
        {
          !isReports && isAdd &&(
            <div>
              <a className="pull-right reset" onClick={() => this.addDataSource()} tabIndex={sidebarItems.length*20}>
                <img src={Reset} alt="Add new data source" />Add Another DataSource
              </a>
            </div>
          )
        }      
        </div>
      </div>
    )
  }
}

export default compose(
  dlfTailored,
  dTailored,
  dlfsTailored,
  dlfseTailored,
  seyQuery,
  setQuery,
  tQuery,
  dlftsTailored,
  tyQuery,
  dlftysTailored,
  yQuery,
  dlfysTailored,
  initAnalysis,
  dAnalysis,
  dlfAnalysis,
  dlfsAnalysis,
  dlfseAnalysis,
  dlfsesAnalysis,
  dlfsesetAnalysis,
  dlfseseyAnalysis,
  dlfseseytAnalysis,
  dlfsesetyAnalysis,
)(Sidebar)

