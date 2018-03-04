import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, ColumnSeries,
} from 'react-jsx-highcharts';
import './style.css'

class SheetDataChart extends Component {
  state = {
    incomeArr: []
  }
  componentWillReceiveProps(props) {
    const { showList, years, surveyData } = props
    let incomeArr = []
    const c = years.length
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
            if (showList[element.topic_abb] === 1) 
            singleIncome.estimateList = [element.estimate]
            else 
            singleIncome.estimateList = [0]
            
            incomeArr.push(singleIncome)
          } else {
            if (showList[element.topic_abb] === 1) 
            singleIncome.estimateList.push(element.estimate)
            else 
            singleIncome.estimateList.push(0)
            
            incomeArr[currentIndex] = singleIncome
          }
      })
    }
    this.setState({ incomeArr: [].concat(incomeArr) })
  }
  render() {
    const { incomeArr } = this.state
    const { years } = this.props
    if (incomeArr.length === 0)
      return (<div className="empty-data-notification">No data to display</div>)
    else
      return (
        <div className="app">
          <HighchartsChart>
            <Chart />
            <Legend />
            <XAxis id="year" categories={years} />
            <YAxis id="number">
            <YAxis.Title>$ Millions</YAxis.Title>
              {
                incomeArr.map((element) => {
                  return (
                  <ColumnSeries id={element.id} name={element.header} data={element.estimateList} />
                  )
                })
              }
            </YAxis>
          </HighchartsChart>
        </div>
      );
  }
}

export default withHighcharts(SheetDataChart, Highcharts);