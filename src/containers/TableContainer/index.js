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
  componentWillReceiveProps(props) {
    const { surveyData } = props
    let originData = surveyData
    let incomeArr = []
    if (originData) {
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
            singleIncome.id = element.report_num+element.topic_abb
            singleIncome.header = element.topic_dim.header
            singleIncome.level = element.topic_dim.level
            singleIncome.estimateList = [element.estimate]
            singleIncome.rseList = [element.rse]
            incomeArr.push(singleIncome)
          } else {
            singleIncome.estimateList.push(element.estimate)
            singleIncome.rseList.push(element.rse)
            incomeArr[currentIndex] = singleIncome
          }
        })
      }
    }
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
    const { showList, categories } = this.props

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
                              data.level === 1 && ( <div className="level-1 nowrap-div">{data.header}</div>) ||
                              data.level === 2 && ( <div className="level-2 nowrap-div">{data.header}</div>) ||
                              data.level === 3 && ( <div className="level-3 nowrap-div">{data.header}</div>) ||
                              data.level === 4 && ( <div className="level-4 nowrap-div">{data.header}</div>) ||
                                                  ( <div className="level-0 nowrap-div">{data.header}</div>)
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
                                      <div className="data-value">{numberWithCommas(data.estimateList[pos])}</div>
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
