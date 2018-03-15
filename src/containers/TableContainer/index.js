import React from 'react';
import PropTypes from 'prop-types';
import {CSVLink} from 'react-csv';
import { Button } from 'react-bootstrap';
import { numberWithCommas } from '../../helpers/NumberWithCommas'
import DownloadImg from '../../images/download.png'
import HelpImg from '../../images/help.png'
import PinHideImg from '../../images/unin_hide.png'
import PinShowImg from '../../images/unin_show.png'
import HideAllImg from '../../images/hide_all.png'
import HiddenImg from '../../images/hide.png'
import ShownImg from '../../images/show.png'
import './style.css'

class TableContainer extends React.Component {
  state = {
    incomeArr: [],
    isShowItemAll: true
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
  generateCSV() {
    const { incomeArr } = this.state
    const { categories } = this.props
    
    const data = [];
    const header = ['', '']
    if (categories) {
      categories.forEach( category => {
        header.push(category)
      })
    }
    data.push(header)
    incomeArr.forEach( element => {
      let estRow = [element.header, 'Estimate']
      let rseRow = ['', 'rse']
      estRow = estRow.concat(element.estimateList)
      rseRow = rseRow.concat(element.rseList)
      data.push(estRow)
      data.push(rseRow)
    })
    return data
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
  render() {
    const { incomeArr, isShowItemAll } = this.state
    const { showList, categories, selectedStateNames, isYearsMultiple, blockIndex } = this.props

    if (incomeArr.length === 0)
      return ( <div></div>)
    else
      return (
        <div>
          <div className="downloadbtn-container">
            <CSVLink data={this.generateCSV()}>
              <Button>
                <img src={DownloadImg} alt="" /> Download CSV
              </Button>
            </CSVLink>
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
                        isShowItemAll && (
                        <a onClick={() => this.hideAllItem()}><img src={ShownImg} alt="" /></a>
                        ) || (
                        <a onClick={() => this.showAllItem()}><img src={HideAllImg} alt="" /></a>
                        )
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
                                data.level === 1 && ( <div className="level-1 nowrap-div">{data.header}</div>) ||
                                data.level === 2 && ( <div className="level-2 nowrap-div">{data.header}</div>) ||
                                data.level === 3 && ( <div className="level-3 nowrap-div">{data.header}</div>) ||
                                data.level === 4 && ( <div className="level-4 nowrap-div">{data.header}</div>) ||
                                                    ( <div className="level-0 nowrap-div">{data.header}</div>)
                              ) || (
                                <div className="level-1 nowrap-div">{data.header}</div>
                              )
                            }
                            </div>
                          </td>
                          <td>
                            {
                              <div className="nowrap-div">
                                {
                                  showList && (
                                    showList[data.id] === 1 && (
                                      <a onClick={() => this.hideItem(data.id)}>
                                        <img src={ShownImg} alt="" />
                                      </a>
                                      ) || (
                                      <a onClick={() => this.showItem(data.id)}>
                                        <img src={HiddenImg} alt="" />
                                      </a>
                                      )
                                      ) || (
                                      <a onClick={() => this.showItem(data.id)}>
                                        <img src={HiddenImg} alt="" />
                                      </a>
                                  )
                                }
                                &ensp;&ensp;Dollar per farm
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
                                <div className="data-heading data-value">RSE</div>
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
