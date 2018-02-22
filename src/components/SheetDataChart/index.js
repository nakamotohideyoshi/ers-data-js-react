import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, ColumnSeries,
} from 'react-jsx-highcharts';

const years = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
const grossCashIncome = [103, 222, 111, 35, 114, 32, 21, 133, 32, 44, 35, 21];
const totalCashExpense = [200, 173, 65, 77, 126, 152, 163, 155, 127, 166, 172, 38];
const variableExpense = [84, 73, 33, 95, 30, 44, 32, 31, 98, 70, 42, 123];
const netFarmIncome = [47, 37, 37, 59, 29, 84, 113, 153, 119, 68, 42, 33];

class SheetDataChart extends Component {
  render() {
    return (
      <div className="app">
        <HighchartsChart>
          <Chart />
          <Legend  />
          <XAxis id="year" categories={years} />
          <YAxis id="number">
          <YAxis.Title>$ Millions</YAxis.Title>
            <ColumnSeries id="grossCashIncome" name="Gross Cash Income" data={grossCashIncome} />
            <ColumnSeries id="totalCashExpense" name="Total Cash Expense" data={totalCashExpense} />
            <ColumnSeries id="variableExpense" name="Variable Expense" data={variableExpense} />
            <ColumnSeries id="netFarmIncome" name="Net Farm Income" data={netFarmIncome} />
          </YAxis>
        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(SheetDataChart, Highcharts);