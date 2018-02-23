import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, ColumnSeries,
} from 'react-jsx-highcharts';

class SheetDataChart extends Component {
  render() {
    const { yearsInfo } = this.props
    let years = []
    let grossCashIncomeArr = []
    let totalCashExpenseArr = []
    let variableExpenseArr = []
    let netFarmIncomeArr = []
    
    yearsInfo.forEach(infoObj => { 
      if (infoObj.checked) {
        years.push(infoObj.year)
        grossCashIncomeArr.push(infoObj.grossCashIncome)
        totalCashExpenseArr.push(infoObj.totalCashExpense)
        variableExpenseArr.push(infoObj.variableExpense)
        netFarmIncomeArr.push(infoObj.netFarmIncome)
      }
    })
    return (
      <div className="app">
        <HighchartsChart>
          <Chart />
          <Legend  />
          <XAxis id="year" categories={years} />
          <YAxis id="number">
          <YAxis.Title>$ Millions</YAxis.Title>
            <ColumnSeries id="grossCashIncome" name="Gross Cash Income" data={grossCashIncomeArr} />
            <ColumnSeries id="totalCashExpense" name="Total Cash Expense" data={totalCashExpenseArr} />
            <ColumnSeries id="variableExpense" name="Variable Expense" data={variableExpenseArr} />
            <ColumnSeries id="netFarmIncome" name="Net Farm Income" data={netFarmIncomeArr} />
          </YAxis>
        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(SheetDataChart, Highcharts);