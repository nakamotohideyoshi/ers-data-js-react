import React from 'react';
import PropTypes from 'prop-types';

import OptionGroup from '../../components/OptionGroup'
import { numberWithCommas } from '../../helpers/NumberWithCommas'

import HelpImg from '../../images/help.png'
import PinHideImg from '../../images/unin_hide.png'
import PinShowImg from '../../images/unin_show.png'
import HideAllImg from '../../images/hide_all.png'
import HiddenImg from '../../images/hide.png'
import ShownImg from '../../images/show.png'
import LogoSmallImg from '../../images/logo-small.png'

import './style.css'

const indexingOptions = [
  { label: 'None', type: 'none'},
  { label: 'Percent', type: 'percent'},
  { label: 'Value', type: 'value'},
]

class TableContainer extends React.Component {
  state = {
    incomeArr: [],
    isShowItemAll: true,
    optionsIndex: 0
  }
  formatEstimateRse(element) {
    const asterix = element.unreliable_est === 0 ? '':'*'
    let estimateVal = 'NA'
    let rseVal = 'NA'
    if (element.estimate > 0) {
      estimateVal = element.estimate + asterix
      rseVal = element.rse
    }
    if (element.rse !== 0) {
      rseVal = element.rse
    }

    estimateVal = numberWithCommas(estimateVal)
    rseVal = rseVal === 'NA' ? rseVal : rseVal.toFixed(1)

    return { estimateVal, rseVal }
  }
  componentWillReceiveProps(props) {
    const { surveyData, categories, isYearsMultiple } = props
    let originData = surveyData
    let incomeArr = []

    if (originData) {
      originData.forEach((element, index) => {
        let singleIncome = {}
        let currentIndex = 0
        incomeArr.forEach((income, i) => {
          if (income.id === element.report_num + element.topic_abb) {
            singleIncome = income
            currentIndex = i
            return
          }
        })
        if (!singleIncome.id) {
          singleIncome.id = element.report_num + element.topic_abb
          singleIncome.header = element.topic_dim.header
          singleIncome.unit_desc = element.topic_dim.unit_desc
          singleIncome.level = element.topic_dim.level
          let estimateList = []
          let rseList = []
          categories.forEach(category => {
            const comparedCategory = isYearsMultiple ? element.year: element.state.name
            if (comparedCategory === category) {
              estimateList.push(this.formatEstimateRse(element).estimateVal)
              rseList.push(this.formatEstimateRse(element).rseVal)
            } else {
              estimateList.push('NA')
              rseList.push('NA')
            }
          })
          singleIncome.estimateList = estimateList
          singleIncome.rseList = rseList
          incomeArr.push(singleIncome)
        } else {
          categories.forEach((category, index) => {
            const comparedCategory = isYearsMultiple ? element.year: element.state.name
            if (comparedCategory === category) {
              singleIncome.estimateList[index] = this.formatEstimateRse(element).estimateVal
              singleIncome.rseList[index] = this.formatEstimateRse(element).rseVal
            } 
          })
          incomeArr[currentIndex] = singleIncome
        }
      })
    }
    console.log(incomeArr)
    this.setState({ incomeArr })
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
  switchIndexingOption(optionsIndex) {
    this.setState({ optionsIndex })
  }
  render() {
    const { incomeArr, isShowItemAll, optionsIndex } = this.state
    const { showList, categories, blockIndex } = this.props

    if (incomeArr.length === 0)
      return ( <div></div>)
    else
      return (
        <div>
          <div className="heading-option-container">
            <div className="indexing-option-container">
              <span className="source">
                <img src={HelpImg} alt="help" />
                <span className="indexing">CHART INDEXING OPTIONS:</span>
              </span>
              <OptionGroup options={indexingOptions} selectedIndex={optionsIndex} onSelect={(index) => this.switchIndexingOption(index)} />
            </div>
            <div className="logo-small-container">
				       <span className="source">
                <img src={LogoSmallImg} alt="logo" />
                <span>Source: Economic Research Services, US Dept of Agriculture</span>
               </span>
            </div>
          </div>
          <div className="table-container">
            <div className="col-width-4">
              <table className="table table-sm table-responsive">
                <thead>
                  <tr>
                    <th>
                      <div className="pin-container">
                      <div><img src={PinShowImg} alt="" /></div>
                      <div className="level-0">
                        pin
                      </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        {
                          isShowItemAll && 
                            <a onClick={() => this.hideAllItem()}><img src={ShownImg} alt="" /></a>
                        }
                        {
                          !isShowItemAll &&
                            <a onClick={() => this.showAllItem()}><img src={HideAllImg} alt="" /></a>
                        }
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PINNED SERIES</td>
                    <td></td>
                  </tr>
                  {
                    incomeArr.map((data, index) => {
                      return (
                        <tr key={`ltr-${index}`}>
                          <td>
                            <div className="pin-container">
                            <div>
                              <a onClick={this.hidePin}>
                                <img src={PinHideImg} alt="" />
                              </a>
                            </div>
                            {
                              blockIndex < 1 && (
                                <div className={`level-${data.level} nowrap-div`}>{data.header}</div>
                              )
                            } 
                            {
                              blockIndex > 0 &&
                                <div className="level-1 nowrap-div">{data.header}</div>
                            }
                            </div>
                          </td>
                          <td>
                            {
                              <div className="nowrap-div">
                                {
                                  showList && (
                                    <a onClick={() => showList[data.id] === true ? this.hideItem(data.id) : this.showItem(data.id)}>
                                      <img src={showList[data.id] === true ? ShownImg : HiddenImg } alt="show-hide" />
                                    </a>
                                  ) 
                                }
                                &ensp;&ensp;{data.unit_desc}
                              </div>
                            }
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="col-width-6">              
              <table className="table table-sm table-responsive">
                <thead>
                  <tr>
                    {
                      categories && (
                        categories.map((category, pos) => {
                          return <th scope="col" className="estimate-rse-th estimate-rse-td" key={`category-${pos}`}>{category}</th>
                        })
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {
                      categories && (
                        categories.map((category, pos) => {
                          return (
                            <td className="estimate-rse-td" key={`est-th-${pos}`}>
                              <div className='estimate_rse'>
                                <div className="data-heading data-value">ESTIMATE</div>
                                <div className="data-heading data-value">RSEᵃ</div>
                              </div>
                            </td>
                          )
                        })
                      )
                    }
                  </tr>
                  {
                    incomeArr.map((data, index) => {
                      return (
                        <tr key={`rtr-${index}`}>
                          {
                            categories && (
                              categories.map((category, pos) => {
                                return (
                                  <td className="estimate-rse-td nowrap-div" key={`est-td-${pos}`}>
                                    <div className='estimate_rse'>
                                      <div className="data-value">{data.estimateList[pos]}</div>
                                      <div className="data-value">{data.rseList[pos]}</div>
                                    </div>
                                  </td>
                                )
                              })
                            )
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
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
