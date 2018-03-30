import React from 'react'
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'
import HighchartsExportCSV from 'highcharts-export-csv'
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {CSVLink} from 'react-csv';

import { numberWithCommas } from '../../helpers/NumberWithCommas'
import DownloadImg from '../../images/download.png'

HighchartsExporting(ReactHighcharts.Highcharts)
HighchartsExportCSV(ReactHighcharts.Highcharts)

export default class ChartGenerator extends React.Component {
  state = {
    config: {},
    csvChartArray: [],
    csvTableArray: [],    
  }
  componentWillMount() {
    const { series, categories, title, chartType, isYearsMultiple } = this.props
    this.generateConfig(series, categories, title, chartType, isYearsMultiple)
  }
  componentWillReceiveProps(props) {
    const { series, categories, title, chartType, isYearsMultiple } = props
    this.generateConfig(series, categories, title, chartType, isYearsMultiple)
  }
  generateCSVChart(series, categories) {
      let csvChartArray = [["Categories"]]
      categories.forEach((category, index) => {
        csvChartArray[index+1] = [category]
      })
      series.forEach(element => {
        if (element.shown) {
          csvChartArray[0].push(element.header)
          element.estimateList.forEach((est, estIndex) => {
            csvChartArray[estIndex+1].push(numberWithCommas(est))
          })
        }
      })
      this.setState({ csvChartArray })
  }
  generateCSVTable(series, categories) {
    const csvTableArray = [];
    const header = ['', '']
    if (categories) {
      categories.forEach( category => {
        header.push(category)
      })
    }
    csvTableArray.push(header)
    series.forEach( element => {
      let estRow = [element.header, 'Estimate']
      let rseRow = ['', 'RSEᵃ']
      estRow = estRow.concat(element.estimateList)
      rseRow = rseRow.concat(element.rseList)
      csvTableArray.push(estRow)
      csvTableArray.push(rseRow)
    })
    this.setState({csvTableArray})
  }
  generateConfig(series, categories, title, chartType, isYearsMultiple) {
    if (title === '' && series) {
      title = series[0].report
    }
    
    this.generateCSVChart(series, categories)
    this.generateCSVTable(series, categories)    

    const seriesFarms = series.filter(single => single.header === 'Farms')
    const seriesOthers = series.filter(single => single.header !== 'Farms')

    let farmsChartType = 'column'
    if (isYearsMultiple && categories.length > 1)
      farmsChartType = 'spline'

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
        labels: {
            formatter: function() {
              return categories[this.value];
            }
        },
      },
      yAxis: [
        {
          title: {
            text: '',
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -20
          },
          labels: {
            formatter: function () {
                return this.value;
            }
          }
        },
        {
          title: {
            text: '',
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -20
          },
          labels: {
            formatter: function () {
                return this.value;
            }
          },
          opposite: true          
        }
      ],
      legend: {
        symbolRadius: 0
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
            let s = '<span style="font-size:14px; padding:5px;">'+ categories[this.x] +'</span><br />'
            s += '<div style="display: flex; flex-direction: column;  max-height: 350px; flex-wrap: no-wrap; margin-top: 5px;"><tr><th /><th /></tr>'
            this.points.forEach((point, index) => {
              let yVal = numberWithCommas(point.y)
              s += '<div style="display: flex; justify-content: space-between"><div style="color:'+point.color+'; padding:2px 10px 2px 5px;">'+point.series.name+': </div>' +
              '<div><b>'+yVal+'</b></div></div>'
            });
            s += '</div>'
            return s;
        },
        shared: true
      },
      series: []
    }
     
    seriesFarms.forEach((element, index) => {
      config.series.push({ data: element.estimateList, name: element.header, visible: element.shown, showInLegend: element.shown, type: farmsChartType, zIndex: index+1, yAxis: 1 })
    })
    seriesOthers.forEach((element) => {
      config.series.push({ data: element.estimateList, name: element.header, visible: element.shown, showInLegend: element.shown, zIndex: 0 })
    })
    
    this.setState({ config: Object.assign({}, config) })
  }
  downloadFile(type) {
    this.refs.chart.getChart().exportChart({ type })
  }
  printChart() {
    this.refs.chart.getChart().print()
  }
  render() {
    const { title } = this.props
    const { config, csvChartArray, csvTableArray } = this.state
    return (
      <div>
        <div className="btn-download">
          <DropdownButton
            bsStyle="default"
            bsSize="sm"
            pullRight
            title={<div className="btn-download-content">
            <img src={DownloadImg} alt="" /> <span className="download-label">Download</span>
          </div>}
            noCaret
            id="dropdown-no-caret"
          >
            <MenuItem eventKey="1" onClick={() => this.printChart()}>Print</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2" onClick={() => this.downloadFile('application/pdf')}>PDF</MenuItem>
            <MenuItem eventKey="3" onClick={() => this.downloadFile('image/png')}>PNG</MenuItem>
            <MenuItem eventKey="4" onClick={() => this.downloadFile('image/jpeg')}>JPEG</MenuItem>
            <MenuItem eventKey="5" onClick={() => this.downloadFile('application/svg')}>SVG</MenuItem>
            <MenuItem divider />   
            <li>
              <CSVLink data={csvChartArray} filename={`${title}-chart.csv`}>
                Chart (CSV)
              </CSVLink>     
            </li>
            <li>
              <CSVLink data={csvTableArray} filename={`${title}-table.csv`}>
                Table (CSV)
              </CSVLink>     
            </li>   
          </DropdownButton>
        </div>
        <ReactHighcharts config = {config} ref="chart" />
      </div>
    )
  }
}

ChartGenerator.propTypes = {
  series: PropTypes.array,
  categories: PropTypes.array,
  title: PropTypes.string
};

