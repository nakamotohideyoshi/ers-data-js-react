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
        blockIndex: blockCount,
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
        blockIndex: blockCount,
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
        blockIndex: blockCount,
        visible: true,
        headingTitle: 'Subject'
      })

      // get dynamic filter [Serie, Year, State]
      this.setState({
        categoryTitles: categoryTitles,
        sidebarItems: sidebarItems
      }, this.props.onStaticSelect(report_num, subject_num))

     }

    } else {

      if (props.resetQuery) {

        // click reset or static filter updated
        if (!props.resetQuery.loading && props.resetQuery.arms_filter.length !== 0) {
          // generate `Filter By` LHS menu
          let series = []
          const serie = props.resetQuery.arms_filter.serie[0].abb
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
              blockIndex: blockCount,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: 'Filter by'
            }
          }
          
          // update [Year, State] list, and get Serie_element
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter1(serie, props.resetQuery.arms_filter.year, props.resetQuery.arms_filter.state))
        }        
      } else if (props.tysQuery) {

        // update `Filter By/Sub` LHS menu
        if (!props.tysQuery.loading && props.tysQuery.arms_filter.length !== 0) {
          let series_element = []
          const serie_element = props.tysQuery.arms_filter.serie_element[0].id
          props.tysQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            }
          }
          
          // update serie_element filter
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter2(serie_element))
        }   
             
      } else if (props.sQuery) {

        // Serie -> 
        if (!props.sQuery.loading && props.sQuery.arms_filter.length !== 0) {
          let series_element = []
          const serie_element = props.sQuery.arms_filter.serie_element[0].id

          // generate `Filter By/Sub` LHS menu
          props.sQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            }
          }
          
          // update serie_element, [Year, State] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter3(serie_element, props.sQuery.arms_filter.year, props.sQuery.arms_filter.state))
        }

      } else if (props.seQuery) {

        // Serie/Serie_element -> 
        if (!props.seQuery.loading && props.seQuery.arms_filter.length !== 0) {
          // update [Year, State] list              
          this.props.onResetFilter4(props.seQuery.arms_filter.year, props.seQuery.arms_filter.state)
        }   

      } else if (props.setQuery) {

        // Serie/Serie_element -> State
        if (!props.setQuery.loading && props.setQuery.arms_filter.length !== 0) {
          // Update [year] list       
          this.props.onResetFilter5(props.setQuery.arms_filter.year)
        }  

      } else if (props.seyQuery) {

        // Serie/Serie_element -> Year
        if (!props.seyQuery.loading && props.seyQuery.arms_filter.length !== 0) {
           // Update [State] list       
          this.props.onResetFilter6(props.seyQuery.arms_filter.state)
        }  

      } else if (props.tQuery) {

        // State - > 
        if (!props.tQuery.loading && props.tQuery.arms_filter.length !== 0) {
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
              blockIndex: blockCount,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
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

      } else if (props.tyQuery) {
        // State -> Year
        if (!props.tyQuery.loading && props.tyQuery.arms_filter.length !== 0) {
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
              blockIndex: blockCount,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
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

      } else if (props.tsQuery) {
        // State -> Serie
        if (!props.tsQuery.loading && props.tsQuery.arms_filter.length !== 0) {
          let series_element = []

          // Generate `Filter By/Sub` LHS menu
          const serie_element = props.tsQuery.arms_filter.serie_element[0].id
          props.tsQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            }
          }
          
          // update serie_element, and [Year] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter9(serie_element, props.tsQuery.arms_filter.year))
        }

      } else if (props.yQuery) {
        // Year - > 
        if (!props.yQuery.loading && props.yQuery.arms_filter.length !== 0) {
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
              blockIndex: blockCount,
              visible: true,
              headingTitle: 'Filter by'
            })
          } else {
            categoryTitles[3] = series
            sidebarItems[3] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
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

      } else if (props.ysQuery) {
        // Year -> Serie
        if (!props.ysQuery.loading && props.ysQuery.arms_filter.length !== 0) {
          let series_element = []
          
          // Generate `Filter By/Sub` LHS menu
          const serie_element = props.ysQuery.arms_filter.serie_element[0].id
          props.ysQuery.arms_filter.serie_element.forEach(element => {
            const obj = {}
            obj.num = element.id
            obj.header = element.name
            series_element.push(obj)
          })
          if (categoryTitles.length < 5) {
            categoryTitles.push(series_element)
            sidebarItems.push({
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            })
          } else {
            categoryTitles[4] = series_element
            sidebarItems[4] = {
              isOpened: false,
              selectedIndex: 0,
              isCategory: false,
              blockIndex: blockCount,
              visible: true,
              headingTitle: ''
            }
          }
          
          // update serie_element, [state] list
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems
          }, this.props.onResetFilter11(serie_element, props.ysQuery.arms_filter.state))
        }

      }
    }

    // if (categoryTitles.length === 0) {
    //   if (props.reports.length !== 0) {
    //     currentBlock = 0
        
    //     categoryTitles.push([
    //       {num: 0, header: 'Tailored Reports'},
    //       { num: 1, header: 'ARMS Data Analysis'}
    //     ])
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: true,
    //       blockIndex: blockCount,
    //       visible: true,  headingTitle: ''
    //     })

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
    //       blockIndex: blockCount,
    //       visible: true,
    //       headingTitle: 'Report'
    //     })

    //     let subjects = []
    //     props.subjects.forEach(subject => {
    //       const obj = {}
    //       obj.num = subject.num
    //       obj.header = subject.header
    //       subjects.push(obj)
    //     })
    //     categoryTitles.push(subjects)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: true,
    //       headingTitle: 'Subject'
    //     })

    //     let series = []
    //     props.series.forEach(serie => {
    //       const obj = {}
    //       obj.num = serie.abb
    //       obj.header = serie.header
    //       series.push(obj)
    //     })
    //     categoryTitles.push(series)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: true,
    //       headingTitle: 'Filter by'
    //     })

    //     let series_element = []
    //     const obj = {}
    //     obj.num = 0
    //     obj.header = 'Total'
    //     series_element.push(obj)
    //     categoryTitles.push(series_element)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: ''
    //     })

    //     blockCount++
    //     let datasource = []
    //     props.reports.forEach(report => {
    //       const obj = {}
    //       obj.num = report.num
    //       obj.header = report.header
    //       datasource.push(obj)
    //     })
    //     categoryTitles.push(datasource)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: 'Data Source'
    //     })

    //     let dataline = []
    //     props.topics[0].forEach(topic => {
    //       const obj = {}
    //       obj.num = topic.abb
    //       obj.header = topic.header
    //       dataline.push(obj)
    //     })
    //     categoryTitles.push(dataline)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: 'Data Line'})

    //     let farmtype = []
    //     props.subjects.forEach(subject => {
    //       const obj = {}
    //       obj.num = subject.num
    //       obj.header = subject.header
    //       farmtype.push(obj)
    //     })
    //     categoryTitles.push(farmtype)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: 'Farm Type'
    //     })

    //     let filter1 = []
    //     props.series.forEach(serie => {
    //       const obj = {}
    //       obj.num = serie.abb
    //       obj.header = serie.header
    //       filter1.push(obj)
    //     })
        
    //     categoryTitles.push(filter1)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: 'Filter1'
    //     })

    //     let subfilter1= []
    //     subfilter1.push(obj)
    //     categoryTitles.push(subfilter1)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: ''
    //     })

    //     let filter2 = []
    //     props.series2.forEach(serie2 => {
    //       const obj = {}
    //       obj.num = serie2.abb
    //       obj.header = serie2.header
    //       filter2.push(obj)
    //     })
    //     categoryTitles.push(filter2)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: 'Filter2'
    //     })

    //     let subfilter2= []
    //     subfilter2.push(obj)
    //     categoryTitles.push(subfilter2)
    //     sidebarItems.push({
    //       isOpened: false,
    //       selectedIndex: 0,
    //       isCategory: false,
    //       blockIndex: blockCount,
    //       visible: false,
    //       headingTitle: ''
    //     })

    //     let armsFilter = [{
    //       isFilter1: false,
    //       isSubFilter1: false,
    //       isFitler2: false
    //     }]

    //     this.setState({
    //       categoryTitles: categoryTitles,
    //       sidebarItems: sidebarItems,
    //       blockCount: blockCount,
    //       isArmsFilter: armsFilter
    //     })      
    //   }
      
    // } else if (!props.armsfilter.loading && categoryTitles.length !== 0){

    //   if (currentBlock === 0) {
    //     if (isSubFilterBy) {
    //       const index = 3
    //       let serie = []
    //       let serie_element = []

    //       categoryTitles[index+1] = []
    //       props.armsfilter.arms_filter1.serie_element.forEach(serie_element => {
    //         const obj = {}
    //         obj.num = serie_element.id  
    //         obj.header = serie_element.name
    //         categoryTitles[index+1].push(obj)     
    //       })

    //       sidebarItems[index+1].headingTitle = categoryTitles[index][sidebarItems[index].selectedIndex].header
    //       sidebarItems[index+1].selectedIndex = 0
    //       sidebarItems[index+1].isOpened = false

    //       if (categoryTitles[index][sidebarItems[index].selectedIndex].num !== 'farm' && categoryTitles[4].length !== 0) {
    //         sidebarItems[index+1].visible = true
    //         this.setState({
    //           categoryTitles: categoryTitles,
    //           sidebarItems: sidebarItems,
    //           blockCount: blockCount,
    //           isSubFilterBy: false
    //         }, props.onSelectSubFilterBy(categoryTitles[index+1][0].num))            
    //       } else {
    //         sidebarItems[index+1].visible = false
    //         this.setState({
    //           categoryTitles: categoryTitles,
    //           sidebarItems: sidebarItems,
    //           blockCount: blockCount,
    //           isSubFilterBy: false
    //         }, props.onSelectSubFilterBy(0))
    //       }
    //     }       
    //   } else {
    //     const index = 7*(currentBlock-1)
    //     let report_num =props.report_num, topic_abb = [], subject_num = props.subject_num, serie=props.serie, serie_element=[], serie2=[], serie2_element = []
        
    //     if (isArmsFilter[currentBlock-1].isFilter1) {  
          

    //       categoryTitles[index + 9] = []
    //       props.armsfilter.arms_filter1.serie_element.forEach(serie_element => {
    //         const obj = {}
    //         obj.num = serie_element.id  
    //         obj.header = serie_element.name
    //         categoryTitles[index + 9].push(obj)
    //       })

    //       sidebarItems[index + 9].selectedIndex = 0
    //       sidebarItems[index + 9].isOpened = false
    //       if (serie[0] !== 'farm' && categoryTitles[index + 9].length !== 0) {
    //         sidebarItems[index + 9].visible = true
    //         sidebarItems[index + 9].headingTitle = categoryTitles[index +8][sidebarItems[index+8].selectedIndex].header
    //         serie_element.push(categoryTitles[index+9][0].num)          
    //       } else {
    //         sidebarItems[index + 9].visible = false
    //         serie_element = [0]
    //       }

    //       categoryTitles[index + 10] = []
    //       props.armsfilter.arms_filter1.serie2.forEach(serie2 => {
    //         const obj = {}
    //         obj.num = serie2.abb  
    //         obj.header = serie2.header
    //         categoryTitles[index + 10].push(obj)
    //       })
    //       sidebarItems[index + 10].selectedIndex = 0
    //       sidebarItems[index + 10].isOpened = false
    //       if (categoryTitles[index + 10].length !== 0) {
    //         serie2.push(categoryTitles[index+10][0].num)
    //         sidebarItems[index + 10].visible = true            
    //       } else {
    //         sidebarItems[index + 10].visible = false
    //         serie2 = ['farm']
    //       }

    //       categoryTitles[index + 11] = []
    //       props.armsfilter.arms_filter1.serie2_element.forEach(serie2_element => {
    //         const obj = {}
    //         obj.num = serie2_element.id  
    //         obj.header = serie2_element.name
    //         categoryTitles[index +11].push(obj)
    //       })
    //       sidebarItems[index +11].selectedIndex = 0
    //       sidebarItems[index + 11].isOpened = false
    //       if (serie2[0] !== 'farm' && categoryTitles[index+11].length !== 0) {
    //         sidebarItems[index + 11].visible = true
    //         sidebarItems[index + 11].headingTitle = categoryTitles[index +10][0].header
    //         serie2_element.push(categoryTitles[index+10][0].num)            
    //       } else {
    //         sidebarItems[index + 11].visible = false
    //         serie2_element = [0]
    //       }

    //     } else if (isArmsFilter[currentBlock-1].isSubFilter1) {
    //       serie_element = props.serie_element
    //       categoryTitles[index + 10] = []
    //       props.armsfilter.arms_filter2.serie2.forEach(serie2 => {
    //         const obj = {}
    //         obj.num = serie2.abb  
    //         obj.header = serie2.header
    //         categoryTitles[index + 10].push(obj)
    //       })
    //       sidebarItems[index + 10].selectedIndex = 0
    //       sidebarItems[index + 10].isOpened = false
    //       if (categoryTitles[index + 10].length !== 0) {
    //         sidebarItems[index + 10].visible = true
    //         serie2.push(categoryTitles[index+10][0].num)           
    //       } else {
    //         sidebarItems[index + 10].visible = false
    //         serie2 = ['farm']
    //       }

    //       categoryTitles[index + 11] = []
    //       props.armsfilter.arms_filter2.serie2_element.forEach(serie2_element => {
    //         const obj = {}
    //         obj.num = serie2_element.id  
    //         obj.header = serie2_element.name
    //         categoryTitles[index +11].push(obj)
    //       })
    //       sidebarItems[index +11].selectedIndex = 0
    //       sidebarItems[index + 11].isOpened = false
    //       if (serie2[0] !== 'farm' && categoryTitles[index+11].length !== 0) {
    //         sidebarItems[index + 11].visible = true
    //         sidebarItems[index + 11].headingTitle = categoryTitles[index +10][0].header
    //         serie2_element.push(categoryTitles[index+10][0].num)            
    //       } else {
    //         sidebarItems[index + 11].visible = false
    //         serie2_element=[0]
    //       }
    //     } else if (isArmsFilter[currentBlock-1].isFitler2) {
    //       serie_element = props.serie_element
    //       serie2.push(categoryTitles[index+10][sidebarItems[index+10].selectedIndex].num)

    //       categoryTitles[index + 11] = []
    //       props.armsfilter.arms_subfilter2.serie2_element.forEach(serie2_element => {
    //         const obj = {}
    //         obj.num = serie2_element.id  
    //         obj.header = serie2_element.name
    //         categoryTitles[index +11].push(obj)
    //       })

    //       sidebarItems[index +11].selectedIndex = 0
    //       sidebarItems[index + 11].isOpened = false
    //       if (serie2[0] !== 'farm' && categoryTitles[index+11].length !== 0) {
    //         sidebarItems[index + 11].visible = true
    //         sidebarItems[index + 11].headingTitle = categoryTitles[index +10][sidebarItems[index+10].selectedIndex].header
    //         serie2_element.push(categoryTitles[index+11][0].num)           
    //       } else {
    //         sidebarItems[index + 11].visible = false
    //         serie2_element = [0]
    //       }
    //     }
    //     if(isArmsFilter[currentBlock-1].isFilter1 || isArmsFilter[currentBlock-1].isSubFilter1 || isArmsFilter[currentBlock-1].isFilter2) {
    //       isArmsFilter[currentBlock-1].isFilter1 = false
    //       isArmsFilter[currentBlock-1].isSubFilter1 = false
    //       isArmsFilter[currentBlock-1].isFilter2 = false
    //       topic_abb.push(categoryTitles[index+6][sidebarItems[index+6].selectedIndex].num)
    //       this.setState({
    //         categoryTitles: categoryTitles,
    //         sidebarItems: sidebarItems,
    //         isArmsFilter: isArmsFilter
    //       }, this.props.onSelectSubFilter2(report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element, currentBlock))
    //     }
    //   }
    // }
  }

  
  toggleCategoryOptions = (selectedItemIndex) => {    
    const { sidebarItems } =this.state    
    sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened       
    this.setState({ sidebarItems })
  }

  updateFilter = (sidebarItemIndex, selectedIndex) => {
    const { sidebarItems, categoryTitles, isArmsFilter} =this.state
    currentBlock = sidebarItems[sidebarItemIndex].blockIndex
    sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex
    if (sidebarItemIndex === 0) {
      // const count = sidebarItems.length
      // for (let i=0; i<count-12; i++) {
      //   sidebarItems.pop()
      //   categoryTitles.pop()
      // }
      // for (let i = 1; i<12; i++) {
      //   sidebarItems[i].visible = false
      //   sidebarItems[i].selectedIndex = 0          
      //   sidebarItems[i].isOpened = false
      // }
      // if (selectedIndex === 0) {
      //   currentBlock = 0
      //   isReports = true
      //   for (let i = 1; i<=3; i++) {  
      //     sidebarItems[i].visible = true
      //   }
      //   this.setState({sidebarItems, categoryTitles}, this.props.onSelectCategory(isReports))        
      // } else {        
      //   currentBlock = 1
      //   isReports = false
      //   for (let i = 5; i<=11; i++) {
      //     if (i !== 9 && i !== 11) {
      //       sidebarItems[i].visible = true
      //     }       
      //   }
      //   this.setState({sidebarItems, categoryTitles}, this.props.onSelectCategory(isReports)) 
      // }
    } else {

      if (sidebarItemIndex === 1) {
        const report_num = []
        const topic_abb = []
        report_num.push(categoryTitles[1][sidebarItems[1].selectedIndex].num)
        this.props.topics[sidebarItems[1].selectedIndex].forEach(topic => {
          topic_abb.push(topic.abb)
        })
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectReportFilter(report_num, topic_abb)) 
      } else if (sidebarItemIndex === 2) {
        const subject_num = []
        subject_num.push(categoryTitles[2][sidebarItems[2].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubjectFilter(subject_num)) 
      } else if (sidebarItemIndex === 3) {
        const serie = []
        serie.push(categoryTitles[3][sidebarItems[3].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectFilterByFilter(serie))
      } else if (sidebarItemIndex === 4) {
        const serie_element = []
        serie_element.push(categoryTitles[4][sidebarItems[4].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubFilterByFilter(serie_element))
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
    // let {categoryTitles, sidebarItems, blockCount, isArmsFilter} = this.state
    // blockCount++
    // currentBlock = blockCount
    // let datasource = []
    // this.props.reports.forEach(report => {
    //   const obj = {}
    //   obj.num = report.num
    //   obj.header = report.header
    //   datasource.push(obj)
    // })
    // categoryTitles.push(datasource)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Data Source"})

    // let dataline = []
    // this.props.topics[0].forEach(topic => {
    //   const obj = {}
    //   obj.num = topic.abb
    //   obj.header = topic.header
    //   dataline.push(obj)
    // })
    // categoryTitles.push(dataline)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Data Line"})

    // let farmtype = []
    // this.props.subjects.forEach(subject => {
    //   const obj = {}
    //   obj.num = subject.num
    //   obj.header = subject.header
    //   farmtype.push(obj)
    // })
    // categoryTitles.push(farmtype)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Farm Type"})

    // let filter1 = []
    // this.props.series.forEach(serie => {
    //   const obj = {}
    //   obj.num = serie.abb
    //   obj.header = serie.header
    //   filter1.push(obj)
    // })
    
    // categoryTitles.push(filter1)
    // sidebarItems.push({isOpened: false, selectedIndex: -0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter1"})

    // let subfilter1= []   
    // const obj = {}
    // obj.num = 0
    // obj.header = 'Total'
    // subfilter1.push(obj)
    
    // categoryTitles.push(subfilter1)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})

    // let filter2 = []
    // this.props.series2.forEach(serie2 => {
    //   const obj = {}
    //   obj.num = serie2.abb
    //   obj.header = serie2.header
    //   filter2.push(obj)
    // })
    // categoryTitles.push(filter2)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter2"})

    // let subfilter2= []
    // subfilter2.push(obj)
    // categoryTitles.push(subfilter2)
    // sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})
    // isArmsFilter.push({isFilter1: false, isSubFilter1: false, isFitler2: false, isSubFilter2: false})
    // this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: blockCount, isArmsFilter: isArmsFilter}, this.props.onSelectSubFilter2([1], ["kount"], [1], ['farm'], [0], ['farm'], [0], currentBlock))
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
  //     this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: 1}, this.props.onSelectCategory(isReports))
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
  sQuery,
  seQuery,
  seyQuery,
  setQuery,
  tQuery,
  tsQuery,
  tyQuery,
  tysQuery,
  yQuery,
  ysQuery
)(Sidebar)

