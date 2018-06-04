import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

import OptionGroup from '../../components/OptionGroup'

import { numberWithCommas } from '../../helpers/NumberWithCommas'
import { YEAR_SELECTED } from '../../helpers/constants'
import { REMOVING_ELEMENTS } from '../../helpers/constants'
import HideAllImg from '../../images/hide_all.png'
import HiddenImg from '../../images/hide.png'
import ShownImg from '../../images/show.png'
import HelpImg from '../../images/help.png'

import './style.css'

const defaultShowTypes = [
  { label: 'Relative Standard Error', selected: false, tooltipText: 'Relative Standard Error' },
  { label: 'Median', selected: false, tooltipText: 'Median' }
]
class TableContainer extends React.Component {
  state = {
    incomeArr: [],
    showTypes: defaultShowTypes,
    selectedShowIndex: -1,
    isShowItemAll: true,
    optionsIndex: 0,
    scrollLeft: 0,
    scrollTop: 0,
  }
  formatEstimateRse(element) {
    const asterix = element.unreliable_est === 0 ? '':'*'
    let estimateVal = 'NA'
    let rseVal = 'NA'
    let medianVal = 'NA'  
      
    if (element.estimate > 0) {
      estimateVal = element.estimate + asterix
      rseVal = element.rse
    }
    if (element.rse !== 0 && element.rse !== null) {
      rseVal = element.rse
    }
    if (element.rse === null) {
      rseVal = 'NA'
    }
    if (element.median !== 0 && element.median !== null) {
        medianVal = element.median
    }

    estimateVal = numberWithCommas(estimateVal)
    rseVal = rseVal === 'NA' ? rseVal : (element.rse).toFixed(1)
    medianVal = numberWithCommas(medianVal)

    return { estimateVal, rseVal, medianVal }
  }
  componentWillReceiveProps(props) {
    const { surveyData, categories, whichOneMultiple } = props
    
    let incomeArr = []
    let gpArr = []
    let isGovernmentPayments = false
    
    if (surveyData) {
      surveyData.forEach((dataSourceCategories, index) => {
        if (dataSourceCategories.report === 'Government Payments')
          isGovernmentPayments = true
        if (dataSourceCategories.data.length  > 0)
          incomeArr.push(dataSourceCategories)
        dataSourceCategories.data.forEach((element, index) => {
          let singleIncome = {}
          let currentIndex = 1
          const isMedianEnabled = element.report_dim.header === 'Farm Business Balance Sheet' || 
                                  element.report_dim.header === 'Farm Business Income Statement' || 
                                  element.report_dim.header === 'Farm Business Debt Repayment Capacity' || 
                                  element.report_dim.header === 'Operator Household Income' || 
                                  element.report_dim.header === 'Operator Household Balance Sheet'
          if (!isMedianEnabled) 
            this.setState({ showTypes: defaultShowTypes.slice(0,1), selectedShowIndex: -1 })
          else 
            this.setState({ showTypes: defaultShowTypes, selectedShowIndex: -1 })
          
          incomeArr.forEach((income, i) => {
            if (income.id === dataSourceCategories.dataSource + element.topic_abb) {
              singleIncome = income
              currentIndex = i
              return
            }
          })
          if (REMOVING_ELEMENTS.indexOf(element.topic_dim.header) > -1 && element.topic_dim.level > 1) {
            return
          }
          if (!singleIncome.id) {
            singleIncome.id = dataSourceCategories.dataSource + element.topic_abb
            singleIncome.dataSource = dataSourceCategories.dataSource
            singleIncome.header = element.topic_dim.header
            singleIncome.group_header = element.topic_dim.group_header
            singleIncome.desc = element.topic_dim.desc
            singleIncome.unit_desc = element.topic_dim.unit_desc
            singleIncome.level = element.topic_dim.level
            singleIncome.topic_abb = element.topic_abb
            let estimateList = []
            let rseList = []
            let medianList = []
            categories.forEach(category => {
              const comparedCategory = whichOneMultiple === YEAR_SELECTED ? element.year: element.state.name
              if (comparedCategory === category) {
                estimateList.push(this.formatEstimateRse(element).estimateVal)
                rseList.push(this.formatEstimateRse(element).rseVal)
                medianList.push(this.formatEstimateRse(element).medianVal)         
              } else {
                estimateList.push('NA')
                rseList.push('NA')
                medianList.push('NA')            
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
                singleIncome.estimateList[index] = this.formatEstimateRse(element).estimateVal
                singleIncome.rseList[index] = this.formatEstimateRse(element).rseVal
                singleIncome.medianList[index] = this.formatEstimateRse(element).medianVal                
              } 
            })
            incomeArr[currentIndex] = singleIncome
          }
        })
      })
    }

    // Generate specific data set for Government Payments
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
    
    gpArr.forEach(income => {
      if (income.id) {
        gpDataSet.push({ 
          groupName: income.header,
          unit_desc: income.unit_desc,
          desc: income.desc,          
          count: gpList[income.header] ? (gpList[income.header]).length : 0,
          isGovernmentPayments: true
        })
        gpDataSet = gpDataSet.concat(gpList[income.header])
      }
    })
    if (isGovernmentPayments)
      incomeArr = gpDataSet
    // ------------------------------------
    this.setState({ incomeArr })
    this.setState({ scrollLeft: 0 })
    console.log('----', incomeArr)
    
  }
  hideItem(dataId){
    this.props.hideItem(dataId)
  }
  showItem(dataId) {
    this.props.showItem(dataId)
  }
  hideAllItem() {
    this.setState({ isShowItemAll: false })
    this.props.hideAllItem()
  }
  showAllItem() {
    this.setState({ isShowItemAll: true })
    this.props.showAllItem()
  }
  onScrollTable = () => {
    this.headerBody.scrollTop = this.tbody.scrollTop
    this.setState({ scrollLeft: this.tbody.scrollLeft })
  }
  onScrollTable1 = () => {
    this.tbody.scrollTop = this.headerBody.scrollTop
  }
  selectShowType(index) {
    const { showTypes } = this.state
    showTypes[index].selected = !showTypes[index].selected
    if (showTypes[index].selected) {
      showTypes.forEach((type, i) => {
        if (i !== index) type.selected = false
      })
      this.setState({ selectedShowIndex: index })
    } else {
      this.setState({ selectedShowIndex: -1 })
    }
    this.setState({ showTypes: showTypes.slice() })
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
  render() {
    const { incomeArr, showTypes, selectedShowIndex, isShowItemAll } = this.state
    let { showList, visibleGP, categories, blockIndex, fontSizeIndex, isTotalGP, footnotes, showGPItem } = this.props

    let visibleItem = true
    if (isTotalGP && visibleGP === "Farms") visibleGP = incomeArr[0].groupName

    if (incomeArr.length === 0 || categories.length === 0)
      return ( <div className='center-notification'>No data to display</div> )
    else
      return (
        <div>
          <div className="heading-option-container">
            <span className={`font-${fontSizeIndex}-small`}>Show Data:</span>
            <OptionGroup options={showTypes} selectedIndex={selectedShowIndex} fontSizeIndex={fontSizeIndex} onSelect={(index) => this.selectShowType(index)} tabIndex={1310} />
          </div>
          <div className={`table-container font-${fontSizeIndex}-big`}>
            <div className="col-width-3">
              <table className="table table-static">
                  <thead>
                    <tr>
                      <th className="primary-th">
                        <div className={`font-${fontSizeIndex}-normal`}>
                          {
                            isShowItemAll && 
                              <a onClick={() => this.hideAllItem()}>
                                <img src={ShownImg} alt="Show Icon" tabIndex={1400} onKeyDown={(event) => { if (event.keyCode === 13) this.hideAllItem()} } />                   
                              </a>
                          }
                          {
                            !isShowItemAll &&
                              <a onClick={() => this.showAllItem()}>
                                <img src={HideAllImg} alt="Hide Icon" tabIndex={1400} onKeyDown={(event) => { if (event.keyCode === 13) this.showAllItem()} } />
                              </a>
                          }
                        </div>
                      </th>
                    </tr>
                    <tr><th className={`font-${fontSizeIndex}-smaller`}>&nbsp;</th></tr>
                  </thead>
                  <tbody onScroll={this.onScrollTable1} ref={node=>this.headerBody=node} className="header-body">
                    {
                        incomeArr.map((data, index) => {
                          if (data !== undefined) {
                            if (!data.id) {
                              if (data.count) {
                                if (data.count === 1) visibleItem = false
                                else visibleItem = true
                              }
                              if (visibleItem) {
                                return (
                                  <tr key={`${index}`}>
                                    <td>
                                      {
                                        data.isGovernmentPayments &&
                                          <a 
                                            onClick={() => data.groupName !== visibleGP ? showGPItem(data.groupName) : null } 
                                            tabIndex={1401+index}
                                            onKeyDown={(event) =>{ if (event.keyCode === 13 && data.groupName !== visibleGP) showGPItem(data.groupName); return null }}
                                          >
                                          <img src={data.groupName === visibleGP ? ShownImg : HiddenImg } alt="show-hide" />
                                          </a> 
                                      }
                                      {
                                        data.isGovernmentPayments &&
                                          <div className="level-0">
                                            {`${data.groupName} (${data.unit_desc})`}
                                          </div>
                                      }
                                      { !data.isGovernmentPayments && this.generatorHeadinInfo(data) }
                                      &ensp;
                                      <div className="pin-continer">
                                      {
                                        data.isGovernmentPayments &&
                                        <img 
                                          src={HelpImg}
                                          className="help-img"
                                          alt="help-img" 
                                          data-tip={data.desc} 
                                          data-place="top"
                                          data-offset="{'left': 100}"
                                          tabIndex={1401+index*2+1}
                                        />
                                      }
                                      </div>
                                    </td>
                                  </tr>
                                )
                              }
                            } else {
                            const footnote = footnotes.filter(note => note.topic_abb === data.topic_abb)
                            const sign = footnote.length > 0 ? footnote[0].sign : ''
                            return (
                              <tr key={`${index}`}>
                                <td>
                                  {
                                    <div className="nowrap-div">
                                      {
                                        showList && (
                                          <a 
                                            onClick={() => showList[data.id] === true ? this.hideItem(data.id) : this.showItem(data.id)} 
                                            tabIndex={1401+index*2}
                                            onKeyDown={(event) =>{ if (event.keyCode === 13) showList[data.id] === true ? this.hideItem(data.id) : this.showItem(data.id)} }
                                          >
                                          {
                                            (data.header && !data.isGovernmentPayments) &&
                                              <img src={showList[data.id] === true ? ShownImg : HiddenImg } alt="show-hide" />
                                          }
                                          {
                                            data.data && (<div>{`Data Source ${data.dataSource}`}</div>)
                                          }
                                          </a>
                                        ) 
                                      }
                                    </div>
                                  }
                                  {
                                    visibleItem && 
                                      <div className={`pin-container ${data.isGovernmentPayments ? `level-3 font-${fontSizeIndex}-smaller` : ``}`}>
                                      {
                                        blockIndex < 1 && (
                                          <div 
                                            className={data.isGovernmentPayments ? `nowrap-div` : `level-${data.level} nowrap-div` } 
                                          >
                                          {data.isGovernmentPayments && data.group_header}
                                          {!data.isGovernmentPayments && data.header}
                                          <sup>&nbsp;{sign}</sup> 
                                          {data.header && data.unit_desc !== 'Dollars per farm' && !data.isGovernmentPayments ? '('+data.unit_desc+')' : ''}
                                          {
                                            !data.isGovernmentPayments &&
                                            <img 
                                              src={HelpImg}
                                              className="help-img"
                                              alt="Help Icon" 
                                              data-tip={data.desc} 
                                              data-place="top"
                                              data-offset="{'left': 100}"
                                              tabIndex={1401+index*2+1}
                                            />
                                          }
                                        </div>
                                        )
                                      } 
                                      {
                                        blockIndex > 0 &&
                                          <div className="level-1 nowrap-div">
                                            {data.header} {data.header && data.unit_desc !== 'Dollars per farm' && !data.isGovernmentPayments ? '('+data.unit_desc+')' : ''}
                                            {
                                              !data.isGovernmentPayments &&
                                              <img 
                                                src={HelpImg}
                                                className="help-img"
                                                alt="help-img" 
                                                data-tip={data.desc} 
                                                data-place="top"
                                                data-offset="{'left': 100}"
                                                tabIndex={1401+index*2+1}
                                              />
                                            }
                                          </div>
                                        }
                                      </div>
                                  }
                                  {
                                    (!visibleItem && data.isGovernmentPayments) && (
                                      <div className={`gp-singleline-header font-${fontSizeIndex}-smaller`}>
                                        <a 
                                          onClick={() => showList[data.id] === true ? this.hideItem(data.id) : this.showItem(data.id)} 
                                          tabIndex={1401+index*2}
                                          onKeyDown={(event) =>{ if (event.keyCode === 13) showList[data.id] === true ? this.hideItem(data.id) : this.showItem(data.id)} }
                                        >
                                          <img src={showList[data.id] === true ? ShownImg : HiddenImg } alt="show-hide" />
                                        </a>
                                        &ensp; 
                                        {
                                          isTotalGP && (
                                            <div className={`level-${data.level} nowrap-div`}>
                                              {`${data.header} (${data.unit_desc})`}
                                            </div>
                                          )
                                        }
                                        {
                                          !isTotalGP && (
                                            <div className={`level-0 nowrap-div`}>
                                              {`${data.header} (${data.unit_desc})`}
                                            </div>
                                          )
                                        }
                                        <div className="pin-continer">
                                        {
                                          data.isGovernmentPayments &&
                                          <img 
                                            src={HelpImg}
                                            className="help-img"
                                            alt="help-img" 
                                            data-tip={data.desc} 
                                            data-place="top"
                                            data-offset="{'left': 100}"
                                            tabIndex={1401+index*2+1}
                                          />
                                        }
                                        </div>
                                      </div>
                                    )
                                  }
                                  </td>
                                </tr>
                              )
                            }
                          }
                          
                          return null
                        })
                      }
                  </tbody>   
              </table>
            </div>
            <div className="col-width-7">
              <table className="table table-scroll">
                <thead style={{left: (-1)*(this.state.scrollLeft)}}>
                  <tr>
                    {
                      categories && (
                        categories.map((category, pos) => {
                          return (
                            <th scope="col" className="estimate-rse-th estimate-rse-td" key={`category-${pos}`}>
                              <div className={`estimate_rse center-heading font-${fontSizeIndex}-normal`}>{category}</div>
                            </th>
                          )
                        })
                      )
                    }
                  </tr>
                  <tr>
                    {
                      categories && (
                        categories.map((category, pos) => {
                          return (
                            <th className="estimate-rse-td" key={`est-th-${pos}`}>
                              <div className={`estimate_rse ${selectedShowIndex<0 ? 'estimate_rse_center':''}`} tabIndex={1500+incomeArr.length}>
                                <div className={`data-heading data-value font-${fontSizeIndex}-smaller`}>Estimate</div>
                                {
                                  selectedShowIndex === 0 && (
                                    <div className={`data-heading data-value font-${fontSizeIndex}-smaller`}>RSEᵃ</div>
                                  )
                                }
                                {
                                  selectedShowIndex === 1 && (
                                    <div className={`data-heading data-value font-${fontSizeIndex}-smaller`}>Median</div>
                                  )
                                }
                              </div>
                            </th>
                          )
                        })
                      )
                    }
                  </tr>
                </thead>
                <tbody onScroll={this.onScrollTable} ref={node=>this.tbody=node}>
                  {
                    incomeArr.map((data, index) => {
                      if (data !== undefined)                      
                      if (!data.id) {
                        if (data.count < 2) return null
                        return (
                          <tr key={`ltr-${index}`}>
                          {
                            categories && (
                              categories.map((category, pos) => {
                                return <td key={`ltr-td-${pos}`}>&nbsp;</td>
                              })
                            )
                          }
                          </tr>
                        )
                      } else return (
                        <tr key={`ltr-${index}`}>     
                            {
                              categories && (
                                categories.map((category, pos) => {
                                  return (
                                    <td className="estimate-rse-td nowrap-div" key={`est-td-${pos}`}>
                                      <div className={`estimate_rse ${selectedShowIndex<0 ? 'estimate_rse_center':''} ${data.isGovernmentPayments ? `font-${fontSizeIndex}-smaller`: ``}`}>
                                        <div className="data-value ">{incomeArr[index].estimateList[pos]}</div>
                                        {
                                          selectedShowIndex === 0 && (
                                            <div className="data-value">{incomeArr[index].rseList[pos]}</div>
                                          )
                                        }
                                        {
                                          selectedShowIndex === 1 && (
                                            <div className="data-value">{incomeArr[index].medianList[pos]}</div>
                                          )
                                        }
                                      </div>
                                    </td>
                                  )
                                })
                              )
                            }
                        </tr>
                      )
                      return null
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <ReactTooltip 
            place="top"
            type="info" 
            effect="float"
          />
        </div>
      )
  }
}

TableContainer.propTypes = {
  categories: PropTypes.array,
  surveyData: PropTypes.array,
  showList: PropTypes.object,
  hideItem: PropTypes.func,
  showItem: PropTypes.func,
  showAllItem: PropTypes.func,
  hideAllItem: PropTypes.func
};

export default TableContainer
