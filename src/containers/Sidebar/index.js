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

    let {categoryTitles, sidebarItems, blockCount, isSubFilterBy, isArmsFilter} = this.state

    if (categoryTitles.length === 0) {
      if (props.reports.length !== 0) {
        
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

        let series = []
        props.series.forEach(serie => {
          const obj = {}
          obj.num = serie.abb
          obj.header = serie.header
          series.push(obj)
        })
        categoryTitles.push(series)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: true,
          headingTitle: 'Filter by'
        })

        let series_element = []
        const obj = {}
        obj.num = 0
        obj.header = 'Total'
        series_element.push(obj)
        categoryTitles.push(series_element)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: ''
        })

        blockCount++
        let datasource = []
        props.reports.forEach(report => {
          const obj = {}
          obj.num = report.num
          obj.header = report.header
          datasource.push(obj)
        })
        categoryTitles.push(datasource)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: 'Data Source'
        })

        let dataline = []
        props.topics[0].forEach(topic => {
          const obj = {}
          obj.num = topic.abb
          obj.header = topic.header
          dataline.push(obj)
        })
        categoryTitles.push(dataline)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: 'Data Line'})

        let farmtype = []
        props.subjects.forEach(subject => {
          const obj = {}
          obj.num = subject.num
          obj.header = subject.header
          farmtype.push(obj)
        })
        categoryTitles.push(farmtype)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: 'Farm Type'
        })

        let filter1 = []
        props.series.forEach(serie => {
          const obj = {}
          obj.num = serie.abb
          obj.header = serie.header
          filter1.push(obj)
        })
        
        categoryTitles.push(filter1)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: 'Filter1'
        })

        let subfilter1= []
        subfilter1.push(obj)
        categoryTitles.push(subfilter1)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: ''
        })

        let filter2 = []
        props.series2.forEach(serie2 => {
          const obj = {}
          obj.num = serie2.abb
          obj.header = serie2.header
          filter2.push(obj)
        })
        categoryTitles.push(filter2)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: 'Filter2'
        })

        let subfilter2= []
        subfilter2.push(obj)
        categoryTitles.push(subfilter2)
        sidebarItems.push({
          isOpened: false,
          selectedIndex: 0,
          isCategory: false,
          blockIndex: blockCount,
          visible: false,
          headingTitle: ''
        })

        let armsFilter = [{
          isFilter1: false,
          isSubFilter1: false,
          isFitler2: false
        }]

        this.setState({
          categoryTitles: categoryTitles,
          sidebarItems: sidebarItems,
          blockCount: blockCount,
          isArmsFilter: armsFilter
        })      
      }
      
    } else if (!props.armsfilter.loading && categoryTitles.length !== 0){

      if (currentBlock === 0) {
        if (isSubFilterBy) {
          const index = 3
          let serie = []
          let serie_element = []

          categoryTitles[index+1] = []
          props.armsfilter.report.serie_element.forEach(serie_element => {
            const obj = {}
            obj.num = serie_element.id  
            obj.header = serie_element.name
            categoryTitles[index+1].push(obj)     
          })

          sidebarItems[index+1].headingTitle = categoryTitles[index][sidebarItems[index].selectedIndex].header
          sidebarItems[index+1].selectedIndex = 0
          sidebarItems[index+1].isOpened = false

          if (categoryTitles[index][sidebarItems[index].selectedIndex].num !== 'farm' && categoryTitles[4].length !== 0) {
            sidebarItems[index+1].visible = true
            this.setState({
              categoryTitles: categoryTitles,
              sidebarItems: sidebarItems,
              blockCount: blockCount,
              isSubFilterBy: false
            }, props.onSelectSubFilterBy(categoryTitles[index+1][0].num))            
          } else {
            sidebarItems[index+1].visible = false
            this.setState({
              categoryTitles: categoryTitles,
              sidebarItems: sidebarItems,
              blockCount: blockCount,
              isSubFilterBy: false
            }, props.onSelectSubFilterBy(0))
          }
        }       
      } else {
        const index = 7*(currentBlock-1)
        let report_num =props.report_num, topic_abb = [], subject_num = props.subject_num, serie=props.serie, serie_element=[], serie2=[], serie2_element = []
        topic_abb.push(categoryTitles[index+6][sidebarItems[index+6].selectedIndex].num)
        if (isArmsFilter[currentBlock-1].isFilter1) {    

          categoryTitles[index + 9] = []
          props.armsfilter.report.serie_element.forEach(serie_element => {
            const obj = {}
            obj.num = serie_element.id  
            obj.header = serie_element.name
            categoryTitles[index + 9].push(obj)
          })

          sidebarItems[index + 9].selectedIndex = 0
          sidebarItems[index + 9].isOpened = false
          if (serie[0] !== 'farm' && categoryTitles[index + 9].length !== 0) {
            sidebarItems[index + 9].visible = true
            sidebarItems[index + 9].headingTitle = categoryTitles[index +8][sidebarItems[index+8].selectedIndex].header
            serie_element.push(categoryTitles[index+9][0].num)          
          } else {
            sidebarItems[index + 9].visible = false
            serie_element = [0]
          }

          categoryTitles[index + 10] = []
          props.armsfilter.report.serie2.forEach(serie2 => {
            const obj = {}
            obj.num = serie2.abb  
            obj.header = serie2.header
            categoryTitles[index + 10].push(obj)
          })
          sidebarItems[index + 10].selectedIndex = 0
          sidebarItems[index + 10].isOpened = false
          if (categoryTitles[index + 10].length !== 0) {
            serie2.push(categoryTitles[index+10][0].num)
            sidebarItems[index + 10].visible = true            
          } else {
            sidebarItems[index + 10].visible = false
            serie2 = ['farm']
          }

          categoryTitles[index + 11] = []
          props.armsfilter.report.serie2_element.forEach(serie2_element => {
            const obj = {}
            obj.num = serie2_element.id  
            obj.header = serie2_element.name
            categoryTitles[index +11].push(obj)
          })
          sidebarItems[index +11].selectedIndex = 0
          sidebarItems[index + 11].isOpened = false
          if (serie2[0] !== 'farm' && categoryTitles[index+11].length !== 0) {
            sidebarItems[index + 11].visible = true
            sidebarItems[index + 11].headingTitle = categoryTitles[index +10][0].header
            serie2_element.push(categoryTitles[index+10][0].num)            
          } else {
            sidebarItems[index + 11].visible = false
            serie2_element = [0]
          }

        } else if (isArmsFilter[currentBlock-1].isSubFilter1) {
          serie_element = props.serie_element
          categoryTitles[index + 10] = []
          props.armsfilter.arms_filter2.serie2.forEach(serie2 => {
            const obj = {}
            obj.num = serie2.abb  
            obj.header = serie2.header
            categoryTitles[index + 10].push(obj)
          })
          sidebarItems[index + 10].selectedIndex = 0
          sidebarItems[index + 10].isOpened = false
          if (categoryTitles[index + 10].length !== 0) {
            sidebarItems[index + 10].visible = true
            serie2.push(categoryTitles[index+10][0].num)           
          } else {
            sidebarItems[index + 10].visible = false
            serie2 = ['farm']
          }

          categoryTitles[index + 11] = []
          props.armsfilter.arms_filter2.serie2_element.forEach(serie2_element => {
            const obj = {}
            obj.num = serie2_element.id  
            obj.header = serie2_element.name
            categoryTitles[index +11].push(obj)
          })
          sidebarItems[index +11].selectedIndex = 0
          sidebarItems[index + 11].isOpened = false
          if (serie2[0] !== 'farm' && categoryTitles[index+11].length !== 0) {
            sidebarItems[index + 11].visible = true
            sidebarItems[index + 11].headingTitle = categoryTitles[index +10][0].header
            serie2_element.push(categoryTitles[index+10][0].num)            
          } else {
            sidebarItems[index + 11].visible = false
            serie2_element=[0]
          }
        } else if (isArmsFilter[currentBlock-1].isFitler2) {
          serie_element = props.serie_element
          serie2.push(categoryTitles[index+10][sidebarItems[index+10].selectedIndex].num)

          categoryTitles[index + 11] = []
          props.armsfilter.arms_subfilter2.serie2_element.forEach(serie2_element => {
            const obj = {}
            obj.num = serie2_element.id  
            obj.header = serie2_element.name
            categoryTitles[index +11].push(obj)
          })

          sidebarItems[index +11].selectedIndex = 0
          sidebarItems[index + 11].isOpened = false
          if (serie2[0] !== 'farm' && categoryTitles[index+11].length !== 0) {
            sidebarItems[index + 11].visible = true
            sidebarItems[index + 11].headingTitle = categoryTitles[index +10][sidebarItems[index+10].selectedIndex].header
            serie2_element.push(categoryTitles[index+11][0].num)           
          } else {
            sidebarItems[index + 11].visible = false
            serie2_element = [0]
          }
        }
        if(isArmsFilter[currentBlock-1].isFilter1 || isArmsFilter[currentBlock-1].isSubFilter1 || isArmsFilter[currentBlock-1].isFilter2) {
          isArmsFilter[currentBlock-1].isFilter1 = false
          isArmsFilter[currentBlock-1].isSubFilter1 = false
          isArmsFilter[currentBlock-1].isFilter2 = false
          this.setState({
            categoryTitles: categoryTitles,
            sidebarItems: sidebarItems,
            isArmsFilter: isArmsFilter
          }, this.props.onSelectSubFilter2(report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element))
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
    const { sidebarItems, categoryTitles, isArmsFilter} =this.state
    currentBlock = sidebarItems[sidebarItemIndex].blockIndex
    sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex
    if (sidebarItemIndex === 0) {
      const count = sidebarItems.length
      for (let i=0; i<count-12; i++) {
        sidebarItems.pop()
        categoryTitles.pop()
      }
      for (let i = 1; i<12; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0          
        sidebarItems[i].isOpened = false
      }
      if (selectedIndex === 0) {
        currentBlock = 0
        isReports = true
        for (let i = 1; i<=3; i++) {  
          sidebarItems[i].visible = true
        }
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectCategory(isReports))        
      } else {        
        currentBlock = 1
        isReports = false
        for (let i = 5; i<=11; i++) {
          if (i !== 9 && i !== 11) {
            sidebarItems[i].visible = true
          }       
        }
        this.setState({sidebarItems, categoryTitles}, this.props.onSelectCategory(isReports)) 
      }
    } else {

      let report_num =[], topic_abb=[], subject_num=[], serie=[], serie_element=[], serie2=[], serie2_element = []
      if (sidebarItemIndex>=1 && sidebarItemIndex<=4) {
        report_num.push(categoryTitles[1][sidebarItems[1].selectedIndex].num)
        this.props.topics[sidebarItems[1].selectedIndex].forEach(topic => {
          topic_abb.push(topic.abb)
        })
        subject_num.push(categoryTitles[2][sidebarItems[2].selectedIndex].num)
        serie.push(categoryTitles[3][sidebarItems[3].selectedIndex].num)
        if (sidebarItemIndex !== 4) {
          this.setState({sidebarItems, categoryTitles, isSubFilterBy: true}, () => this.props.onSelectReportFilter(report_num, topic_abb, subject_num, serie))
        } else {
          serie_element.push(categoryTitles[4][sidebarItems[4].selectedIndex].num)
          this.setState({sidebarItems, categoryTitles, isSubFilterBy: true}, () => this.props.onSelectSubFilterBy(serie_element))
        }
        
      }  else {
        const index = 5+7*(currentBlock-1)        
        report_num.push(categoryTitles[index][sidebarItems[index].selectedIndex].num)
        if (sidebarItemIndex === index) {
          categoryTitles[index+1] =[]
          this.props.topics[selectedIndex].forEach(topic => {
            const obj = {}
            obj.num = topic.abb
            obj.header = topic.header
            categoryTitles[index+1].push(obj)
          })
          sidebarItems[index+1].selectedIndex = 0
        }
        topic_abb.push(categoryTitles[index+1][sidebarItems[index+1].selectedIndex].num)
        subject_num.push(categoryTitles[index+2][sidebarItems[index+2].selectedIndex].num)
        serie.push(categoryTitles[index+3][sidebarItems[index+3].selectedIndex].num)
        if(categoryTitles[index+4].length === 0) {
          serie_element = [0]
        } else {
          serie_element.push(categoryTitles[index+4][sidebarItems[index+4].selectedIndex].num)
        }
        if (categoryTitles[index+5].length===0) {
          serie2 = ['farm']
        } else {
          serie2.push(categoryTitles[index+5][sidebarItems[index+5].selectedIndex].num)
        }
        if (categoryTitles[index+6].length === 0) {
          serie2_element = [0]
        } else {
          serie2_element.push(categoryTitles[index+6][sidebarItems[index+6].selectedIndex].num)
        }
        
        if (sidebarItemIndex === index || sidebarItemIndex === index + 2 || sidebarItemIndex === index + 3) {

          isArmsFilter[currentBlock-1].isFilter1 = true
          this.setState({
            sidebarItems,
            categoryTitles,
            isArmsFilter: isArmsFilter
          }, this.props.onSelectArmsFilter(report_num, topic_abb, subject_num, serie))

        } else if (sidebarItemIndex === index + 4) {

          isArmsFilter[currentBlock-1].isSubFilter1 = true
          this.setState({
            sidebarItems,
            categoryTitles,
            isArmsFilter: isArmsFilter
          }, this.props.onSleectSubFilter1(report_num, topic_abb, subject_num, serie, serie_element))

        } else if (sidebarItemIndex === index + 5) {

          isArmsFilter[currentBlock-1].isFitler2 = true
          this.setState({
            sidebarItems,
            categoryTitles,
            isArmsFilter: isArmsFilter
          }, this.props.onSelectFilter2(report_num, topic_abb, subject_num, serie, serie_element, serie2))

        } else if (sidebarItemIndex === index + 6 || sidebarItemIndex === index +1) {
          isArmsFilter[currentBlock-1].isFilter1 = false
          isArmsFilter[currentBlock-1].isSubFilter1 = false
          isArmsFilter[currentBlock-1].isFitler2 = false
          this.setState({
            sidebarItems,
            categoryTitles,
            isArmsFilter: isArmsFilter
          }, this.props.onSelectSubFilter2(report_num, topic_abb, subject_num, serie, serie_element, serie2, serie2_element))
        }
      }      
    }
    this.toggleCategoryOptions(sidebarItemIndex)
    
  }

  removeDataSource = (blockindex) => {
    let {categoryTitles, sidebarItems, blockCount} = this.state
    const count = sidebarItems.length
    if (blockCount > 1) {
      blockCount--
      if (blockCount === 1){
      }
      for (let i=count-1; i>count-8; i--) {
        sidebarItems.pop()
        categoryTitles.pop()
      }
    }
    this.setState({categoryTitles, sidebarItems, blockCount})
  }

  addDataSource() {
    let {categoryTitles, sidebarItems, blockCount, isArmsFilter} = this.state
    blockCount++
    let datasource = []
    this.props.reports.forEach(report => {
      const obj = {}
      obj.num = report.num
      obj.header = report.header
      datasource.push(obj)
    })
    categoryTitles.push(datasource)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Data Source"})

    let dataline = []
    this.props.topics[0].forEach(topic => {
      const obj = {}
      obj.num = topic.abb
      obj.header = topic.header
      dataline.push(obj)
    })
    categoryTitles.push(dataline)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Data Line"})

    let farmtype = []
    this.props.subjects.forEach(subject => {
      const obj = {}
      obj.num = subject.num
      obj.header = subject.header
      farmtype.push(obj)
    })
    categoryTitles.push(farmtype)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Farm Type"})

    let filter1 = []
    this.props.series.forEach(serie => {
      const obj = {}
      obj.num = serie.abb
      obj.header = serie.header
      filter1.push(obj)
    })
    
    categoryTitles.push(filter1)
    sidebarItems.push({isOpened: false, selectedIndex: -0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter1"})

    let subfilter1= []   
    const obj = {}
    obj.num = 0
    obj.header = 'Total'
    subfilter1.push(obj)
    
    categoryTitles.push(subfilter1)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})

    let filter2 = []
    this.props.series2.forEach(serie2 => {
      const obj = {}
      obj.num = serie2.abb
      obj.header = serie2.header
      filter2.push(obj)
    })
    categoryTitles.push(filter2)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: true,  headingTitle: "Filter2"})

    let subfilter2= []
    subfilter2.push(obj)
    categoryTitles.push(subfilter2)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: blockCount, visible: false,  headingTitle: ""})
    isArmsFilter.push({isFilter1: false, isSubFilter1: false, isFitler2: false, isSubFilter2: false})
    this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: blockCount, isArmsFilter: isArmsFilter}, this.props.onSelectArmsFilter([1], ["kount"], [1], ['farm'], [0], ['farm'], [0]))
  }

  resetFilter = ( blockIndex ) => {
    const { sidebarItems, categoryTitles, isArmsFilter } =this.state
   currentBlock = blockIndex
    if(blockIndex === 0) {
      isReports = true
      for (let i = 1; i<=4; i++) {
        sidebarItems[i].selectedIndex = 0          
        sidebarItems[i].isOpened = false
        if (i !== 4) {
          sidebarItems[i].visible = true
        } else {
          sidebarItems[i].visible = false
        }    
      }
      this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: 1}, this.props.onSelectCategory(isReports))
    } else {
      let report_num =[], topic_abb=[], subject_num=[], serie=[]
      const index = 5+7*(currentBlock-1)        
      report_num.push(categoryTitles[index][sidebarItems[index].selectedIndex].num)      
      topic_abb.push(categoryTitles[index+1][sidebarItems[index+1].selectedIndex].num)
      for (let i=2; i<=6; i++) {
        sidebarItems[index+i].selectedIndex=0
        sidebarItems[index+i].isOpened=false
        sidebarItems[index+i].visible=true
        if (i===4 || i===6){
          sidebarItems[index+i].visible=false
        }
      }
      subject_num.push(categoryTitles[index+2][sidebarItems[index+2].selectedIndex].num)
      serie.push(categoryTitles[index+3][sidebarItems[index+3].selectedIndex].num)
      isArmsFilter[currentBlock-1].isFilter1 = true, isArmsFilter[currentBlock-1].isSubFilter1 = false, isArmsFilter[currentBlock-1].isFitler2 = false, isArmsFilter[currentBlock-1].isSubFilter2=false
      this.setState({sidebarItems, categoryTitles, isArmsFilter: isArmsFilter}, this.props.onSelectArmsFilter(report_num, topic_abb, subject_num, serie))
      
    }
    
    
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

