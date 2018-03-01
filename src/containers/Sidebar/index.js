import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';

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
export default class Sidebar extends React.Component {
  state = {
    isCategoryOpened: false,
    sidebarItems: sidebarItems
  }
  toggleCategoryOptions = (selectedItemIndex) => {
    const { sidebarItems } =this.state
    sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened
    this.setState({ sidebarItems })
  }
  updateFilter = (sidebarItemIndex, selectedIndex) => {
    const { sidebarItems } =this.state
    sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex

    if (sidebarItemIndex === 3) {
      for ( let i = 4; i < sidebarItems.length; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false 
      }
      if(selectedIndex !== 0){
        sidebarItems[selectedIndex+3].visible = true
      }    
    }  

    this.setState({ sidebarItems })
    this.toggleCategoryOptions(sidebarItemIndex)
    this.props.onSelectFilter(sidebarItemIndex, selectedIndex)
  }
  resetFilter = () => {
    const { sidebarItems } =this.state
    sidebarItems.forEach((element) => {
      element.selectedIndex = 0
      element.isOpened = false
    })

    sidebarItems[4].visible = false

    this.setState({ sidebarItems })    
  }
  render() {

    return (
    <Col sm={3} md={3} xs={12} className="sidebar-container">
      {
        sidebarItems.map((val, i) => {
          return (
            <SidebarItem 
              headingTitle={val.headingTitle}
              titles={categoryTitles[i]}
              visible={sidebarItems[i].visible}              
              selectedIndex={sidebarItems[i].selectedIndex}
              isOpened={sidebarItems[i].isOpened}
              isCategory={sidebarItems[i].isCategory} 
              toggleCategoryOptions={() => this.toggleCategoryOptions(i)}
              updateFilter={(index) => this.updateFilter(i, index)}   
              resetFilter={() => this.resetFilter()}       
            />
          )
        })
      }
      </Col>
    )
  }
}

