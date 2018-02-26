import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';

const categoryTitles = [
  ['Tailored Reports', 'ARMS Data Analysis'],
  ['Farm Business Balance Sheet', 'Farm Business Income Statement', 'Farm Business Financila Ratiost', 'Strctural Caracteristics', 'Farm Business Debt Repayment Capacity', 'Strctural Caracteristics',  'Farm Business Debt Repayment Capacity',  'Govenerment Payments',  'Operator Household Income',  'Operator Household Balance Sheet'],
  ['All Farms', 'Farm Businesses', 'Farm Operator Households'], 
  ['All Farms', 'Collapsed Farm Typology', 'Economic Class', 'Farm Typology', 'Operator Age', 'Farm Resource REgion', 'Production Specialty'],
  ['Operators 34 years or younger', 'Operators 35 to 44 years', 'Operators 45 to 54 years', 'Operators 55 to 64 years', 'Operators 65 years or older']
]
const sidebarItems = [
  {isOpened: false, selectedIndex: 0, isCategory: true,  visible: true,  headingTitle: ""},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: true,  headingTitle: "Report"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: true,  headingTitle: "Subject"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: true,  headingTitle: "Filter by"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Operate Age"}
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
      if (selectedIndex === 4) {
        sidebarItems[4].visible = true
      } else {
        sidebarItems[4].visible = false
        sidebarItems[4].selectedIndex = 0   
      }
    } 

    this.setState({ sidebarItems })
    this.toggleCategoryOptions(sidebarItemIndex)
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

