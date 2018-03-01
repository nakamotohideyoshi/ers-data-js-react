import React from 'react';
import { Col } from 'react-bootstrap';
import 'react-fa'
import 'react-slidedown/lib/slidedown.css'
import SidebarItem from '../../components/SidebarItem'
import './style.css';
import Reset from '../../images/reset.png'

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
    'Farm Business Balance Sheet',
    'Farm Business Income Statement',
    'Farm Business Financial Ratios',
    'Structural Characteristics',
    'Farm Business Debt Repayment Capacity',
    'Government Payments',
    'Operator Household Income',
    'Operator Household Balance Sheet'
  ],
  ['Farms', 'Farm assets', 'Assets: Current', 'Assets: Livestock inventory', 'Assets: Crop inventory', 'Assets: Purchased inputs', 'Assets: Cash invested in growing crops', 'Assets: Prepaid insurance', 'Assets: Other', 'Assets: Non-current', 'Assets: Investment in cooperatives', 'Assets: Land and buildings', 'Assets: Operators dwelling', 'Assets: Farm equipment', 'Assets: Breeding animals', 'Farm liabilities', 'Liabilities: Current', 'Liabilities: Notes payable within one year', 'Liabilities: Current portion of term debt', 'Liabilities: Accrued interest', 'Liabilities: Accounts payable', 'Liabilities: Noncurrent', 'Liabilities: Nonreal estate', 'Liabilities: Real estate', 'Farm equity'],  
  ['Farms', 'Gross cash income', 'Livestock income', 'Crop sales', 'Government payments', 'Other farm-related income', 'Total cash expenses', 'Variable expenses', 'Livestock purchases', 'Feed', 'Other livestock-related', 'Seed and plants', 'Fertilizer and chemicals', 'Utilities', 'Labor', 'Fuels and oils', 'Repairs and maintenance', 'Machine-hire and custom work', 'Other variable expenses', 'Fixed expenses', 'Real estate and property taxes', 'Interest', 'Insurance premiums', 'Rent and lease payments', 'Net cash farm income', 'Depreciation', 'Labor, non-cash benefits', 'Value of inventory change', 'Nonmoney income', 'Net farm income'],
  ['Farms', 'Current ratio', 'Working capital-to-expense ratio', 'Debt/asset ratio', 'Rate of return on assets', 'Rate of return on equity', 'Operating profit margin', 'Term debt coverage ratio', 'Asset turnover ratio', 'Operating expense ratio', 'Economic cost-to-output ratio'],
  ['Farms', 'Total value of production', 'Total acres operated', 'Acres operated per farm', 'Farms by tenure: Full owner', 'Farms by tenure: Part owner', 'Farms by tenure: Tenant', 'Operator occupation: Farming', 'Operator occupation: Something else', 'Operator occupation: Retired', 'Operator education: Less than high school', 'Operator education: Completed high school', 'Operator education: Some college', 'Operator education: Completed 4 years college or more', 'Operator hours worked annually on farm: Less than 500', 'Operator hours worked annually on farm: 500 to 999', 'Operator hours worked annually on farm: 1,000 to 1,999', 'Operator hours worked annually on farm: 2,000 or more'],
  ['Farms', 'Number of farms with debt', 'Gross cash farm income', 'Net farm income', 'Income for debt coverage', 'Principal/interest payments', 'Debt coverage margin', 'Maximum loan payment', 'Total reported debt', 'Max feasible debt (7.5%)', 'Max feasible debt (10%)', 'Repayment capacity use (7.5%)', 'Repayment capacity use (10%)'],
  ['Farms', 'Total number of acres', 'Total farm sales', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Total number of acres', 'Total farm sales', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Total number of acres', 'Total farm sales', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average government payment per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'All government payments', 'Conservation payments', 'Retirement lands program payments', 'Working lands program payments', 'Commodity crop payments', 'Direct payments', 'Counter cyclical payments', 'Marketing loan benefits', 'Other government program payments', 'All government payments', 'Government payments to landlords', 'Government payments to operators', 'Conservation payments', 'Retirement lands program payments', 'Working lands program payments', 'Commodity crop payments', 'Direct payments', 'Counter cyclical payments', 'Marketing loan benefits', 'Other government program payments', 'All government payments', 'Conservation payments', 'Retirement lands program payments', 'Working lands program payments', 'Commodity crop payments', 'Direct payments', 'Counter cyclical payments', 'Marketing loan benefits', 'Other government program payments', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm',  'Average conservation program payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average land retirement program payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average working lands program payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average commodity crop program payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average DCCP program payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average direct payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average countercyclical program payment received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average marketing loan benefit payment received per farm',
   'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm', 'Farms', 'Percent of all farms', 'Average acres operated per farm', 'Average gross farm sales per farm', 'Average payment from other government programs received per farm', 'Average total government payment received per farm', 'Average gross cash income per farm', 'Average net cash income per farm'],
  ['Farm Households (HH)', 'Total operator household income (HHI)', 'Total operator household income from farming activities', 'Total operator household income from off-farm sources', 'Percent of U.S. average household income', 'Percent of total HHI from farming: 0 to 24', 'Percent of total HHI from farming: 25 to 49', 'Percent of total HHI from farming: 50 to 74', 'Percent of total HHI from farming: 75 or more'
  , 'Total household income positive, farm income neg.', 'Total household income negative'],
  ['Farm Households (HH)', 'Total operator household assets', 'Total operator household assets: Farm', 'Total operator household assets: Non-farm', 'Total operator household debt', 'Total operator household debt: Farm', 'Total operator household debt: Non-Farm', 'Total Operator household net worth', 'Total operator household net worth: Farm', 'Total operator household net worth: Non-farm'],
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
  ['All Specialties', 'General Cash Grains', 'Wheat', 'Corn', 'Soybean', 'Tobacco, Cotton, Peanuts' ,'Other Field Crops', 'Specialty Crops (F,V,N)', 'Cattle', 'Hogs', 'Poultry', 'Dairy', 'Hogs, Poultry, Other', 'Fruits and Tree Nuts', 'Vegetables', 'Nursery and Greenhouse', 'All Cash Grains', 'All other livestock']

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
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Production Specialty"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source1"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source2"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source3"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source4"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source5"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Source6"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Sourc= e7"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Data Line"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Type"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Filter1"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Collapsed Farm Typology"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Economic Class"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Typology'"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Operator Age"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Resource Region"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Production Specialty"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Filter2"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Collapsed Farm Typology"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Economic Class"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Typology'"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Operator Age"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Farm Resource Region"},
  {isOpened: false, selectedIndex: 0, isCategory: false, visible: false, headingTitle: "Production Specialty"}
]
let isReports = true
let isDataReset = false
let isLast = false
export default class Sidebar extends React.Component {
  state = {
    isCategoryOpened: false,
    sidebarItems: sidebarItems,
    isReports: true
  }
  
