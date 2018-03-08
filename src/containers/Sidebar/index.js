import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'
import armsfilter from '../../ApolloComponent/armsQuery'


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
    blockCount: 0
  }  
  
  componentWillReceiveProps(props) {
    let {categoryTitles, sidebarItems} = this.state
    if (categoryTitles.length === 0) {
      if (props.reports.length !== 0 && props.subjects.length !== 0  && props.series.length !== 0) {

        categoryTitles.push([{num: 0, header: 'Tailored Reports'},{ num: 1, header: 'ARMS Data Analysis'}])
        sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: true,  blockIndex: 0, visible: true,  headingTitle: ""})

        let reports = []
        props.reports.forEach(report => {
          const obj = {}
          obj.num = report.num
          obj.header = report.header
          reports.push(obj)
        })
        categoryTitles.push(reports)
        sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: true,  headingTitle: "Report"})

        let subjects = []
        props.subjects.forEach(subject => {
          const obj = {}
          obj.num = subject.num
          obj.header = subject.header
          subjects.push(obj)
        })
        categoryTitles.push(subjects)
        sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: true,  headingTitle: "Subject"})

        let series = []
        props.series.forEach(serie => {
          const obj = {}
          obj.num = serie.abb
          obj.header = serie.header
          series.push(obj)
        })
        categoryTitles.push(series)
        sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: true,  headingTitle: "Filter by"})

        let series_element = []
        props.series_element.forEach(serie_element => {
          const obj = {}
          obj.num = serie_element.id  
          obj.header = serie_element.name
          series_element.push(obj)     
        })
        categoryTitles.push(series_element)
        sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: false,  headingTitle: ""})
      }

    } else if (categoryTitles.length !== 1 && !props.armsfilter.loading){

      if (props.armsfilter.arms_filter.serie_element.length !== 0) {
        categoryTitles[4] = []
        props.armsfilter.arms_filter.serie_element.forEach(serie_element => {
          const obj = {}
          obj.num = serie_element.id  
          obj.header = serie_element.name
          categoryTitles[4].push(obj)     
        })
        sidebarItems[4].headingTitle = categoryTitles[3][0].header
        if (categoryTitles[3][0].num !== 'farm') {
          sidebarItems[4].visible = true
        } else {
          sidebarItems[4].isOpened = false
          sidebarItems[4].visible = false
        }
      }

    }
    this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems})

  }

  
  toggleCategoryOptions = (selectedItemIndex) => {
    const { sidebarItems } =this.state
    sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened
    this.setState({ sidebarItems })
  }

  updateFilter = (sidebarItemIndex, selectedIndex) => {
    const { sidebarItems, categoryTitles } =this.state
    if (sidebarItemIndex === 0) {
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
        this.props.onSelectReport(num)       
        
      } else if (sidebarItemIndex === 2) {
        this.props.onSelectSubject(num)
      } else if (sidebarItemIndex === 3) {
        this.props.onSelectFilterBy(num)
      } else if (sidebarItemIndex === 4) {
        this.props.onSelectSubFilterBy(num)
      }
      categoryTitles[sidebarItemIndex] = []
      categoryTitles[sidebarItemIndex].push({num: num, header: header})
    }
    
    
    this.toggleCategoryOptions(sidebarItemIndex)
  }

  resetFilter = ( blockIndex ) => {
    let categoryTitles = [[{num: 0, header: 'Tailored Reports'},{ num: 1, header: 'ARMS Data Analysis'}]]
    let sidebarItems = [{isOpened: false, selectedIndex: 0, isCategory: true,  blockIndex: 0, visible: true,  headingTitle: ""}]

    let reports = []
    this.props.reports.forEach(report => {
      const obj = {}
      obj.num = report.num
      obj.header = report.header
      reports.push(obj)
    })
    categoryTitles.push(reports)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: true,  headingTitle: "Report"})

    let subjects = []
    this.props.subjects.forEach(subject => {
      const obj = {}
      obj.num = subject.num
      obj.header = subject.header
      subjects.push(obj)
    })
    categoryTitles.push(subjects)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: true,  headingTitle: "Subject"})

    let series = []
    this.props.series.forEach(serie => {
      const obj = {}
      obj.num = serie.abb
      obj.header = serie.header
      series.push(obj)
    })
    categoryTitles.push(series)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: true,  headingTitle: "Filter by"})

    let series_element = []
    this.props.series_element.forEach(serie_element => {
      const obj = {}
      obj.num = serie_element.id  
      obj.header = serie_element.name
      series_element.push(obj)     
    })
    categoryTitles.push(series_element)
    sidebarItems.push({isOpened: false, selectedIndex: 0, isCategory: false, blockIndex: 0, visible: false,  headingTitle: ""})

    this.setState({categoryTitles: categoryTitles, sidebarItems: sidebarItems})
  }

  
  render() {
    const {sidebarItems, categoryTitles} = this.state
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

