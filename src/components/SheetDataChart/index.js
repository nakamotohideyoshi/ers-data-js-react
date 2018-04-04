import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import ChartGenerator from '../ChartGenerator'
import OptionGroup from '../OptionGroup'
import { YEAR_SELECTED } from '../../helpers/constants'

const chartTypes = [
  { label: 'Bar', type: 'column'},
  { label: 'Line', type: 'line'},
  { label: 'Pie', type: 'pie'},
]

class SheetDataChart extends Component {
  state = {
    incomeArr: [],
    chartTypeIndex: 0
  }
  componentWillReceiveProps(props) {
    const { showList, surveyData, categories, whichOneMultiple } = props
    let incomeArr = []

    if (surveyData) {
      surveyData.forEach((element, index) => {
          let singleIncome = {}
          let currentIndex = 0

          incomeArr.forEach((income, i) => {
            if (income.id === element.report_num + element.topic_abb) {
              singleIncome = income
              currentIndex = i
              return
            }
          })
          singleIncome.shown = showList[element.report_num + element.topic_abb]
          if (!singleIncome.id) {
            singleIncome.id = element.report_num + element.topic_abb
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
    }
    this.setState({ incomeArr: incomeArr.slice() })
  }
  switchChartType(chartTypeIndex) {
    this.setState({ chartTypeIndex })
  }
  render() {
    const { incomeArr, chartTypeIndex } = this.state
    const { categories, blockIndex, whichOneMultiple } = this.props
    const chartTitle = blockIndex > 0 ? 'Arms Data Analysis' : ''
    const chartType = chartTypes[chartTypeIndex].type

    if (incomeArr.length === 0)
      return (<div className="empty-data-notification">No data to display</div>)
    else
      return (
        <div className="chart-container col-xs-12">
          <ChartGenerator series={incomeArr} categories={categories} title={chartTitle} chartType={chartType} whichOneMultiple={whichOneMultiple} />
          <div className="chart-type-container">
            <span>Chart Type:</span>
            <OptionGroup options={chartTypes} selectedIndex={chartTypeIndex} onSelect={(index) => this.switchChartType(index)} />
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
