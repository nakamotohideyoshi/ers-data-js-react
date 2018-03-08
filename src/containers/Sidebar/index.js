import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'
import armsfilter from '../../ApolloComponent/armsQuery'
import { selectLimit } from 'async';


const categoryTitles = [
  ['Tailored Reports', 'ARMS Data Analysis'],
  [
    'Farm Business Balance Sheet',
    'Farm Business Income Statement',
    'Farm Business Financial Ratios',
    'Structural Characteristics',
    'Farm Business Debt Repayment Capacity',
    'Government Payments',
    'Operator Household Income',
    'Operator Household Balance Sheet'
  ],
  [
    'All Farms', 'Farm Businesses', 'Farm Operator Households'
  ],
  [
    'All Farms',
    'Collapsed Farm Typology',
    'Economic Class',
    'Farm Typology',
    'Operator Age',
    'Farm Resource Region',
    'Production Specialty'
  ],
  ['All Collapsed Typologies', 'Residence farms', 'Intermediate farms', 'Commercial farms'],
  ['All Sales Classes', '$1,000,000 or more', '$500,000 to $999,999', '$250,000 to $499,999', '$100,000 to $249,999', 'Less than $100,000'],
  ['All Typologies', 'Retirement farms', 'Residential/lifestyle farms', 'Farming occupation/lower-sales farms', 'Farming occupation/higher-sales farms', 'Large farms', 'Very large farms', 'Nonfamily farms', 'Retirement farms (New)', 'Off-farm occupation farms (New)', 'Farming-occupation/low-sales farms (New)', 'Farming-occupation/moderate-sales farms (New)', 'Midsize family farms (New)', 'Large farms (New)', 'Very large farms (New)', 'Nonfamily farms'],
  ['All Operators', 'Operators 34 years or younger', 'Operators 35 to 44 years old', 'Operators 45 to 54 years old', 'Operators 55 to 64 years old', 'Operators 65 years or older'],
  ['All ERS Regions', 'Heartland', 'Northern Crescent', 'Northern Great Plains', 'Prairie Gateway', 'Eastern Uplands', 'Southern Seaboard', 'Fruitful Rim', 'Basin and Range', 'Mississippi Portal'],
  ['All Specialties', 'General Cash Grains', 'Wheat', 'Corn', 'Soybean', 'Tobacco, Cotton, Peanuts' ,'Other Field Crops', 'Specialty Crops (F,V,N)', 'Cattle', 'Hogs', 'Poultry', 'Dairy', 'Hogs, Poultry, Other', 'Fruits and Tree Nuts', 'Vegetables', 'Nursery and Greenhouse', 'All Cash Grains', 'All other livestock'],

]

const sidebarItems = [
  {isOpened: false, selectedIndex: 0, isCategory: true,  visible: true,  headingTitle: ""},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: true,  headingTitle: "Report"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: true,  headingTitle: "Subject"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: true,  headingTitle: "Filter by"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Collapsed Farm Typology"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Economic Class"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Typology'"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Operator Age"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Resource Region"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Production Specialty"}
]
let isReports = true
let isDataReset = false

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
          categoryTitles[4] = []
          props.armsfilter.arms_filter.serie_element.forEach(serie_element => {
            const obj = {}
            obj.num = serie_element.id  
            obj.header = serie_element.name
            categoryTitles[4].push(obj)     
          })
          sidebarItems[4].headingTitle = categoryTitles[3][sidebarItems[3].selectedIndex].header
          if (categoryTitles[3][sidebarItems[3].selectedIndex].num !== 'farm') {
            sidebarItems[4].visible = true
          } else {
            sidebarItems[4].isOpened = false
            sidebarItems[4].visible = false
          }
        }        
      }

    }
    this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems, blockCount: blockCount})

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
      if (sidebarItems.length > 12) {
        for (let i = 12; i<sidebarItems.length; i++) {
          sidebarItems.pop()
          categoryTitles.pop()
        }        
      }
      for (let i=1; i<12; i++) {
        sidebarItems[i].isOpened = false
        sidebarItems[i].selectedIndex = -1
        if (i === 4 || i === 6 || i === 9 || i === 11) {
          sidebarItems[i].selectedIndex = -2
          sidebarItems[i].visible = false
        }
      }      
      if (selectedIndex === 0) {
        this.props.onSelectCategory(true)
      } else {
        this.props.onSelectCategory(false)
      }
      sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex
    } else {
      const header = categoryTitles[sidebarItemIndex][selectedIndex].header
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
      }
    }
    // this.toggleCategoryOptions(sidebarItemIndex)
    this.setState({sidebarItems, categoryTitles, currentBlock})
  }

  resetFilter = ( blockIndex ) => {
    let {sidebarItems} = this.state
    sidebarItems.forEach((item, i) => {
      if (i !== 0) {
        item.selectedIndex = -1
      }      
    })
    this.props.onSelectCategory(true)
    this.setState({sidebarItems: sidebarItems})
  }

  
  render() {
    const {sidebarItems, categoryTitles} = this.state
    console.log(this.state)
    return (
    <Col sm={3} md={3} xs={12} className="sidebar-container">
      {        
        sidebarItems.map((val, i) => {
          isDataReset = false
          if (i%24 >= 11 && i%24 <= 18){
            isDataReset = true
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
              isDataReset={isDataReset}
              toggleCategoryOptions={() => this.toggleCategoryOptions(i)}
              updateFilter={(index) => this.updateFilter(i, index)}   
              resetFilter={() => this.resetFilter(val.blockIndex)}       
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

