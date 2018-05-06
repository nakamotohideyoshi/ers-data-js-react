import React from 'react';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'
// import { selectLimit } from 'async';
import dlfTailored from '../../ApolloComponent/dlfTailored'
import dTailored from '../../ApolloComponent/dTailored'
import dlTailored from '../../ApolloComponent/dlTailored'
import dlrTailored from '../../ApolloComponent/dlrTailored'
import dlfsTailored from '../../ApolloComponent/dlfsTailored'
import dlfseTailored from '../../ApolloComponent/dlfseTailored'
import dlfsetTailored from '../../ApolloComponent/dlfsetTailored'
import dlfseyTailored from '../../ApolloComponent/dlfseyTailored'
import dlftTailored from '../../ApolloComponent/dlftTailored'
import dlftsTailored from '../../ApolloComponent/dlftsTailored'
import dlftyTailored from '../../ApolloComponent/dlftyTailored'
import dlftysTailored from '../../ApolloComponent/dlftysTailored'
import dlfyTailored from '../../ApolloComponent/dlfyTailored'
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
    
    if (props.runQuery.length !== 0) {

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
        console.log('props:', props[runQuery])
        switch (props.runQuery) {

          case 'dTailored':

            let topic_abb = []
            props[runQuery][runQuery].topic.forEach(topic => {
              topic_abb.push(topic.abb)
            })

            let sub_reports = this.generateSubReports(props[runQuery][runQuery].sub_report, currentBlock)
            let sub_report_num = 1
                      

            if (categoryTitles.length < 3) {

              categoryTitles.push(sub_reports.categoryTitle)
              sidebarItems.push(sub_reports.categoryTitle)

            } else {

              const prev_sub_report = categoryTitles[2].length !== 0 ? [categoryTitles[2][sidebarItems[2].selectedIndex].header] : ''
              const sub_report_current_index = this.updateSubReports(prev_sub_report, sub_reports.categoryTitle)

              sub_reports.sidebarItem.selectedIndex = 0

              if (sidebarItems[1].selectedIndex === 5) {
                sub_reports.sidebarItem.visible = true
                sub_reports.sidebarItem.selectedIndex = sub_report_current_index 
                sub_report_num = [sub_reports.categoryTitle[sub_report_current_index].num]
              }
             
              categoryTitles[2] = sub_reports.categoryTitle
              sidebarItems[2] = sub_reports.sidebarItem
              
              
            }

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.initialLoadingTailor(topic_abb, sub_report_num, currentBlock))

            break
          
          case 'dlTailored':
          case 'dlrTailored':

            let subject_num = [props[runQuery][runQuery].subject[0].num]       
            let subjects = this.generateSubjects(props[runQuery][runQuery].subject, currentBlock)

            if (categoryTitles.length < 4) {

              categoryTitles.push(subjects.categoryTitle)
              sidebarItems.push(subjects.sidebarItem)

            } else {

              const prev_subject = [categoryTitles[3][sidebarItems[3].selectedIndex].header]      
              const subject_current_index = this.updateSubjects(prev_subject, subjects.categoryTitle)
              subjects.sidebarItem.selectedIndex = subject_current_index

              if (subjects.categoryTitle.length === 1) {
                subjects.sidebarItem.visible = false
              } 

              categoryTitles[3] = subjects.categoryTitle
              sidebarItems[3] = subjects.sidebarItem

              subject_num = [subjects.categoryTitle[subject_current_index].num]
              
            }

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.onSelectSubjectFilter(subject_num, currentBlock))

            break
          
          case 'dlfTailored':
          case 'dlftTailored':
          case 'dlfyTailored':
          case 'dlftyTailored':

            let serie = [props[runQuery][runQuery].serie[0].abb]
            let series = this.generateSeries(props[runQuery][runQuery].serie, currentBlock)

            if (categoryTitles.length < 5) {

              categoryTitles.push(series.categoryTitle)
              sidebarItems.push(series.sidebarItem)

            } else  {
              
              const prev_serie = [categoryTitles[4][sidebarItems[4].selectedIndex].header]
              const current_index = this.updateSeries(prev_serie, series.categoryTitle)

              series.sidebarItem.selectedIndex = current_index

              categoryTitles[4] = series.categoryTitle
              sidebarItems[4] = series.sidebarItem

              serie = [series.categoryTitle[current_index].num]

            }

            if (props[runQuery][runQuery].year && props[runQuery][runQuery].state) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock
              }, props.resetSYRFilter(serie, props[runQuery][runQuery].year, props[runQuery][runQuery].state, currentBlock))

            } else if (props[runQuery][runQuery].year) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock
              }, props.resetSYFilter(serie, props[runQuery][runQuery].year, currentBlock))
              
            } else if (props[runQuery][runQuery].state) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock
              }, props.resetSRFilter(serie, props[runQuery][runQuery].state, currentBlock))

            } else {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock
              }, props.resetSFilter(serie, currentBlock))
              
            }

            break

          case 'dlftysTailored':
          case 'dlfsTailored':
          case 'dlfysTailored':
          case 'dlftsTailored':
            
            let series_element = this.generateElements(props[runQuery][runQuery].serie_element, currentBlock)
            let serie_element = series_element.serie_element

            if (categoryTitles.length < 6) {

              categoryTitles.push(series_element.categoryTitle)
              sidebarItems.push(series_element.sidebarItem)

            } else {

              const prev_serie_element = [categoryTitles[5][sidebarItems[5].selectedIndex].header]
              const current_index = this.updateElements(prev_serie_element, series_element.categoryTitle)

              series_element.sidebarItem.selectedIndex = current_index
              
              if (series_element.categoryTitle[current_index].num !== 0) {
                serie_element = [series_element.categoryTitle[current_index].num]
              }

              categoryTitles[5] = series_element.categoryTitle
              sidebarItems[5] = series_element.sidebarItem

            }

            sidebarItems[5].headingTitle = categoryTitles[4][sidebarItems[4].selectedIndex].header
            if (props[runQuery][runQuery].serie_element.length === 1 && props[runQuery][runQuery].serie_element[0].id === 0) {
              sidebarItems[5].visible = false
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
          case 'dlfseyTailored':
          case 'dlfsetTailored':
            
            if (props[runQuery][runQuery].year && props[runQuery][runQuery].state) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetYRFilter(props[runQuery][runQuery].year, props[runQuery][runQuery].state, currentBlock))

            } else if (props[runQuery][runQuery].year) {

              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetYFilter(props[runQuery][runQuery].year, currentBlock))

            } else if (props[runQuery][runQuery].state) {
              this.setState({
                categoryTitles,
                sidebarItems,
                currentBlock,
              }, props.resetRFilter(props[runQuery][runQuery].state, currentBlock))
            }
            
            break

          case 'dAnalysis':

            let reports = this.generateReports(props.reports, currentBlock)
            reports.sidebarItem.headingTitle = 'Data Source' + currentBlock
            let topics = this.generateDataLine(props[runQuery][runQuery].topic, currentBlock)
            subjects = this.generateSubjects(props[runQuery][runQuery].subject, currentBlock)
            subjects.sidebarItem.headingTitle = 'Farm Type'

            let index = 7*(currentBlock-1) + 5

            if (categoryTitles.length<index+1) {
              categoryTitles.push(reports.categoryTitle)
              categoryTitles.push(topics.categoryTitle)
              categoryTitles.push(subjects.categoryTitle)

              sidebarItems.push(reports.sidebarItem)
              sidebarItems.push(topics.sidebarItem)
              sidebarItems.push(subjects.sidebarItem)
            } else {

            }

            if (subjects.categoryTitle.length === 1) {
              sidebarItems[index+2].visible = false
            }

            topic_abb = [categoryTitles[index+1][0].num]
            subject_num = [categoryTitles[index+2][0].num]

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.initialBlockLoadAnalysis(topic_abb, subject_num, currentBlock))
            
            break

          case 'dlfAnalysis':
            
            serie = [props[runQuery][runQuery].serie[0].abb]

            series = this.generateSeries(props[runQuery][runQuery].serie, currentBlock)
            series.sidebarItem.headingTitle = 'Filter1'

            index = 7*(currentBlock-1) + 8

            if (categoryTitles.length < index+1) {

              categoryTitles.push(series.categoryTitle)
              sidebarItems.push(series.sidebarItem)

            } else  {
              
              const prev_serie = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
              const current_index = this.updateSeries(prev_serie, series.categoryTitle)
              series.sidebarItem.selectedIndex = current_index

              categoryTitles[index] = series.categoryTitle
              sidebarItems[index] = series.sidebarItem

              serie = [series.categoryTitle[current_index].num]

            }

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.selectFilter1Analysis(serie, currentBlock))

            break

          case 'dlfsAnalysis':

            series_element = this.generateElements(props[runQuery][runQuery].serie_element, currentBlock)
            serie_element = series_element.serie_element

            index = 7*(currentBlock-1) + 9

            if (categoryTitles.length < index+1) {

              categoryTitles.push(series_element.categoryTitle)
              sidebarItems.push(series_element.sidebarItem)

            } else {

              const prev_serie_element = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
              const current_index = this.updateElements(prev_serie_element, series_element.categoryTitle)
              series_element.sidebarItem.selectedIndex = current_index
              
              if (series_element.categoryTitle[current_index].num !== 0) {
                serie_element = [series_element.categoryTitle[current_index].num]
              }

              categoryTitles[index] = series_element.categoryTitle
              sidebarItems[index] = series_element.sidebarItem

            }

            sidebarItems[index].headingTitle = categoryTitles[index-1][sidebarItems[index-1].selectedIndex].header

            if (props[runQuery][runQuery].serie_element.length === 1 && props[runQuery][runQuery].serie_element[0].id === 0) {
              sidebarItems[index].visible = false
            }
            
            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.selectSubFilter1Analysis(serie_element, currentBlock))

            break

          case 'dlfseAnalysis':

            serie = [props[runQuery][runQuery].serie2[0].abb]
            series = this.generateSeries(props[runQuery][runQuery].serie2, currentBlock)
            series.sidebarItem.headingTitle = 'Filter2'

            index = 7*(currentBlock-1) + 10
            const serie_element_num = sidebarItems[index-1].selectedIndex

            if (categoryTitles.length < index+1) {

              categoryTitles.push(series.categoryTitle)
              sidebarItems.push(series.sidebarItem)

            } else {
              const prev_serie = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
              let current_index = this.updateSeries(prev_serie, series.categoryTitle)

              if (serie_element_num === 0) {
                current_index = 0
              }
              series.sidebarItem.selectedIndex = current_index

              categoryTitles[index] = series.categoryTitle
              sidebarItems[index] = series.sidebarItem

              serie = [series.categoryTitle[current_index].num]
            }

            if (serie_element === 0) {
              sidebarItems[index].visible = false
            }
            
            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.selectFilter2Analysis(serie, currentBlock))

            break

          case 'dlfsesAnalysis':

            series_element = this.generateElements(props[runQuery][runQuery].serie2_element, currentBlock)
            serie_element = series_element.serie_element

            index = 7*(currentBlock-1) + 11

            if (categoryTitles.length < index+1) {

              categoryTitles.push(series_element.categoryTitle)
              sidebarItems.push(series_element.sidebarItem)

            } else {
              const prev_serie_element = [categoryTitles[index][sidebarItems[index].selectedIndex].header]
              const current_index = this.updateElements(prev_serie_element, series_element.categoryTitle)
              series_element.sidebarItem.selectedIndex = current_index
              
              if (series_element.categoryTitle[current_index].num !== 0) {
                serie_element = [series_element.categoryTitle[current_index].num]
              }

              categoryTitles[index] = series_element.categoryTitle
              sidebarItems[index] = series_element.sidebarItem

            }

            sidebarItems[index].headingTitle = categoryTitles[index-1][sidebarItems[index-1].selectedIndex].header

            if (props[runQuery][runQuery].serie2_element.length === 1 && props[runQuery][runQuery].serie2_element[0].id === 0) {
              sidebarItems[index].visible = false
            }

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.selectSubFilter2Analysis(serie_element, currentBlock))

            break

          case 'dlfseseyAnalysis':
          case 'dlfsesetyAnalysis':

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.selectYearAnalysis(props[runQuery][runQuery].year))

            break

          case 'dlfsesetAnalysis':
          case 'dlfseseytAnalysis':

            this.setState({
              categoryTitles,
              sidebarItems,
              currentBlock
            }, props.selectStateAnalysis(props[runQuery][runQuery].state))

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

  generateSubReports(sub_reports, currentBlock) {

    const categoryTitle = []

    sub_reports.forEach(report => {
      const obj = {}
      obj.num = report.id
      obj.header = report.name
      categoryTitle.push(obj)
    })

    const sidebarItem = {
      isOpened: false,
      selectedIndex: 0,
      isCategory: false,
      blockIndex: currentBlock,
      visible: false,
      headingTitle: 'Sub Reports'
    }

    return { categoryTitle, sidebarItem }

  }

  updateSubReports(prev_sub_report, sub_reports) {
    let current_index = 0

    if (!this.props.isReset) {
      sub_reports.forEach((sub_report, i) => {
        if (prev_sub_report.indexOf(sub_report.header) > -1) {
          current_index = i
        }
      })
    }

    return current_index
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

  generateDataSource(reports, currentBlock) {
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
      headingTitle: 'Data Source ' + currentBlock 
    }

    return { categoryTitle, sidebarItem }

  }

  generateDataLine(topics, currentBlock) {
    const categoryTitle = []

    topics.forEach(topic => {
      const obj = {}
      obj.num = topic.abb
      obj.header = topic.header
      categoryTitle.push(obj)
    })

    const sidebarItem = {
      isOpened: false,
      selectedIndex: [0],
      isCategory: false,
      blockIndex: currentBlock,
      visible: true,
      headingTitle: 'Data Line'
    }

    return { categoryTitle, sidebarItem }

  }

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
        
        isReports = false
        this.setState({
          sidebarItems,
          isReports,
          currentBlock
        }, this.props.selectAnalysisCategory())
      }
    } else {

      if (sidebarItemIndex === 1) {

        // Tailored Report/Report
        const report_num = []
        report_num.push(categoryTitles[1][sidebarItems[1].selectedIndex].num)

        this.setState({sidebarItems, categoryTitles}, this.props.onSelectReportFilter(report_num, currentBlock))

      } else if (sidebarItemIndex === 2) {

        const sub_report = []
        sub_report.push(categoryTitles[2][sidebarItems[2].selectedIndex].num)

        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubReportFilter(sub_report, currentBlock))
      } else if (sidebarItemIndex === 3) {

        // Tailored Report/Subject
        const subject_num = []
        subject_num.push(categoryTitles[3][sidebarItems[3].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectSubjectFilter(subject_num, currentBlock))

      } else if (sidebarItemIndex === 4) {

        // Tailored Report/Filter By
        const serie = []
        serie.push(categoryTitles[4][sidebarItems[4].selectedIndex].num)
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectFilterByFilter(serie, currentBlock))

      } else if (sidebarItemIndex === 5) {

        // Tailoared Reort/Sub Filter By
        const serie_element = []
        if (selectedIndex !== 0) {
          serie_element.push(categoryTitles[5][sidebarItems[5].selectedIndex].num)
        } else {
          for (let i = 1; i<categoryTitles[5].length; i++) {
            serie_element.push(categoryTitles[5][i].num)
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
      this.setState({blockCount, currentBlock}, this.props.addDataSource(currentBlock))
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
            if ((i-12)%8 === 1) {
              isRemoval = true
            }else if ((i-5)%8 === 2){
              isDataReset = true
            } else if ((i-5)%8 === 0) {
              isBlock = true
            }
            if ((i-6)%8===1) {
              isDataLine = true
            }
            if ((i-5)/8>7) {
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
  dTailored,
  dlTailored,
  dlrTailored,
  dlfTailored,
  dlfsTailored,
  dlfseTailored,
  dlfseyTailored,
  dlfsetTailored,
  dlftTailored,
  dlftsTailored,
  dlftyTailored,
  dlftysTailored,
  dlfyTailored,
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

