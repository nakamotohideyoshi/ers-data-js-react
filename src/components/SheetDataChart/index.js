import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import ChartGenerator from '../ChartGenerator'
import OptionGroup from '../OptionGroup'
import { YEAR_SELECTED } from '../../helpers/constants'

const chartTypes = [
  { label: 'Bar', type: 'column'},
  { label: 'Line', type: 'line'}
]

class SheetDataChart extends Component {
  state = {
    incomeArr: [],
    chartTypeIndex: 0,
    isLineEnabled: true,
    isGovernmentPayments: false
  }
  componentWillReceiveProps(props) {
    const { showList, surveyData, categories, whichOneMultiple } = props
    let incomeArr = []
    let gpArr = []    
    let isGovernmentPayments = false

    if (surveyData) {
      surveyData.forEach((dataSourceCategories, index) => {
        dataSourceCategories.data.forEach((element, i) => {
          if (dataSourceCategories.report === 'Government Payments') {
            isGovernmentPayments = true
          }
          let singleIncome = {}
          let currentIndex = 0

          incomeArr.forEach((income, i) => {
            if (income.id === dataSourceCategories.dataSource + element.topic_abb) {
              singleIncome = income
              currentIndex = i
              return
            }
          })
          singleIncome.shown = showList[dataSourceCategories.dataSource + element.topic_abb]
          if (!singleIncome.id) {
            singleIncome.id = dataSourceCategories.dataSource + element.topic_abb
            singleIncome.report = element.report_dim.header
            singleIncome.header = element.topic_dim.header
            singleIncome.group_header = element.topic_dim.group_header
            singleIncome.unit_desc = element.topic_dim.unit_desc
              let estimateList = []
              let rseList = []
              let medianList = []
              categories.forEach(category => {
                const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year : element.state.name
                if (comparedCategory === category) {
                  estimateList.push(element.estimate < 0 ? 0 : element.estimate)
                  rseList.push(element.rse < 0 ? 0 : element.rse)
                  medianList.push(element.median === null ? 0 : element.median)
                } else {
                  estimateList.push(0)
                  rseList.push(0)
                  medianList.push(0)                  
                }
              })
              singleIncome.estimateList = estimateList
              singleIncome.rseList = rseList
              singleIncome.medianList = medianList
              singleIncome.isGovernmentPayments = isGovernmentPayments
              if (isGovernmentPayments) {
                let duplicateHeaderElement = false
                incomeArr.forEach(item => {
                  if (singleIncome.header === item.header)
                    duplicateHeaderElement = true
                })  
                if (!duplicateHeaderElement) {
                  gpArr.push(singleIncome)
                }
              }
              incomeArr.push(singleIncome)
          } else {
              categories.forEach((category, index) => {
                const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year: element.state.name
                if (comparedCategory === category) {
                  singleIncome.estimateList[index] = element.estimate < 0 ? 0 : element.estimate;
                  singleIncome.rseList[index] = element.rse < 0 ? 0 : element.rse;
                  singleIncome.medianList[index] = element.median === null ? 0 : element.rse;                  
                } 
              })
              incomeArr[currentIndex] = singleIncome
          }
        })
      })
    }

    const gpList = {}
    let gpDataSet = []

    incomeArr.forEach(income => {
      if (income.group_header !== undefined)
        if (gpList[income.header]) {
          const result = gpList[income.header].find( element => element.group_header === income.group_header );
          if (!result) {
            gpList[income.header].push(income)
          }            
        } else {
          gpList[income.header] = [income]
        }
    })

    let indx = 0
    gpArr.forEach(income => {
      if (income.id) {
        gpDataSet[indx] = gpList[income.header]
        indx++
      }
    })
    if (isGovernmentPayments) {
      incomeArr = gpDataSet
    } else {
      if (incomeArr.length > 0) {
        if (incomeArr[0].estimateList.length === 1) {
          this.switchChartType(0)
          this.setState({ isLineEnabled: false })
        } else {
          this.setState({ isLineEnabled: true })
        }
      }
    }
    this.setState({ incomeArr: incomeArr.slice() })
    this.setState({ isGovernmentPayments })
    
  }
  switchChartType(chartTypeIndex) {
    this.setState({ chartTypeIndex })
  }
  render() {
    const { incomeArr, chartTypeIndex, isLineEnabled, isGovernmentPayments } = this.state
    const { categories, blockIndex, fontSizeIndex, whichOneMultiple } = this.props
    let chartTitle = ''
    if (incomeArr.length > 0 && blockIndex < 1) chartTitle = incomeArr[0].report
    const chartType = chartTypes[chartTypeIndex].type
    let chartTypesArray = isLineEnabled ? chartTypes : [chartTypes[0]]

    
    if (incomeArr.length === 0)
      return (<div className="empty-data-notification">No data to display</div>)
    else
      return (
        <div className="chart-container col-xs-12">
          <ChartGenerator series={incomeArr} categories={categories} title={chartTitle} chartType={chartType} fontSizeIndex={fontSizeIndex} whichOneMultiple={whichOneMultiple} isGovernmentPayments={isGovernmentPayments} />
          <div className="chart-type-container">
            <span className={`font-${fontSizeIndex}-small`}>Chart Type:</span>
            <OptionGroup options={chartTypesArray} selectedIndex={chartTypeIndex} fontSizeIndex={fontSizeIndex} onSelect={(index) => this.switchChartType(index)} tabIndex={1300} />
          </div>
        </div>
      );
  }
}

SheetDataChart.propTypes = {
  showList: PropTypes.object,
  surveyData: PropTypes.array,
  categories: PropTypes.array
};

export default SheetDataChart;
