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
    const seriesFarms = series.filter(single => single.header === 'Farms')
    const seriesOthers = series.filter(single => single.header !== 'Farms')

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
        // labels: {
        //     formatter: function() {
        //       return categories[this.value];
        //     }
        // },
        categories: categories,
        crosshair: true
      },
      yAxis: [
        {
          title: {
            text: '$Millions',
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -20
          },
          labels: {
            formatter: function () {
                return this.value / 1000000 +'M';
            }
          }
        },
      ],
      legend: {
        symbolRadius: 0
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
            let s = '<span style="font-size:14px; padding:5px;">'+ this.x +'</span><br />'
            s += '<div style="display: flex; flex-direction: column;  max-height: 350px; flex-wrap: no-wrap; margin-top: 5px;"><tr><th /><th /></tr>'
            this.points.forEach((point, index) => {
              s += '<div style="display: flex; justify-content: space-between"><div style="color:'+point.color+'; padding:2px 10px 2px 5px;">'+point.series.name+': </div>' +
              '<div><b>'+(point.y/1000000).toFixed(1)+' million</b></div></div>'
            });
            s += '</div>'
            return s;
        },
        shared: true
      },
      series: []
    }
     
    seriesFarms.forEach((element) => {
      config.series.push({ data: element.estimateList, name: element.header, visible: element.shown, showInLegend: element.shown, type: 'spline' })
    })
    seriesOthers.forEach((element) => {
      config.series.push({ data: element.estimateList, name: element.header, visible: element.shown, showInLegend: element.shown })
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

