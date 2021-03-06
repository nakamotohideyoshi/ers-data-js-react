import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'
import HighchartsExportCSV from 'highcharts-export-csv'
import BrokenAxis from 'highcharts/modules/broken-axis'
import Accessibility from 'highcharts/modules/accessibility'
import {CSVLink} from 'react-csv';

import { numberWithCommas } from '../../helpers/NumberWithCommas'
import DownloadImg from '../../images/download.png'

HighchartsExporting(ReactHighcharts.Highcharts)
HighchartsExportCSV(ReactHighcharts.Highcharts)
BrokenAxis(ReactHighcharts.Highcharts)
Accessibility(ReactHighcharts.Highcharts)
export default class ChartGenerator extends React.Component {
  state = {
    config: {},
    isDropdownOpened: false,
    csvChartArray: [],
    csvTableArray: [],    
  }
  componentWillMount() {
    const { series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, isGovernmentPayments, isTotalGP, isLoading } = this.props
    if (series.length > 0) {
      if (isGovernmentPayments)
        this.generateGPConfig(series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, isGovernmentPayments, isTotalGP, isLoading)
      else 
        this.generateConfig(series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, isGovernmentPayments, isLoading)
    }
  }
  componentWillReceiveProps(props) {
    const { series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, isGovernmentPayments, visibleGP, isTotalGP, isLoading } = props
    if (series.length > 0)  {
      let filteredSeries=[]
      if (isGovernmentPayments) {
        if (!isTotalGP) {
          series.forEach(single => {
            if (single[0]['header'] === visibleGP) {
              filteredSeries.push(single)
            }
          })
        } else {
          series.forEach(single => {
            if (single[0]['shown'] === true) 
              filteredSeries.push(single)
          })
        }
        this.generateGPConfig(filteredSeries, series, categories, title, chartType, whichOneMultiple, fontSizeIndex, visibleGP, isGovernmentPayments, isTotalGP, isLoading)
      } else this.generateConfig(series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, isGovernmentPayments, isLoading)
    }
  }
  generatorHeadinInfo(data) {
    let headingInfo = ""
    let filterFirst = ""
    let filterSecond = ""
    let filter1Header = ""
    let filter2Header = ""
    let filter1Content = ""
    let filter2Content = ""
    let filterContent = ""

    if (data.serie_element !== "TOTAL") {
      filterFirst = data.serie2 === "All Farms" || data.serie2 === undefined ? "Filter - " : "Filter1 - "
      filterSecond = data.serie === "TOTAL" ? "Filter - " : "Filter2 - "

      filter1Header = filterFirst + data.serie
      filter1Content = data.serie_element === "TOTAL" ? "" : ": " + data.serie_element

      if (data.serie2_element !== "TOTAL") {
        filter2Header = ", " + filterSecond + data.serie2
        filter2Content = data.serie2_element === "TOTAL" ? "" : ": " + data.serie2_element
      } else {
        filter2Header = ""
        filter2Content = ""
      }
      filterContent = filter1Header + filter1Content
      if (data.dataSource > 0)
        filterContent += filter2Header + filter2Content
    } else {
      filterContent = ""
    }

    headingInfo += data.dataSource > 0 ? "Data Source: " + data.dataSource + ", " : "Tailored Report - "
    headingInfo += "Report: " + data.report + ", "
    headingInfo += "Subject: " + data.subject + ", "
    headingInfo += filterContent + ", "                              
    headingInfo = headingInfo.slice(0, -2)
    if (filterContent === "")
      headingInfo = headingInfo.slice(0, -2)

    return headingInfo
  }
  generateCSVChart(series, categories, isGovernmentPayments, csvTitle) {
      const { visibleGP } = this.props
      let csvChartArray = []

      const headerFilter = ['']
      headerFilter.push('Source:')
      headerFilter.push('Economic Research Services, US Dept of Agriculture')  
      csvChartArray.push(headerFilter)

      const reporting = ['', '', csvTitle]   
      csvChartArray.push(reporting)

      const headerSpacing = ['', '']   
      csvChartArray.push(headerSpacing)

      csvChartArray[3] = ["Categories"]
      csvChartArray[3] = csvChartArray[3].concat(categories)

      if (!isGovernmentPayments) { 
        let i = 3
        series.forEach((element, seriesIndex) => {
          if (element.shown) {
            i++
            csvChartArray[i] = [element.header + (element.unit_desc !== 'Dollars per farm'  ? `(${element.unit_desc})` : '')]
            const estimateList = element.estimateList.map(est => numberWithCommas(est))
            csvChartArray[i] = csvChartArray[i].concat(estimateList)
          } else if (!element.id) {
            i++
            let optionsRow = [this.generatorHeadinInfo(element)]
            csvChartArray[i] = optionsRow
          }
        })
      } else {
        series.forEach((singleGroup, groupIndex) => {
          Array.from(singleGroup).forEach((subItem, subIndex) => {
            if (subItem.header === visibleGP) {
              if (subIndex === 0) 
              csvChartArray.push([subItem.header + (subItem.unit_desc !== 'Dollars per farm'  ? `(${subItem.unit_desc})` : '')])
              let estRow = [subItem.group_header]
              if (subItem.group_header !== 'All farms') {
                estRow = estRow.concat(subItem.estimateList)
                csvChartArray.push(estRow)
              }
            }
          })
        })
      }
      
      this.setState({ csvChartArray })
  }
  generateCSVTable(series, categories, isGovernmentPayments, csvTitle) {
    const { title } = this.props
    const csvTableArray = [];

    const isMedianEnabled = title === 'Farm Business Balance Sheet' || 
                            title === 'Farm Business Income Statement' || 
                            title === 'Farm Business Debt Repayment Capacity' || 
                            title === 'Operator Household Income' || 
                            title === 'Operator Household Balance Sheet'

    const headerFilter = ['']
    headerFilter.push('Source:')
    headerFilter.push('Economic Research Services, US Dept of Agriculture')  
    csvTableArray.push(headerFilter)

    const reporting = ['', '', csvTitle]   
    csvTableArray.push(reporting)

    const headerSpacing = ['', '']   
    csvTableArray.push(headerSpacing)

    const header = ['', '']
    if (categories) {
      categories.forEach( category => {
        header.push(category)
      })
    }
    csvTableArray.push(header)

    if (!isGovernmentPayments) {
      series.forEach( element => {
        if (element.id) {
          let estRow = [element.header + (element.unit_desc !== 'Dollars per farm'  ? `(${element.unit_desc})` : ''), 'Estimate']
          let rseRow = ['', 'RSEᵃ']
          let mdnRow = ['', 'Median']          
          estRow = estRow.concat(element.estimateList)
          rseRow = rseRow.concat(element.rseList)
          mdnRow = mdnRow.concat(element.medianList)
          csvTableArray.push(estRow)
          csvTableArray.push(rseRow)
          if (isMedianEnabled)
          csvTableArray.push(mdnRow)
        } else {
          let optionsRow = [this.generatorHeadinInfo(element)]
          csvTableArray.push(optionsRow)
        }
      })
    } else {
      series.forEach((singleGroup, groupIndex) => {
        Array.from(singleGroup).forEach((subItem, subIndex) => {
          if (subIndex === 0) 
            csvTableArray.push([subItem.header + (subItem.unit_desc !== 'Dollars per farm'  ? `(${subItem.unit_desc})` : '')])
          let estRow = [subItem.group_header, 'Estimate']
          let rseRow = ['', 'RSEᵃ']
          let mdnRow = ['', 'Median']
          if (subItem.group_header !== 'All farms') {
            estRow = estRow.concat(subItem.estimateList)
            rseRow = rseRow.concat(subItem.rseList)
            mdnRow = mdnRow.concat(subItem.medianList)
            csvTableArray.push(estRow)
            csvTableArray.push(rseRow)
            if (isMedianEnabled)
            csvTableArray.push(mdnRow)
          }
        })
      })
    }
    
    this.setState({csvTableArray})
  }
  getBreakingPoints(dataSource) {
    let breaksArr = []   
    const estList = []
    const estCount = dataSource[0].estimateList.length

    estList[0] = []
    for (let ee=0;ee<estCount;ee++) {
      let indexedArr = []
      dataSource.forEach((element, i) => {
        if (element.shown) {
          indexedArr.push(element.estimateList[ee])
        }
      })
      if (dataSource.length === 1) estList[0] = estList[0].concat(indexedArr)
      else estList[ee] = indexedArr
    }

    let diffList = []
    for (let ee=0;ee<estList.length;ee++) {
      let estSingleList = estList[ee]
      estSingleList = estSingleList.sort(function(a, b){return a - b});
      
      const isBreakable = estSingleList[0]/estSingleList[estSingleList.length-1] <= 0.05
      if (isBreakable === false) return []

      let diff = 0
      let diffObj = {start: 0, to: 0, diff: 0}
        
      for (let i=0;i<estSingleList.length-1;i++) {
        const start = estSingleList[i]
        const to = estSingleList[i+1]
        if (to - start > diff && start !== null) {
          diff = to - start
          diffObj.start = start
          diffObj.to = to
          diffObj.diff = diff
        }
      }
      
      diffList.push(diffObj)
    }
    
    const maxFrom = Math.max.apply(Math, diffList.map(function(o){return o.start;}))
    const minTo =  Math.min.apply(Math, diffList.map(function(o){return o.to;}))
    const roundedFrom = Math.ceil((maxFrom*1.1)/1000) * 1000
    const roundedTo = Math.floor((minTo*0.9)/1000) * 1000
        
    breaksArr.push({
      from: roundedFrom,
      to: roundedTo
    })
    
    return breaksArr
  }
  generateGPConfig(series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, visibleGP, isGovernmentPayments, isTotalGP, isLoading) {
  
    let subReportName
    if (this.props.subReport === 1) subReportName = "Farm Payment Status"
    else if (this.props.subReport === 2) subReportName = "Total Government Payments By Type"
    else if (this.props.subReport === 3) subReportName = "Summary by Program"

    // CSV Generation for Chart/Table
    this.generateCSVChart(origin, categories, isGovernmentPayments, 'Government Payment - ' + subReportName)
    this.generateCSVTable(origin, categories, isGovernmentPayments, 'Government Payment - ' + subReportName)  
    const chartFont = fontSizeIndex/5+1


    const radius = 100
    const xSpace = 30
    const ySpace = 10
    let piesInRow = Math.floor((window.innerWidth - 420) / (radius + xSpace*2))
    let config
    if (isTotalGP) {
      config = {
        chart: {
          type: chartType
        },
        title: {
          text: 'Government Payment - ' + subReportName,
          style: { 
            fontSize: chartFont*1.4+'em'
          }
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          line: {
            animation: isLoading ? false : {
              duration: 2000
            }
          }
        },
        xAxis: { 
          labels: {
            style: {
              fontSize: chartFont+'em'
            },
            formatter: function() {
              return categories[this.value];
            }
          }
        },
        yAxis: [],
        height: 500,
        tooltip: {
          positioner: function(labelWidth, labelHeight, point) {
            const eachWidth = this.chart.chartWidth / categories.length;
            let tooltipX
            if (this.now.x > this.chart.chartWidth - eachWidth * 2)
              tooltipX = point.plotX - labelWidth/3;
            else tooltipX = point.plotX  + 30
            return {
                x: tooltipX,
                y: 30
            };
          }
        },
        series: []
      }
      series.forEach(singleArray => {
        const singleSeriesData = singleArray[0]['estimateList']
        singleSeriesData.forEach((single, i) => {
          if (single === 0 || single === null) {
            singleSeriesData[i] = {
              y: 0,
              dataLabels: {
                enabled: true,
                backgroundColor: 'rgba(252, 255, 197, 0.7)',
                shadow: false,
                format: 'NA',
                verticalAlign: 'bottom',
                y: -8
              }
            }
          }
        })
        const singleSeries = {
          data: singleArray[0]['estimateList'], 
          name: singleArray[0]['header'],
        }
        config.series.push(singleSeries)
      })
      
      let trailReduce = ''
      if (series.length > 0)
      if (Math.min.apply(null, series[0][0]['estimateList']) > 1000) {
        trailReduce = " (000's)"
      }
      config.yAxis.push({
        title: {
          text: "Number of Farms" + trailReduce,
          style: {
            fontSize: chartFont+'em'
          }           
        },
        labels: {
          style: {
            fontSize: chartFont+'em'
          },
          formatter: function () {
            const isReducePossible = this.value/1000 > 1

            let axisFormat = numberWithCommas(isReducePossible ? Math.round(this.value/1000) : this.value)
            return '<span style="margin-left:-30px" className="font-'+fontSizeIndex+'-normal">'+ numberWithCommas(axisFormat) +'</span>';
          }
        }
      })
    } else {
      config = {
        title: {
          text: 'Government Payment - ' + subReportName,
          style: { 
            fontSize: chartFont*1.4+'em'
          }
        },
        chart: {
          height: (radius+ySpace*2)*Math.floor(categories.length/piesInRow) + (radius*4) + 10*(fontSizeIndex/5+1),
          type: 'pie',
          events: {
            load: function () {
              const label = this.renderer.label("Source: Economic Research Services, US Dept of Agriculture")
                .css({
                  fontSize: chartFont*0.9+'em',
                  color: '#000000'
                })
                .add();
              label.align(ReactHighcharts.Highcharts.extend(label.getBBox(), {
                align: 'right',
                x: 0, // offset
                verticalAlign: 'bottom',
                y: -10 // offset
              }), null, 'spacingBox');

              this.renderer.image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAYAAABxnDbHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq1JREFUeNrElG1ozVEcx8+uu83zU9tKYWa2MBaTh6Zle6FbEqKwUkqSSChPuWWJW/JG44XEC4WWF2RR3KKrECLPxBReIDO0eRrTxuf33/fa/652SbP96nPO+Z//+Z3fw/mdk+JCkbBzbjJsctFwjTMJRSbRLuR7M+OZjFdABtyDjVAAFa5N3sEjOI7OK+eXUGQxbYz52vhUADJhLrz1LW2GUShM9TZybo2pQxoMhp/SuQjzYTeMhRp0FrhEMSdX+icCrmP5BMUy8ANPm+jXQWPCqmi4xctQNLycr7NwFMPZirKEdgKsYpz2N0ZNLiuyhyiZwVQ2b0iy/iD0hCX6Xg1bIQsW/clovaK4QWtn0gP2eOcWioxLYvSl+mGsG0rfW3q1ylJSoym+9NmZ5sA2sI22JzE6XP1TL6XOPYNZcAuKcGR63GidFmb5lG3zjywqluHPsIPRVRiUxOgyaFDxzYY7MBBOqTjXtkYUiuTrZ5W8S4cjsNfzzrnvsE9R2LotcB1uw3rYDyNhgyraqjnPWx8NV/iuzknaOZa1gO6mhR2E8171OXeM+Qv0JyAXTsMhz0g0fEDpr4ZSRWXX4qZ3zZy7BhPhXLssmNEzloEUV15mEfSFDx5VsSbXGVJe1k/7WjUP8P2pM6OHlZIWTX6BFyqC+3DF874q1uzb0K5RvtKaI7JVF5l6vVI7cKfSjI5mMEIexcWi/aYrMATGa6MpUAj95dRz8fp3ppx7r75eAQT0kqXHH52g3lXz+gE8UbmblyU6sz76dxd2eQ9F6/3L9e5ja6XbeJoizZCOpbSXDLaLtC1llpZysMjfwCV4DGNUGEV66PNk9F+lMqjzKZR31UpVqa5MQcJD0UkSlNd2ZvNghp68/ypmdCcsdV0oAdcN0i1GLb1f9Uh3lTT+EmAAt2yr1kwO7ucAAAAASUVORK5CYII=', label.alignAttr.x-40,label.alignAttr.y+2*fontSizeIndex, 30, 20).add();
              //Headings
              series.filter(item=> item.length > 1).forEach((singleGroup, groupIndex) => {
                const labelHeading = this.renderer.label(singleGroup[0].header)
                .css({
                  fontSize: chartFont+'em',
                  color: '#000000'
                })
                .add();
                labelHeading.align(ReactHighcharts.Highcharts.extend(label.getBBox(), {
                  x: (radius+xSpace)*2+(radius+xSpace)*[Math.min(piesInRow, singleGroup[0]['estimateList'].length)%2 === 0 ? (Math.min(piesInRow, singleGroup[0]['estimateList'].length))/2 : (Math.min(piesInRow, singleGroup[0]['estimateList'].length)-1)/2], 
                  y: (radius+ySpace*2)*Math.floor((categories.length-1)/piesInRow) + (radius+ySpace)*2,
                }), null, 'spacingBox');
              })
              categories.forEach((category, catIndex) => {
                const labelHeading = this.renderer.label(category)
                .css({
                  fontSize: chartFont+'em',
                  width: radius,
                  textAlign: 'center',
                  color: '#000000'
                })
                .add();
                labelHeading.align(ReactHighcharts.Highcharts.extend(label.getBBox(), {
                  x: (radius+xSpace)*2 + (radius+xSpace)*(catIndex%piesInRow),
                  y: (radius+ySpace*3)*Math.floor(catIndex/piesInRow)+radius/2,
                }), null, 'spacingBox');
              })
            }
          },
        },  
        plotOptions: {
          line: {
            animation: isLoading ? false : {
              duration: 2000
            }
          },
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true,
          }
        },
        legend: {
          enabled: true,
          floating: true,
          verticalAlign: 'xbottom',
          itemMarginBottom: 5,
          itemStyle: {
            fontSize: chartFont+'em'
          },
          y: (radius+ySpace*2)*Math.floor((categories.length-1)/piesInRow) + (radius+ySpace)*2 + ySpace*2,
          labelFormatter : function() { 
            let displayName = this.name
            return displayName
          }
        },    
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: []
      }
      series.forEach((singleGroup, groupIndex) => {
        if (singleGroup.length > 1) {
          categories.forEach((category, catIndex) => {
            const singleLine = {
              type: 'pie',
              colorByPoint: true,
              name: category,
              center: [(radius+xSpace)*(catIndex%piesInRow+2), radius/2+ySpace*1.5+(radius+ySpace*3)*Math.floor(catIndex/piesInRow) ],
              size: radius,
              dataLabels: {
                enabled: false
              },
              data: [
              ]
            }
            const singleLineData = []
              singleGroup.forEach((subItem, subIndex) => {
                if (subItem.group_header !== 'All farms')
                singleLineData.push([subItem.group_header, subItem.estimateList[catIndex]])
              })
            singleLine.data = singleLineData
            if (catIndex === 0) singleLine.showInLegend = true
            else singleLine.showInLegend = false
            config.series.push(singleLine)
          })
        }
      })
    }
    this.setState({ config: Object.assign({}, config) })
  }
  generateConfig(series, origin, categories, title, chartType, whichOneMultiple, fontSizeIndex, isGovernmentPayments, isLoading) {
 
    // CSV Generation for Chart/Table
    this.generateCSVChart(origin, categories, isGovernmentPayments, this.props.csvTitle)
    this.generateCSVTable(origin, categories, isGovernmentPayments, this.props.csvTitle)  

    const chartFont = fontSizeIndex/5+1
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

    /* To hide empty Farms charts section */
    let seriesFarmsShown = false
    if (seriesFarms.length > 0) {
      seriesFarms.forEach((element, index) => {
        if (element.shown) seriesFarmsShown = true
      })
    }
    /* To hide empty Other charts section */
    let seriesOthersShown = false
    if (seriesOthers.length > 0) {
      seriesOthers.forEach((element, index) => {
        if (element.shown) seriesOthersShown = true
      })
    }

    let unitDescs = []
    let seriesOthersUnitBased = []

    seriesOthers.forEach((element, i) => {
      if (unitDescs.indexOf(element.unit_desc) < 0 && element.shown) {
        unitDescs.push(element.unit_desc)
        seriesOthersUnitBased.push([])
      }
    })
    unitDescs.forEach((unit, i) => {
      seriesOthers.forEach((element) => {
        if (element.unit_desc === unit)
        seriesOthersUnitBased[i].push(element)
      })
    })
    // Chart configuration
    let colorSet = []
    const darkBlue = '#23527c'
    const config = {
      title: {
        text: title,
        style: { 
          fontSize: chartFont*1.4+'em'
        }
      },
      chart: {
        height: 500 + unitDescs.length * 50,
        type: chartType,
        events: {
          load: function () {
            const label = this.renderer.label("Source: Economic Research Services, US Dept of Agriculture")
              .css({
                fontSize: chartFont*0.9+'em',
                color: '#000000'
              })
              .add();
            label.align(ReactHighcharts.Highcharts.extend(label.getBBox(), {
              align: 'right',
              x: 0, // offset
              verticalAlign: 'bottom',
              y: -10 // offset
            }), null, 'spacingBox');

            this.renderer.image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAYAAABxnDbHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq1JREFUeNrElG1ozVEcx8+uu83zU9tKYWa2MBaTh6Zle6FbEqKwUkqSSChPuWWJW/JG44XEC4WWF2RR3KKrECLPxBReIDO0eRrTxuf33/fa/652SbP96nPO+Z//+Z3fw/mdk+JCkbBzbjJsctFwjTMJRSbRLuR7M+OZjFdABtyDjVAAFa5N3sEjOI7OK+eXUGQxbYz52vhUADJhLrz1LW2GUShM9TZybo2pQxoMhp/SuQjzYTeMhRp0FrhEMSdX+icCrmP5BMUy8ANPm+jXQWPCqmi4xctQNLycr7NwFMPZirKEdgKsYpz2N0ZNLiuyhyiZwVQ2b0iy/iD0hCX6Xg1bIQsW/clovaK4QWtn0gP2eOcWioxLYvSl+mGsG0rfW3q1ylJSoym+9NmZ5sA2sI22JzE6XP1TL6XOPYNZcAuKcGR63GidFmb5lG3zjywqluHPsIPRVRiUxOgyaFDxzYY7MBBOqTjXtkYUiuTrZ5W8S4cjsNfzzrnvsE9R2LotcB1uw3rYDyNhgyraqjnPWx8NV/iuzknaOZa1gO6mhR2E8171OXeM+Qv0JyAXTsMhz0g0fEDpr4ZSRWXX4qZ3zZy7BhPhXLssmNEzloEUV15mEfSFDx5VsSbXGVJe1k/7WjUP8P2pM6OHlZIWTX6BFyqC+3DF874q1uzb0K5RvtKaI7JVF5l6vVI7cKfSjI5mMEIexcWi/aYrMATGa6MpUAj95dRz8fp3ppx7r75eAQT0kqXHH52g3lXz+gE8UbmblyU6sz76dxd2eQ9F6/3L9e5ja6XbeJoizZCOpbSXDLaLtC1llpZysMjfwCV4DGNUGEV66PNk9F+lMqjzKZR31UpVqa5MQcJD0UkSlNd2ZvNghp68/ypmdCcsdV0oAdcN0i1GLb1f9Uh3lTT+EmAAt2yr1kwO7ucAAAAASUVORK5CYII=', label.alignAttr.x-40,label.alignAttr.y+2*fontSizeIndex, 30, 20).add();
              
          }
        },
      },  
      credits: {
        enabled: false
      },
      xAxis: {
        labels: {
          style: {
            fontSize: chartFont+'em'
          },
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
        },
        line: {
          animation: isLoading ? false : {
            duration: 2000
          }
        }
      },
      legend: { 
        itemStyle: {
          fontSize: chartFont+'em'
        },
        symbolRadius: 0,
        y: -40
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        style: {
          fontSize: chartFont*0.9+'em'
        },
        shared: true,        
        formatter: function () {
            let s = '<div style="padding: 5px;">'+ categories[this.x] +'</div>'
            s += '<div style="display: flex; flex-direction: column; flex-wrap: no-wrap;">'
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
          const eachWidth = this.chart.chartWidth / categories.length;
          let tooltipX
          if (this.now.x > this.chart.chartWidth - eachWidth * 2)
            tooltipX = point.plotX - labelWidth/3;
          else tooltipX = point.plotX  + 30
          return {
              x: tooltipX,
              y: 30
          };
        }
      },
      series: []
    }
    
    //Push Y Axis for Series Farms
    if (seriesFarms.length > 0 && seriesFarmsShown) {
      let trailReduce = ''
      if (Math.min.apply(null, seriesFarms[0].estimateList) > 1000) {
        trailReduce = " (000's)"
      }
      const maxVal = Math.max.apply(null, seriesFarms[0].estimateList)
      const interval = Math.pow(10, (maxVal.toString()).length - 2)
      const axisMax = Math.ceil(maxVal/interval)*interval
      const breakPoints = this.getBreakingPoints(seriesFarms)
      config.yAxis.push({
        title: {
          text: "Number of Farms" + trailReduce,
          style: {
            fontSize: chartFont+'em'
          }           
        },
        max: axisMax,
        tickInterval: interval,
        lineWidth: 1,
        breaks: breakPoints,         
        top: seriesOthers.length > 0 && seriesOthersShown ? '80%' : '0%',
        height: seriesOthers.length > 0 && seriesOthersShown ? '20%' : '100%',
        labels: {
          style: {
            fontSize: chartFont+'em'
          },
          formatter: function () {
            const isReducePossible = this.value/1000 > 1

            let axisFormat = numberWithCommas(isReducePossible ? Math.round(this.value/1000) : this.value)
            return '<span style="margin-left:-30px" className="font-'+fontSizeIndex+'-normal">'+ numberWithCommas(axisFormat) +'</span>';
          }
        },
        events: {
          pointBreak: function(e) {
            if (chartType === 'column') {
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
                          'stroke-width': 3,
                          stroke: point.series.options.borderColor
                      })
                      .add(point.graphic.parentGroup);
              } else {
                  point[key].attr({
                      d: path
                  });
              }
            }
          }
        },
      })
      if (breakPoints.length === 0) {
        delete config.yAxis[config.yAxis.length-1].tickInterval
      }

      // Populate dataset into the chart view
      if (seriesFarms.length > 0 && seriesFarmsShown) {
        seriesFarms.forEach((element, index) => {
          const seriesData = element.estimateList
          seriesData.forEach((singleVal, i) => {
            if (singleVal === 0 || singleVal === null) 
              seriesData[i] = {
                y: 0,
                dataLabels: {
                  enabled: true,
                  backgroundColor: 'rgba(252, 255, 197, 0.7)',
                  shadow: false,
                  format: 'NA',
                  verticalAlign: 'bottom',
                  y: -8
                }
              }
          })
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
      seriesOthersUnitBased.forEach((singleOther, unitIndex) => {
        const totalHeightPercentage = seriesFarms.length > 0 && seriesFarmsShown ? 75:100
        let trailReduce = ''
        if (Math.min.apply(null, singleOther[0].estimateList) > 1000) {
          trailReduce = " (000's)"
        }
        config.yAxis.push({
          title: {
            text: unitDescs[unitIndex] + trailReduce,
            style: {
              fontSize: chartFont+'em'
            },
          },
          lineWidth: 1,
          breaks: this.getBreakingPoints(singleOther),
          events: {
            pointBreak: function(e) {
              if (chartType === 'column') {
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
                          'stroke-width': 3,
                          stroke: point.series.options.borderColor
                      })
                      .add(point.graphic.parentGroup);
                } else {
                  point[key].attr({
                      d: path
                  });
                }
              }
            }
          },
          top: `${unitIndex*((totalHeightPercentage-3*(unitDescs.length-1))/unitDescs.length+3)}%`,
          height: `${(totalHeightPercentage-3*(unitDescs.length-1))/unitDescs.length}%`,
          offset: 0,
          labels: {
            style: {
              fontSize: chartFont+'em'
            },
            formatter: function () {
              const isReducePossible = this.value/1000 > 1
              let axisFormat = numberWithCommas(isReducePossible ? Math.round(this.value/1000) : this.value)
              return '<span>'+ axisFormat +'</span>';
            },
          },
        })
      })

      /* Choose already created Y-axis and populate them as Unit based. */
      seriesOthersUnitBased.forEach((singleOther, i) => {
        singleOther.forEach((element, index) => {
          const seriesData = element.estimateList
          seriesData.forEach((singleVal, i) => {
            if (singleVal === 0 || singleVal === null) 
              seriesData[i] = {
                y: 0,
                dataLabels: {
                  enabled: true,
                  backgroundColor: 'rgba(252, 255, 197, 0.7)',
                  shadow: false,
                  format: 'NA',
                  verticalAlign: 'bottom',
                  y: -8
                }
              }
          })
          config.series.push({ 
            data: seriesData, 
            name: element.header, 
            visible: element.shown, 
            showInLegend: element.shown, 
            zIndex: 0, 
            yAxis: seriesFarms.length > 0 && seriesFarmsShown ? 1+i : i,
            maxPointWidth: 32,
          })
        })
      })
    }

    /* Breaking Points in Y-Axis */
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
  getCurrentDateTimeFormat() {
    const dateNow = new Date()
    let hrs = dateNow.getHours()
    let mins = dateNow.getMinutes()
    let secs = dateNow.getSeconds()
    hrs = hrs < 10 ? '0' + hrs : hrs;
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;
    var strTime = hrs + '-' + mins + '-' + secs;
    const dateFormat = (dateNow.getMonth()+1) + '-' + dateNow.getDate() + '-' + dateNow.getFullYear() + '-' + strTime
    let fileName = dateFormat + '-arms-'
    const reportTitle = this.props.title ? this.props.title + '-' : 'data-analysis-'
    fileName = fileName.concat(reportTitle)
    return fileName
  }
  downloadFile(type) {
    let filename  = this.getCurrentDateTimeFormat()
    let ext = type.split('/')
    filename = filename.concat(ext[1])
    this.refs.chart.getChart().exportChart({ type, filename })
  }
  printChart() {
    this.refs.chart.getChart().print()
  }
  toggleDropdown = () => {
    let {config} = this.state
    const isDropdownOpened = !this.state.isDropdownOpened    
    config.plotOptions.line.animation = false
    this.setState({ isDropdownOpened, config })
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (event) => {
    if (this.btnDropdown && !this.btnDropdown.contains(event.target)) {
    this.setState({ isDropdownOpened: false })
    }
  }
  onEnterKeyDown(event, type) {
    if (event.keyCode === 13) {
      switch (type) {
        case 'print': 
          this.printChart()
          break
        case 'application/pdf': 
        case 'image/png': 
        case 'image/jpeg': 
        case 'application/svg': 
          this.downloadFile(type)
          break
        case 'chart-csv': 
          ReactDOM.findDOMNode(this.chartCSV).click()
          break
        case 'table-csv': 
          ReactDOM.findDOMNode(this.tableCSV).click()
          break
        default: break
      }
      this.toggleDropdown()
    }
  }
  render() {
    const { fontSizeIndex, isGovernmentPayments, isTotalGP } = this.props
    const { config, isDropdownOpened, csvChartArray, csvTableArray,  } = this.state
    const notPrintable = (isGovernmentPayments && !isTotalGP) ? true:false

    return (
      <div>
        <div className="btn-download">
          <div className="dropdown open btn-group btn-group-sm btn-group-default">
            <button id="dropdown-no-caret" className="dropdown-toggle btn btn-sm btn-default" onClick={this.toggleDropdown}>
              <div className="btn-download-content" tabIndex="1200">
                <img src={DownloadImg} alt="Download Icon" /> <span className={`download-label font-${fontSizeIndex}-big`}>Download</span>
              </div>
            </button>
            {
              (isDropdownOpened && !notPrintable) && 
                  <ul role="menu" className={`dropdown-menu dropdown-menu-right font-${fontSizeIndex}-big`} ref={node => this.btnDropdown = node}>
                    <li tabIndex="1201" onClick={() => this.printChart()} onKeyDown={(event) => this.onEnterKeyDown(event, 'print') }><a>Print</a></li>
                    <li tabIndex="1202" onClick={() => this.downloadFile('application/pdf')} onKeyDown={(event) => this.onEnterKeyDown(event, 'application/pdf') }><a>PDF</a></li>
                    <li tabIndex="1203" onClick={() => this.downloadFile('image/png')} onKeyDown={(event) => this.onEnterKeyDown(event, 'image/png') }><a>PNG</a></li>
                    <li tabIndex="1204" onClick={() => this.downloadFile('image/jpeg')} onKeyDown={(event) => this.onEnterKeyDown(event, 'image/jpeg') }><a>JPEG</a></li>
                    <li tabIndex="1205" onClick={() => this.downloadFile('application/svg')} onKeyDown={(event) => this.onEnterKeyDown(event, 'application/svg') }><a>SVG</a></li>
                    <li tabIndex="1206" onKeyDown={(event) => this.onEnterKeyDown(event, 'chart-csv') }>
                      <CSVLink data={csvChartArray} filename={`${this.getCurrentDateTimeFormat()}chart-csv.csv`} target="_self" ref={node => this.chartCSV = node}>
                        Chart (CSV)
                      </CSVLink>     
                    </li>
                    <li tabIndex="1207" onKeyDown={(event) => this.onEnterKeyDown(event, 'table-csv') }>
                      <CSVLink data={csvTableArray} filename={`${this.getCurrentDateTimeFormat()}table-csv.csv`} target="_self" ref={node => this.tableCSV = node}>
                        Table (CSV)
                      </CSVLink>     
                    </li>  
                  </ul>
            }
            {
              (isDropdownOpened && notPrintable) && 
                  <ul role="menu" className={`dropdown-menu dropdown-menu-right font-${fontSizeIndex}-big`} ref={node => this.btnDropdown = node}>
                    <li tabIndex="1207" onKeyDown={(event) => this.onEnterKeyDown(event, 'table-csv') }>
                      <CSVLink data={csvTableArray} filename={`${this.getCurrentDateTimeFormat()}table-csv.csv`} target="_self" ref={node => this.tableCSV = node}>
                        Table (CSV)
                      </CSVLink>     
                    </li>  
                  </ul>
            }
          </div>
        </div>
        {
          <ReactHighcharts config = {config} ref="chart" />
        }
      </div>
    )
  }
}

ChartGenerator.propTypes = {
  series: PropTypes.array,
  categories: PropTypes.array,
  title: PropTypes.string
};

