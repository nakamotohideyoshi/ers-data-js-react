import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import ChartGenerator from '../ChartGenerator'
import OptionGroup from '../OptionGroup'
import { YEAR_SELECTED } from '../../helpers/constants'

const chartTypes = [
  { label: 'Bar', type: 'column'},
  { label: 'Line', type: 'line'}
]

// lcs algorithm from https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_subsequence#JavaScript
function LCS(a, b) {
  var m = a.length, n = b.length,
      C = [], i, j;
  for (i = 0; i <= m; i++) C.push([0]);
  for (j = 0; j <= n; j++) C[0].push(0);
  for (i = 0; i < m; i++)
      for (j = 0; j < n; j++)
          C[i+1][j+1] = a[i] === b[j] ? C[i][j]+1 : Math.max(C[i+1][j], C[i][j+1]);
  return (function bt(i, j) {
      if (i*j === 0) { return ""; }
      if (a[i-1] === b[j-1]) { return bt(i-1, j-1) + a[i-1]; }
      return (C[i][j-1] > C[i-1][j]) ? bt(i, j-1) : bt(i-1, j);
  }(m, n));
}

class SheetDataChart extends Component {
  state = {
    originIncomeArr: [],
    incomeArr: [],
    dataSourceGroups: [],
    chartTypeIndex: 0,
    isLineEnabled: true,
    isGovernmentPayments: false
  }
  componentWillReceiveProps(props) {
    const { showList, surveyData, categories, whichOneMultiple, isTailor, isTotalGP } = props
    let originIncomeArr = []
    let incomeArr = []
    let gpArr = []    
    let isGovernmentPayments = false

    if (surveyData) {
      surveyData.forEach((dataSourceCategories, index) => {
        if (dataSourceCategories.report === 'Government Payments' && isTailor) {
          isGovernmentPayments = true
        }
        if (dataSourceCategories.data.length  > 0)
          incomeArr.push(dataSourceCategories)
        dataSourceCategories.data.forEach((element, i) => {

          let singleIncome = {}
          let currentIndex = 0

          incomeArr.forEach((income, i) => {
            if (income.id === dataSourceCategories.dataSource + element.topic_abb) {
              singleIncome = income
              currentIndex = i
              return
            }
          })
          singleIncome.shown = showList[dataSourceCategories.dataSource + element.topic_abb]
          if (!singleIncome.id) {
            singleIncome.id = dataSourceCategories.dataSource + element.topic_abb
            singleIncome.report = element.report_dim.header
            singleIncome.header = element.topic_dim.header
            singleIncome.group_header = element.topic_dim.group_header
            singleIncome.unit_desc = element.topic_dim.unit_desc
            singleIncome.sub_report_name = element.topic_dim.sub_report_name
              let estimateList = []
              let rseList = []
              let medianList = []
              categories.forEach(category => {
                const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year : element.state.name
                if (comparedCategory === category) {
                  estimateList.push(element.estimate < 0 ? 0 : element.estimate)
                  rseList.push(element.rse < 0 ? 0 : element.rse)
                  medianList.push(element.median === null ? 0 : element.median)
                } else {
                  estimateList.push(0)
                  rseList.push(0)
                  medianList.push(0)                  
                }
              })
              singleIncome.estimateList = estimateList
              singleIncome.rseList = rseList
              singleIncome.medianList = medianList
              singleIncome.isGovernmentPayments = isGovernmentPayments
              if (isGovernmentPayments) {
                let duplicateHeaderElement = false
                incomeArr.forEach(item => {
                  if (singleIncome.header === item.header)
                    duplicateHeaderElement = true
                })  
                if (!duplicateHeaderElement) {
                  gpArr.push(singleIncome)
                }
              }
              incomeArr.push(singleIncome)
          } else {
              categories.forEach((category, index) => {
                const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year: element.state.name
                if (comparedCategory === category) {
                  singleIncome.estimateList[index] = element.estimate < 0 ? 0 : element.estimate;
                  singleIncome.rseList[index] = element.rse < 0 ? 0 : element.rse;
                  singleIncome.medianList[index] = element.median === null ? 0 : element.rse;                  
                } 
              })
              incomeArr[currentIndex] = singleIncome
          }
        })
      })
    }
    
    originIncomeArr = incomeArr
    incomeArr = incomeArr.filter(item => item.id !== undefined) 

    const gpList = {}
    let gpDataSet = []

    incomeArr.forEach(income => {
      if (income.group_header !== undefined)
        if (gpList[income.header]) {
          const result = gpList[income.header].find( element => element.group_header === income.group_header );
          if (!result) {
            gpList[income.header].push(income)
          }            
        } else {
          gpList[income.header] = [income]
        }
    })

    let indx = 0
    let collectionGroup = []
    gpArr.forEach(income => {
      if (income.id) {
        const gpCount = gpList[income.header] ? (gpList[income.header]).length : 0
        const gpLimit = isTotalGP ? 0 : 1
        if (gpCount > gpLimit) {
          gpDataSet[indx] = gpList[income.header]
        } else {
          collectionGroup = collectionGroup.concat(gpList[income.header])
        }
        indx++
      }
    })

    const singledLinedNameList = []  
    let isCollectable = false      
    if (!isTotalGP) {
      for (let key in gpList) {
        if (gpList[key].length === 1) {
          isCollectable = true
          singledLinedNameList.push(gpList[key][0].header)
        }
      }

      if (isCollectable) {
        let compared = singledLinedNameList[0]
        singledLinedNameList.forEach((item, index) => {
          compared = LCS(compared, item)
        })
  
        collectionGroup.map(item => {
          item.header = compared
          return item
        })
      }

      gpDataSet.push(collectionGroup)
      
    }

    if (isGovernmentPayments) {
      incomeArr = gpDataSet
    } else {
      if (incomeArr.length > 0) {
        if (incomeArr[0].estimateList.length === 1) {
          this.switchChartType(0)
          this.setState({ isLineEnabled: false })
        } else {
          this.setState({ isLineEnabled: true })
        }
      }
    }

    this.setState({ incomeArr: incomeArr.slice(), originIncomeArr: originIncomeArr.slice() })
    this.setState({ isGovernmentPayments })
  }
  switchChartType(chartTypeIndex) {
    this.setState({ chartTypeIndex })
  }
  render() {
    const { incomeArr, originIncomeArr, chartTypeIndex, isLineEnabled, isGovernmentPayments } = this.state
    let { categories, blockIndex, fontSizeIndex, whichOneMultiple, visibleGP, isTotalGP, isLoading, subReport, toggleAll } = this.props
    
    let chartTitle = ''
    let csvTitle = 'ARMS data analysis'
    if (incomeArr.length > 0 && blockIndex < 1) {
      chartTitle = incomeArr[0].report
      csvTitle = 'Tailored Report: ' + incomeArr[0].report
    }
    const chartType = chartTypes[chartTypeIndex].type
    let chartTypesArray = isLineEnabled ? chartTypes : [chartTypes[0]]
    
    let chartTypeVisible = true
    if (isGovernmentPayments && !isTotalGP) {
        chartTypeVisible = false
    }

    if (isTotalGP && visibleGP === "Farms") {
      visibleGP = incomeArr[0][0].header
    }
    if (incomeArr.length === 0)
      return (<div className="empty-data-notification">No data to display</div>)
    else if (toggleAll === false)
      return (<div className="empty-data-notification">All data is hidden from chart, please use eye icons in table for chart visualizations.</div>)
    else
      return (
        <div className="chart-container col-xs-12">
          <ChartGenerator 
            series={incomeArr}
            origin={originIncomeArr} 
            categories={categories} 
            title={chartTitle} 
            csvTitle={csvTitle} 
            chartType={chartType} 
            fontSizeIndex={fontSizeIndex} 
            whichOneMultiple={whichOneMultiple} 
            isGovernmentPayments={isGovernmentPayments} 
            visibleGP={visibleGP} 
            isTotalGP={isTotalGP}
            subReport={subReport}
            isLoading = {isLoading}
          />
          {
            chartTypeVisible &&
            <div className="chart-type-container">
              <span className={`font-${fontSizeIndex}-small`}>Chart Type:</span>
              <OptionGroup options={chartTypesArray} selectedIndex={chartTypeIndex} fontSizeIndex={fontSizeIndex} onSelect={(index) => this.switchChartType(index)} tabIndex={1300} />
            </div>
          }
        </div>
      );
  }
}

SheetDataChart.propTypes = {
  showList: PropTypes.object,
  surveyData: PropTypes.array,
  categories: PropTypes.array
};

export default SheetDataChart;