  toggleCategoryOptions = (selectedItemIndex) => {
    const { sidebarItems } =this.state
    sidebarItems[selectedItemIndex].isOpened = !sidebarItems[selectedItemIndex].isOpened
    this.setState({ sidebarItems })
  }
  updateFilter = (sidebarItemIndex, selectedIndex) => {
    const { sidebarItems } =this.state
    sidebarItems[sidebarItemIndex].selectedIndex = selectedIndex
    if (sidebarItemIndex === 0) {
      for ( let i = 1; i < sidebarItems.length; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false 
      }
      if(selectedIndex === 0) {
        for ( let i = 1; i <= 3; i++) {
          sidebarItems[i].visible = true
          isReports = true
        }
      } else if(selectedIndex === 1){
        sidebarItems[10].visible = true
        sidebarItems[18].visible = true
        sidebarItems[26].visible = true
        sidebarItems[27].visible = true
        sidebarItems[34].visible = true
        isReports = false
      }
    } else if (sidebarItemIndex === 3) {
      for ( let i = 4; i <= 9; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false 
      }
      if(selectedIndex !== 0){
        sidebarItems[selectedIndex+3].visible = true
      }    
    } else if (sidebarItemIndex === 10) {
      for ( let i = 18; i <= 25; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false 
      }
      sidebarItems[selectedIndex+18].visible = true
    } else if (sidebarItemIndex === 27) {
      for ( let i = 28; i <= 33; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false 
      }
      if(selectedIndex !== 0){
        sidebarItems[selectedIndex+27].visible = true
      } 
    } else if (sidebarItemIndex === 34) {
      for ( let i = 35; i <= 40; i++) {
        sidebarItems[i].visible = false
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false 
      }
      if(selectedIndex !== 0){
        sidebarItems[selectedIndex+34].visible = true
      } 
    }

    this.setState({ sidebarItems })
    this.toggleCategoryOptions(sidebarItemIndex)
    this.props.onSelectFilter(sidebarItemIndex, selectedIndex)
  }
  resetFilter = () => {
    const { sidebarItems } =this.state
    sidebarItems.forEach((element, i) => {
      if (i !== 0) {
        element.selectedIndex = 0
        element.isOpened = false
        sidebarItems[i].visible = false
        if( (isReports && (i>=1 && i<=3)) || !isReports && (i===10 || i===18 || i===26 || i===27 || i===34)) {
          sidebarItems[i].visible = true
        }
      }      
    })
    this.setState({ sidebarItems })
    if (isReports) {
      this.props.onSelectFilter(0, 0)
    } else {
      this.props.onSelectFilter(0, 1)
    }
        
  }

  addDataSource = () => {
    const { sidebarItems } =this.state
    for ( let i = 10; i <= 17; i++) {
      if (sidebarItems[i].visible === false) {
        sidebarItems[i].visible = true
        sidebarItems[i].selectedIndex = 0   
        sidebarItems[i].isOpened = false
        this.setState({ sidebarItems })
        this.props.onSelectFilter(i, 0)
        return
      }       
    }
  }
  render() {

    return (
    <Col sm={3} md={3} xs={12} className="sidebar-container">
      {
        sidebarItems.map((val, i) => {
          isDataReset = false
          isLast = false
          if (i >=18 && i <= 25){
            isDataReset = true
          } else if(i == 40){
            isLast = true
          }
          return (
            <SidebarItem 
              headingTitle={val.headingTitle}
              titles={categoryTitles[i]}
              visible={sidebarItems[i].visible}              
              selectedIndex={sidebarItems[i].selectedIndex}
              isOpened={sidebarItems[i].isOpened}
              isCategory={sidebarItems[i].isCategory} 
              isReports={isReports}
              isDataReset={isDataReset}
              toggleCategoryOptions={() => this.toggleCategoryOptions(i)}
              updateFilter={(index) => this.updateFilter(i, index)}   
              resetFilter={() => this.resetFilter()}       
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

