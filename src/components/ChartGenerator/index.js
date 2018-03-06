import React from 'react'
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'

HighchartsExporting(ReactHighcharts.Highcharts);

export default class ChartGenerator extends React.Component {
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
    series.forEach((element) => {
      config.series.push({ data: element.estimateList, name: element.header })
    })
    this.setState({ config: Object.assign({}, config) })
  }
  render() {
    return <ReactHighcharts config = {this.state.config}></ReactHighcharts>
  }
}

ChartGenerator.propTypes = {
  series: PropTypes.array,
  categories: PropTypes.array,
  title: PropTypes.string
};

ChartGenerator.defaultProps = {
  series: [],
  categories: [2014, 2015],
  title: ""
};