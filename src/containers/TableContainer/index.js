import React from 'react';
import PropTypes from 'prop-types';
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
    const { years, surveyData } = props
    const interval = years.length
    let originData = surveyData
    if (originData) {
      let pos = 0
      const c = years.length
      let incomeArr = []
      if (originData) {
        originData.forEach((element, index) => {
          let singleIncome = {}
          let currentIndex = 0
          incomeArr.forEach((income, i) => {
            if (income.id === element.topic_abb) {
              singleIncome = income
              currentIndex = i
              return
            }
          })
          if (!singleIncome.id) {
            singleIncome.id = element.topic_abb
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
      this.setState({ incomeArr })
    }
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
    const { showList, years } = this.props
    return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-5 col-sm-3 col-xs-6 table-responsive-2 no-padding">
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
              <tr><td>PINNED SERIES</td></tr>
              {

                incomeArr.map((data, index) => {
                  const c = years.length
                  return (
                    <tr>
                      <td>
                        <div className="pin-container">
                        <div>
                          <a onClick={this.hidePin}>
                            <img src={PinHideImg} alt="" />
                          </a>
                        </div>
                        {
                          data.level === 1 && ( <div className="level-1">{data.header}</div>) ||
                          data.level === 2 && ( <div className="level-2">{data.header}</div>) ||
                          data.level === 3 && ( <div className="level-3">{data.header}</div>) ||
                          data.level === 4 && ( <div className="level-4">{data.header}</div>) ||
                                              ( <div className="level-0">{data.header}</div>)
                        }
                        </div>
                      </td>
                      <td>
                        {
                          <div>
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
        <div class="col-md-7 col-sm-9 col-xs-6 no-padding">
          <table className="table table-sm table-responsive table-estimate-rse">
            <thead>
              <tr>
                {
                  years.map( year => {
                    return <th scope="col">{year}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  years.map( year => {
                    return (
                      <td>
                        <div className='estimate_rse'>
                          <div className="data-heading">ESTIMATE</div>
                          <div className="data-heading">RSE</div>
                        </div>
                      </td>
                    )
                  })
                }
              </tr>
              {
                incomeArr.map((data, index) => {
                  const c = years.length
                  return (
                    <tr>
                      {
                        years.map((year, pos) => {
                          return (
                            <td>
                              <div className='estimate_rse'>
                                <div>{data.estimateList[pos]}</div>
                                <div>{data.rseList[pos]}</div>
                              </div>
                            </td>
                          )
                        })
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
    )
  }
}

TableContainer.propTypes = {
};

TableContainer.defaultProps = {
};

export default TableContainer
