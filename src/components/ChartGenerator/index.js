import React from 'react'
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'
import HighchartsExportCSV from 'highcharts-export-csv'

HighchartsExporting(ReactHighcharts.Highcharts)
HighchartsExportCSV(ReactHighcharts.Highcharts)

export default class ChartGenerator extends React.Component {
  state = {
    config: {}
  }
  componentWillMount() {
    const { series, categories, title, chartType } = this.props
    this.generateConfig(series, categories, title, chartType)
  }
  componentWillReceiveProps(props) {
    const { series, categories, title, chartType } = props
    this.generateConfig(series, categories, title, chartType)
  }

  generateConfig(series, categories, title, chartType) {
    if (title === '' && series) {
      title = series[0].report
    }
    const config = {
      title: {
        text: title
      },
      credits: {
        enabled: false
      },
      chart: {
        type: chartType
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: '$Millions',
          align: 'high',
          offset: 0,
          rotation: 0,
          y: -20
        }
      },
      series: []
    }
    series.forEach((element) => {
      config.series.push({ data: element.estimateList, name: element.header })
    })
    this.setState({ config: Object.assign({}, config) })
  }
  render() {
    return <ReactHighcharts config = {this.state.config} ref="chart" />
  }
}

ChartGenerator.propTypes = {
  series: PropTypes.array,
  categories: PropTypes.array,
  title: PropTypes.string
};

