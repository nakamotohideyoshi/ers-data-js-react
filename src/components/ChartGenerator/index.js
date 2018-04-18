import React from 'react'
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'
import HighchartsExportCSV from 'highcharts-export-csv'
import BrokenAxis from 'highcharts/modules/broken-axis'
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {CSVLink} from 'react-csv';

import { numberWithCommas } from '../../helpers/NumberWithCommas'
import DownloadImg from '../../images/download.png'

HighchartsExporting(ReactHighcharts.Highcharts)
HighchartsExportCSV(ReactHighcharts.Highcharts)
BrokenAxis(ReactHighcharts.Highcharts)

export default class ChartGenerator extends React.Component {
  state = {
    config: {},
    csvChartArray: [],
    csvTableArray: [],    
  }
  componentWillMount() {
    const { series, categories, title, chartType, whichOneMultiple } = this.props
    this.generateConfig(series, categories, title, chartType, whichOneMultiple)
  }
  componentWillReceiveProps(props) {
    const { series, categories, title, chartType, whichOneMultiple } = props
    this.generateConfig(series, categories, title, chartType, whichOneMultiple)
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
  getBreaingPoints(dataSource, breakSize) {
    let breaksArr = []   
    let minOverAll = 0
    if (dataSource.length > 0 && breakSize > 0) {
      const maxInitial = Math.max.apply(null, dataSource[0].estimateList)
      minOverAll = dataSource[0].estimateList[0]
      for (let iBreak = 0; iBreak < breakSize; iBreak++) {
        const minRange = iBreak*maxInitial/breakSize + 1
        const maxRange = (iBreak+1)*maxInitial/breakSize
        let isInRange = false
        dataSource.forEach((element, i) => {
          if (element.shown) {
            element.estimateList.forEach(est => {
              if (est >= minRange && est < maxRange) 
                isInRange = true
              if (est < minOverAll)
                minOverAll = est
            })
          }
        })
        if (!isInRange) {
          breaksArr.push({
            from: minRange,
            to: maxRange
          })
        }
      }
    } 
    return breaksArr
  }
  generateConfig(series, categories, title, chartType, whichOneMultiple) {
 
    // CSV Generation for Chart/Table
    this.generateCSVChart(series, categories)
    this.generateCSVTable(series, categories)  

    // Title Initialization
    if (title === '' && series) {
      title = series[0].report
    }

    // Separate Farms and other series

    const seriesFarms = series.filter((single, index) => {
      if (single.header === 'Farms') {
        single.originIndex = index
        return single
      }
      return null
    })
    const seriesOthers = series.filter((single, index) => {
      if (single.header !== 'Farms') {
        single.originIndex = index
        return single
      }
      return null      
    })

    // Chart configuration
    let colorSet = []
    const darkBlue = '#23527c'
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
        }
      },
      yAxis: [],
      plotOptions: {
        series: {
            pointPadding: 0,
            groupPadding: 0.3
        }
      },
      legend: {
        symbolRadius: 0
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        shared: true,        
        formatter: function () {
            let s = '<span style="font-size:14px; padding:5px;">'+ categories[this.x] +'</span><br />'
            s += '<div style="display: flex; flex-direction: column;  max-height: 350px; flex-wrap: no-wrap; margin-top: 5px;"><tr><th /><th /></tr>'
            this.points.forEach((point, index) => {
              colorSet.push(point.color)
              let yVal = numberWithCommas(point.y)
              s += '<div style="display: flex; justify-content: space-between"><div style="color:'+point.color+'; padding:2px 10px 2px 5px;">'+point.series.name+': </div>' +
              '<div><b>'+yVal+'</b></div></div>'
            });
            s += '</div>'
            return s;
        },
        positioner: function(labelWidth, labelHeight, point) {
          var tooltipX = point.plotX + 30;
          return {
              x: tooltipX,
              y: 30
          };
        }
      },
      series: []
    }

    let seriesFarmsShown = false
    if (seriesFarms.length > 0) {
      seriesFarms.forEach((element, index) => {
        if (element.shown) seriesFarmsShown = true
      })
    }

    let seriesOthersShown = false
    if (seriesOthers.length > 0) {
      seriesOthers.forEach((element, index) => {
        if (element.shown) seriesOthersShown = true
      })
    }

    let unitDescs = []
    
    //Push Y Axis for Series Farms
    if (seriesFarms.length > 0 && seriesFarmsShown) {
      config.yAxis.push({
        title: {
          text: "Number of Farms",
          style: {
            color: darkBlue
          }           
        },
        breaks: categories.length > 1 ? this.getBreaingPoints(seriesFarms, 4) : [],          
        top: seriesOthers.length > 0 && seriesOthersShown ? '80%' : '0%',
        height: seriesOthers.length > 0 && seriesOthersShown ? '20%' : '100%',
        labels: {
          formatter: function () {
            return '<span style="color:'+darkBlue+';margin-left:-30px">'+ numberWithCommas(this.value) +'</span>';
          }
        },
      })

      // Populate dataset into the chart view
      if (seriesFarms.length > 0 && seriesFarmsShown) {
        seriesFarms.forEach((element, index) => {
          config.series.push({ 
            data: element.estimateList, 
            name: element.header, 
            visible: element.shown, 
            showInLegend: element.shown, 
            type: 'column', 
            zIndex: index + 1, 
            yAxis: 0,
            maxPointWidth: 32,
            color: darkBlue
          })
        })
      }
    }

    if (seriesOthers.length > 0 && seriesOthersShown) {
      seriesOthers.forEach((element, i) => {
        if (unitDescs.indexOf(element.unit_desc) < 0) {
          unitDescs.push(element.unit_desc)
          config.yAxis.push({
            title: {
              text: element.unit_desc,
            },
            lineWidth: 1,
            tickInterval: Math.pow(10, (Math.min.apply(null, seriesOthers[0].estimateList)).toString().length),
            breaks: this.getBreaingPoints(seriesOthers, 5),
            events: {
              pointBreak: function(e) {
                var point = e.point,
                    brk = e.brk,
                    shapeArgs = point.shapeArgs,
                    x = shapeArgs.x,
                    y = this.translate(brk.from, 0, 1, 0, 1),
                    w = shapeArgs.width,
                    key = ['brk', brk.from, brk.to],
                    path = ['M', x, y, 'L', x + w * 0.25, y + 4, 'L', x + w * 0.75, y - 4, 'L', x + w, y];
            
                if (!point[key]) {
                    point[key] = this.chart.renderer.path(path)
                        .attr({
                            'stroke-width': 1,
                            stroke: point.series.options.borderColor
                        })
                        .add(point.graphic.parentGroup);
                } else {
                    point[key].attr({
                        d: path
                    });
                }
              }
            },
            height: seriesFarms.length > 0 && seriesFarmsShown ? '75%' : '100%',
            offset: 0,
            labels: {
              formatter: function () {
                let axisFormat = numberWithCommas(this.value)
                if (element.unit_desc === "Dollars per farm") axisFormat = '$' + axisFormat
                return '<span style="color:'+this.chart.series[element.originIndex].color+'">'+ axisFormat +'</span>';
              },
            },
          })
        }
          
      })
      seriesOthers.forEach((element, index) => {
        config.series.push({ 
          data: element.estimateList, 
          name: element.header, 
          visible: element.shown, 
          showInLegend: element.shown, 
          zIndex: 0, 
          yAxis: seriesFarms.length > 0 && seriesFarmsShown ? 1 : 0,
          maxPointWidth: 32,
        })
      })
    }
    (function(H){
      H.wrap(H.Axis.prototype, 'getLinePath', function(proceed, lineWidth) {
        var axis = this,
        path = proceed.call(this, 2),
        x = path[1],
        y = path[2];
        H.each(this.breakArray || [], function (brk) {
          if (axis.horiz) {
              x = axis.toPixels(brk.from);
              path.splice(3, 0,
                  'L', x - 4, y, // stop
                  'M', x - 9, y + 5, 'L', x + 1, y - 5, // left slanted line
                  'M', x - 1, y + 5, 'L', x + 9, y - 5, // higher slanted line
                  'M', x + 4, y
              );
          } else {
              y = axis.toPixels(brk.from);
              path.splice(3, 0,
                  'L', x, y - 4, // stop
                  'M', x + 5, y - 9, 'L', x - 5, y + 1, // lower slanted line
                  'M', x + 5, y - 1, 'L', x - 5, y + 9, // higher slanted line
                  'M', x, y + 4
              );
          }
        });
        return path
      });
    })(ReactHighcharts.Highcharts);

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

