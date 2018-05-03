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
    isLineEnabled: true
  }
  componentWillReceiveProps(props) {
    const { showList, surveyData, categories, whichOneMultiple } = props
    let incomeArr = []
    if (surveyData) {
      surveyData.forEach((dataSourceCategories, index) => {
        dataSourceCategories.data.forEach((element, i) => {
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
            singleIncome.unit_desc = element.topic_dim.unit_desc
              let estimateList = []
              let rseList = []
              categories.forEach(category => {
                const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year: element.state.name
                if (comparedCategory === category) {
                  estimateList.push(element.estimate < 0 ? 0 : element.estimate)
                  rseList.push(element.rse < 0 ? 0 : element.rse)
                } else {
                  estimateList.push(0)
                  rseList.push(0)
                }
              })
              singleIncome.estimateList = estimateList
              singleIncome.rseList = rseList
              incomeArr.push(singleIncome)
          } else {
              categories.forEach((category, index) => {
                const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year: element.state.name
                if (comparedCategory === category) {
                  singleIncome.estimateList[index] = element.estimate < 0 ? 0 : element.estimate;
                  singleIncome.rseList[index] = element.rse < 0 ? 0 : element.rse;
                } 
              })
              incomeArr[currentIndex] = singleIncome
          }
        })
      })
    }
    if (incomeArr.length > 0) {
      if (incomeArr[0].estimateList.length === 1) {
        this.switchChartType(0)
        this.setState({ isLineEnabled: false })
      } else {
        this.setState({ isLineEnabled: true })
      }
    }
    this.setState({ incomeArr: incomeArr.slice() })
  }
  switchChartType(chartTypeIndex) {
    this.setState({ chartTypeIndex })
  }
  render() {
    const { incomeArr, chartTypeIndex, isLineEnabled } = this.state
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
          <ChartGenerator series={incomeArr} categories={categories} title={chartTitle} chartType={chartType} fontSizeIndex={fontSizeIndex} whichOneMultiple={whichOneMultiple} />
          <div className="chart-type-container">
            <span>Chart Type:</span>
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
