// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import Highcharts from 'highcharts/highstock';


import React from 'react'
import ReactDOM from 'react-dom'
import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsExporting from 'highcharts-exporting'

// HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

export default class ChartView extends React.Component {
  state = {
    config: {}
  }
  componentWillMount() {
    const { series, categories, title } = this.props
    this.generateConfig(series, categories, title)
  }
  componentWillReceiveProps(props) {
    const { series, categories, title } = props
    this.generateConfig(series, categories, title)
  }
  generateConfig(series, categories, title) {
    const config = {
      title: {
        text: title
      },
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: categories
      },
      series: []
    }
    series.map((element) => {
      config.series.push({ data: element.estimateList, name: element.header })
    })
    this.setState({ config: Object.assign({}, config) })
  }
  render() {
    return <ReactHighcharts config = {this.state.config}></ReactHighcharts>
  }
}
