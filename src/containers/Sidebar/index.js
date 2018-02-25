import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';

const categoryTitles = [
  ['Tailored Reports', 'ARMS Data Analysis'],
  ['Farm Business Balance Sheet', 'Farm Business Income Statement', 'Farm Business Financila Ratiost', 'Strctural Caracteristics', 'Farm Business Debt Repayment Capacity', 'Strctural Caracteristics',  'Farm Business Debt Repayment Capacity',  'Govenerment Payments',  'Operator Household Income',  'Operator Household Balance Sheet'],
  ['All Farms', 'Farm Businesses', 'Farm Operator Households'], 
  ['All Farms', 'Collapsed Farm Typology', 'Economic Class', 'Farm Typology', 'Operator Age', 'Farm Resource REgion', 'Production Specialty'],
  ['All Survey states', 'Arkansas', 'California', 'Florida', 'Georgia', 'Illinois', 'Indiana', 'Iowa',  'Kansas', 'Minnesota', 'Missouri', 'Nebraska', 'North Carolina', 'Texas', 'Washington', 'Wisconsin'],
  ['All Farms', 'Collapsed Farm Typology', 'Economic Class', 'Farm Typology', 'Operator Age', 'Farm Resource REgion', 'Production Specialty'],
  ['2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996']
]
const sidebarItems = [
  {isOpened: false, selectedIndex: 0, isCategory: true, headingTitle: "", },
  {isOpened: false, selectedIndex: 0, isCategory: false, headingTitle: "Report"},
  {isOpened: false, selectedIndex: 0, isCategory: false, headingTitle: "Subject"},
  {isOpened: false, selectedIndex: 0, isCategory: false, headingTitle: "Row group"},
  {isOpened: false, selectedIndex: 0, isCategory: false, headingTitle: "Filter by US or State"},
  {isOpened: false, selectedIndex: 0, isCategory: false, headingTitle: "Sub group"},  
  {isOpened: false, selectedIndex: 0, isCategory: false, headingTitle: "From year"}  
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
    this.setState({ sidebarItems })
    this.toggleCategoryOptions(sidebarItemIndex)
  }
  resetFilter = () => {
    const { sidebarItems } =this.state
    sidebarItems.forEach((element) => {
      element.selectedIndex = 0
    })
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

