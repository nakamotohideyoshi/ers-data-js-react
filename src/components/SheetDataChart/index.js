import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import ChartGenerator from '../ChartGenerator'

class SheetDataChart extends Component {
  state = {
    incomeArr: []
  }
  componentWillReceiveProps(props) {
    const { showList, surveyData, categories, isYearsMultiple } = props
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
          if (!singleIncome.id) {
            singleIncome.id = element.report_num + element.topic_abb
            singleIncome.header = element.topic_dim.header
            if (showList[element.report_num + element.topic_abb] === 1) {
              let estimateList = []
              categories.forEach(category => {
                const comparedCategory = isYearsMultiple ? element.year: element.state.name
                if (comparedCategory === category) {
                  estimateList.push(element.estimate)
                } else {
                  estimateList.push(0)
                }
              })
              singleIncome.estimateList = estimateList
              incomeArr.push(singleIncome)
            }
          } else {
            if (showList[element.report_num + element.topic_abb] === 1) {
              categories.forEach((category, index) => {
                const comparedCategory = isYearsMultiple ? element.year: element.state.name
                if (comparedCategory === category) {
                  singleIncome.estimateList[index] = element.estimate
                } 
              })
              incomeArr[currentIndex] = singleIncome
            }
          }
      })
    }
    this.setState({ incomeArr: incomeArr.slice() })
  }
  render() {
    const { incomeArr } = this.state
    const { categories } = this.props

    if (incomeArr.length === 0)
      return (<div className="empty-data-notification">No data to display</div>)
    else
      return (
        <div className="chart-container col-xs-12">
          <ChartGenerator series={incomeArr} categories={categories} title="Farm Business Balance Sheet Data" />
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
