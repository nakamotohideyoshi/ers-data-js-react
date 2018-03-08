import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'
import armsfilter from '../../ApolloComponent/armsQuery'
import { selectLimit } from 'async';


let isReports = true
let isDataReset = false
let isRemoval = false

class Sidebar extends React.Component {

  state = {
    isCategoryOpened: false,
    sidebarItems: [],
    categoryTitles: [],
    blockCount: -1,
    currentBlock: -1
    
  }  
  
  componentWillReceiveProps(props) {
    console.log('-------', props)
    let {categoryTitles, sidebarItems, blockCount, currentBlock} = this.state
    if (categoryTitles.length === 0) {
      if (props.reports.length !== 0 && props.subjects.length !== 0  && props.series.length !== 0) {
        isRemoval = false
        blockCount++
        currentBlock++
        categoryTitles.push([{num: 0, header: 'Tailored Reports'},{ num: 1, header: 'ARMS Data Analysis'}])
        sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: true,  blockIndex: blockCount, visible: true,  headingTitle: ''})

        let reports = []
        props.reports.forEach(report => {
          const obj = {}
          obj.num = report.num
          obj.header = report.header
          reports.push(obj)
        })
        categoryTitles.push(reports)
        sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: 'Report'})

        let subjects = []
        props.subjects.forEach(subject => {
          const obj = {}
          obj.num = subject.num
          obj.header = subject.header
          subjects.push(obj)
        })
        categoryTitles.push(subjects)
        sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Subject"})

        let series = []
        props.series.forEach(serie => {
          const obj = {}
          obj.num = serie.abb
          obj.header = serie.header
          series.push(obj)
        })
        categoryTitles.push(series)
        sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter by"})

        let series_element = []
        props.series_element.forEach(serie_element => {
          const obj = {}
          obj.num = serie_element.id  
          obj.header = serie_element.name
          series_element.push(obj)     
        })
        categoryTitles.push(series_element)
        sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})

        blockCount++
        let datasource = []
        props.reports.forEach(report => {
          const obj = {}
          obj.num = report.num
          obj.header = report.header
          datasource.push(obj)
        })
        categoryTitles.push(datasource)
        sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: "Data Source"})

        let dataline = []
        props.topics.forEach(topic => {
          const obj = {}
          obj.num = topic.abb
          obj.header = topic.header
          dataline.push(obj)
        })
        categoryTitles.push(dataline)
        sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: "Data Line"})

        let farmtype = []
        props.subjects.forEach(subject => {
          const obj = {}
          obj.num = subject.num
          obj.header = subject.header
          farmtype.push(obj)
        })
        categoryTitles.push(farmtype)
        sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: "Farm Type"})

        let filter1 = []
        props.series.forEach(serie => {
          const obj = {}
          obj.num = serie.abb
          obj.header = serie.header
          filter1.push(obj)
        })
        
        categoryTitles.push(filter1)
        sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: "Filter1"})

        let subfilter1= []
        props.series_element.forEach(serie_element => {
          const obj = {}
          obj.num = serie_element.id
          obj.header = serie_element.name
          subfilter1.push(obj)
        })
        categoryTitles.push(subfilter1)
        sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})

        let filter2 = []
        props.series2.forEach(serie2 => {
          const obj = {}
          obj.num = serie2.abb
          obj.header = serie2.header
          filter2.push(obj)
        })
        categoryTitles.push(filter2)
        sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: "Filter2"})

        let subfilter2= []
        props.series2_element.forEach(serie2_element => {
          const obj = {}
          obj.num = serie2_element.id
          obj.header = serie2_element.name
          subfilter2.push(obj)
        })
        categoryTitles.push(subfilter2)
        sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})
      }

    } 
    
    if (!props.armsfilter.loading && categoryTitles.length !== 0){
      if (props.armsfilter.arms_filter.serie_element.length !== 0 ) {
        if (currentBlock === 0) {
          const topics = []
          props.armsfilter.arms_filter.topic.forEach(topic => {
            topics.push(topic.abb)
          })
          props.onSelectTopic(topics)
          categoryTitles[4] = []
          props.armsfilter.arms_filter.serie_element.forEach(serie_element => {
            const obj = {}
            obj.num = serie_element.id  
            obj.header = serie_element.name
            categoryTitles[4].push(obj)     
          })
          sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
          sidebarItems[4].selectedIndex = -1
          if (categoryTitles[3][sidebarItems[3].selectedIndex].num !== 'farm') {
            sidebarItems[4].visible = true
          } else {            
            sidebarItems[4].isOpened = false
            sidebarItems[4].visible = false
            props.onSelectSubFilterBy(0)
          }
        } else {
          categoryTitles[7*(currentBlock-1) + 6] = []
          props.armsfilter.arms_filter.topic.forEach(topic => {
            const obj = {}
            obj.num = topic.abb
            obj.header = topic.header
            categoryTitles[7*(currentBlock-1) + 6].push(obj)
          })          
          sidebarItems[7*(currentBlock-1) + 6].selectedIndex = -1

          categoryTitles[7*(currentBlock-1) + 9] = []
          props.armsfilter.arms_filter.serie_element.forEach(serie_element => {
            const obj = {}
            obj.num = serie_element.id  
            obj.header = serie_element.name
            categoryTitles[7*(currentBlock-1) + 9].push(obj)
          })
          sidebarItems[7*(currentBlock-1) + 9].selectedIndex = -1

          categoryTitles[7*(currentBlock-1) + 11] = []
          props.armsfilter.arms_filter.serie2_element.forEach(serie2_element => {
            const obj = {}
            obj.num = serie2_element.id  
            obj.header = serie2_element.name
            categoryTitles[7*(currentBlock-1) +11].push(obj)
          })
          sidebarItems[7*(currentBlock-1) +11].selectedIndex = -1
        }       
      }

    }
    this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: blockCount, currentBlock: currentBlock})

  }

  
  toggleCategoryOptions = (selectedItemIndex) => {
    
    const { sidebarItems } =this.state
    console.log('toggle', sidebarItems[selectedItemIndex].selectedIndex)
    if (sidebarItems[selectedItemIndex].selectedIndex === -1 || selectedItemIndex === 0) {
      sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened
    }   
    this.setState({ sidebarItems })
  }

  updateFilter = (sidebarItemIndex, selectedIndex) => {
    const { sidebarItems, categoryTitles } =this.state
    const currentBlock = sidebarItems[sidebarItemIndex].blockIndex
    sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex
    sidebarItems[sidebarItemIndex].isOpened = false
    if (sidebarItemIndex === 0) {
      const count = sidebarItems.length
      if (sidebarItems.length > 12) {
        for (let i = 12; i<count; i++) {
          sidebarItems.pop()
          categoryTitles.pop()
        }        
      }
      if (selectedIndex === 0) {
        isReports = true
        
      } else {
        isReports = false
      }
      for (let i =1; i<12; i++) {
        
          sidebarItems[i].isOpened = false          
          sidebarItems[i].selectedIndex = -2
          sidebarItems[i].visible = false
          if((isReports && (i === 1 || i ===2 || i === 3)) || (!isReports && (i == 5 || i === 6 || i === 7 || i === 8 || i === 10))) {
            sidebarItems[i].visible = true
          }          
          if (i === 1 || i === 2 || i === 5 || i === 7 || i === 8 || i === 10) {
            sidebarItems[i].selectedIndex = -1            
          }
        
      }    
      
      this.props.onSelectCategory(true)
    } else {
      const num = categoryTitles[sidebarItemIndex][selectedIndex].num

      if (sidebarItemIndex === 1) {
        if (sidebarItems[2].selectedIndex !== -1) {
          sidebarItems[3].selectedIndex = -1
        }        
        this.props.onSelectReport(num)       
        
      } else if (sidebarItemIndex === 2) {
        if (sidebarItems[1].selectedIndex !== -1) {
          sidebarItems[3].selectedIndex = -1
        }
        this.props.onSelectSubject(num)
      } else if (sidebarItemIndex === 3) {
        this.props.onSelectFilterBy(num)
      } else if (sidebarItemIndex === 4) {
        this.props.onSelectSubFilterBy(num)
      } else{
        // let report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element = []
        // if (sidebarItems[5+7*(currentBlock-1)].selectedIndex > -1) {
        //   report_num.push(categoryTitles[5+7*(currentBlock-1)][sidebarItems[5+7*(currentBlock-1)].selectedIndex].num)
        // } else if (sidebarItems[6+7*(currentBlock-1)].selectedIndex > -1) {
        //   topic_abb.push(categoryTitles[6+7*(currentBlock-1)][sidebarItems[6+7*(currentBlock-1)].selectedIndex].num)
        // } else if (sidebarItems[7+7*(currentBlock-1)].selectedIndex > -1) {
        //   report_num.push(categoryTitles[7+7*(currentBlock-1)][sidebarItems[7+7*(currentBlock-1)].selectedIndex].num)
        // } else if (sidebarItems[8+7*(currentBlock-1)].selectedIndex > -1) {
        //   report_num.push(categoryTitles[8+7*(currentBlock-1)][sidebarItems[8+7*(currentBlock-1)].selectedIndex].num)
        // } else if (sidebarItems[9+7*(currentBlock-1)].selectedIndex > -1) {
        //   report_num.push(categoryTitles[9+7*(currentBlock-1)][sidebarItems[9+7*(currentBlock-1)].selectedIndex].num)
        // } else if (sidebarItems[10+7*(currentBlock-1)].selectedIndex > -1) {
        //   report_num.push(categoryTitles[10+7*(currentBlock-1)][sidebarItems[10+7*(currentBlock-1)].selectedIndex].num)
        // } else if (sidebarItems[11+7*(currentBlock-1)].selectedIndex > -1) {
        //   report_num.push(categoryTitles[11+7*(currentBlock-1)][11].num)
        // }
        // this.onSelectArmsFilter(report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element)

      }
    }
    // this.toggleCategoryOptions(sidebarItemIndex)
    this.setState({sidebarItems, categoryTitles, currentBlock})
  }

  removeDataSource () {
    let {categoryTitles, sidebarItems, blockCount} = this.state
    const count = sidebarItems.length
    if (blockCount > 1) {
      blockCount--
      if (blockCount === 1){
        isRemoval = false
      }
      for (let i=count-1; i>count-8; i--) {
        sidebarItems.pop()
        categoryTitles.pop()
      }
    }
    this.setState({categoryTitles, sidebarItems, blockCount})
  }

  addDataSource() {
    let {categoryTitles, sidebarItems, blockCount} = this.state
    blockCount++
    isRemoval = true
    let datasource = []
    this.props.reports.forEach(report => {
      const obj = {}
      obj.num = report.num
      obj.header = report.header
      datasource.push(obj)
    })
    categoryTitles.push(datasource)
    sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Data Source"})

    let dataline = []
    this.props.topics.forEach(topic => {
      const obj = {}
      obj.num = topic.abb
      obj.header = topic.header
      dataline.push(obj)
    })
    categoryTitles.push(dataline)
    sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Data Line"})

    let farmtype = []
    this.props.subjects.forEach(subject => {
      const obj = {}
      obj.num = subject.num
      obj.header = subject.header
      farmtype.push(obj)
    })
    categoryTitles.push(farmtype)
    sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Farm Type"})

    let filter1 = []
    this.props.series.forEach(serie => {
      const obj = {}
      obj.num = serie.abb
      obj.header = serie.header
      filter1.push(obj)
    })
    
    categoryTitles.push(filter1)
    sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter1"})

    let subfilter1= []
    this.props.series_element.forEach(serie_element => {
      const obj = {}
      obj.num = serie_element.id
      obj.header = serie_element.name
      subfilter1.push(obj)
    })
    categoryTitles.push(subfilter1)
    sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})

    let filter2 = []
    this.props.series2.forEach(serie2 => {
      const obj = {}
      obj.num = serie2.abb
      obj.header = serie2.header
      filter2.push(obj)
    })
    categoryTitles.push(filter2)
    sidebarItems.push({isOpened: false, selectedIndex: -1, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter2"})

    let subfilter2= []
    this.props.series2_element.forEach(serie2_element => {
      const obj = {}
      obj.num = serie2_element.id
      obj.header = serie2_element.name
      subfilter2.push(obj)
    })
    categoryTitles.push(subfilter2)
    sidebarItems.push({isOpened: false, selectedIndex: -2, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})
    this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: blockCount})
  }

  resetFilter = ( blockIndex ) => {
    console.log('block', blockIndex)
    if(blockIndex === 0) {
      this.updateFilter(0, 0)
    } else {
      this.updateFilter(0,1)
    }
    
  }
  
  render() {
    const {sidebarItems, categoryTitles, blockCount} = this.state
    console.log(this.state)
    return (
    <Col sm={3} md={3} xs={12} className="sidebar-container">
      {        
        sidebarItems.map((val, i) => {
          let isBlock = false
          isDataReset = false
          if (i === 6){
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
            />
          )
        })
      }
      {
        !isReports && isRemoval && (
          <div>
            <a className="pull-right reset" onClick={() => this.removeDataSource()}>
              <img src={Reset} alt="" />Remove
            </a>
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

export default armsfilter(Sidebar)

