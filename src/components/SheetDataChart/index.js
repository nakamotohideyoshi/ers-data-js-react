import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import ChartGenerator from '../ChartGenerator'

class SheetDataChart extends Component {
  state = {
    incomeArr: []
  }
  componentWillReceiveProps(props) {
    const { showList, surveyData } = props
    let incomeArr = []
    console.log(surveyData)
    if (surveyData) {
      surveyData.forEach((element, index) => {
          let singleIncome = {}
          let currentIndex = 0
          if (element.topic_dim.level > 1) 
            return
          incomeArr.forEach((income, i) => {
            if (income.id === element.topic_abb) {
              singleIncome = income
              currentIndex = i
              return
            }
          })
          if (!singleIncome.id) {
            singleIncome.id = element.topic_abb
            singleIncome.header = element.topic_dim.header
            if (showList[element.topic_abb] === 1) {
              singleIncome.estimateList = [element.estimate]
              incomeArr.push(singleIncome)
            }
          } else {
            if (showList[element.topic_abb] === 1) {
              singleIncome.estimateList.push(element.estimate)          
              incomeArr[currentIndex] = singleIncome
            }
          }
      })
    }
    console.log(incomeArr)
    
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
