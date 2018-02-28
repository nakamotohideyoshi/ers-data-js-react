import React from 'react';
import PropTypes from 'prop-types';
import HelpImg from '../../images/help.png'
import './style.css'
const dataSet = {
  "data": {
    "arms_surveydata": [
      {
        "year": 2014,
        "rse": 0.1,
        "estimate": 2076273,
        "topic_abb": "kount",
        "topic_dim": {
          "level": 0,
          "seq": -1,
          "abb": "kount",
          "header": "Farms"
        }
      },
      {
        "year": 2015,
        "rse": 0.2,
        "estimate": 2059272,
        "topic_abb": "kount",
        "topic_dim": {
          "level": 0,
          "seq": -1,
          "abb": "kount",
          "header": "Farms"
        }
      },
      {
        "year": 2015,
        "rse": 3.7,
        "estimate": 166084,
        "topic_abb": "igcfi",
        "topic_dim": {
          "level": 1,
          "seq": 0,
          "abb": "igcfi",
          "header": "Gross cash income"
        }
      },
      {
        "year": 2014,
        "rse": 1.7,
        "estimate": 184214,
        "topic_abb": "igcfi",
        "topic_dim": {
          "level": 1,
          "seq": 0,
          "abb": "igcfi",
          "header": "Gross cash income"
        }
      },
      {
        "year": 2015,
        "rse": 6.5,
        "estimate": 56207,
        "topic_abb": "iliv",
        "topic_dim": {
          "level": 2,
          "seq": 1,
          "abb": "iliv",
          "header": "Livestock income"
        }
      },
      {
        "year": 2014,
        "rse": 4,
        "estimate": 65190,
        "topic_abb": "iliv",
        "topic_dim": {
          "level": 2,
          "seq": 1,
          "abb": "iliv",
          "header": "Livestock income"
        }
      },
      {
        "year": 2015,
        "rse": 2.9,
        "estimate": 82799,
        "topic_abb": "icrop",
        "topic_dim": {
          "level": 2,
          "seq": 2,
          "abb": "icrop",
          "header": "Crop sales"
        }
      },
      {
        "year": 2014,
        "rse": 1.7,
        "estimate": 89990,
        "topic_abb": "icrop",
        "topic_dim": {
          "level": 2,
          "seq": 2,
          "abb": "icrop",
          "header": "Crop sales"
        }
      },
      {
        "year": 2014,
        "rse": 3,
        "estimate": 3756,
        "topic_abb": "igovt",
        "topic_dim": {
          "level": 2,
          "seq": 3,
          "abb": "igovt",
          "header": "Government payments"
        }
      },
      {
        "year": 2015,
        "rse": 6.5,
        "estimate": 4165,
        "topic_abb": "igovt",
        "topic_dim": {
          "level": 2,
          "seq": 3,
          "abb": "igovt",
          "header": "Government payments"
        }
      },
      {
        "year": 2014,
        "rse": 4.1,
        "estimate": 25278,
        "topic_abb": "iothfm",
        "topic_dim": {
          "level": 2,
          "seq": 4,
          "abb": "iothfm",
          "header": "Other farm-related income"
        }
      },
      {
        "year": 2015,
        "rse": 4.9,
        "estimate": 22914,
        "topic_abb": "iothfm",
        "topic_dim": {
          "level": 2,
          "seq": 4,
          "abb": "iothfm",
          "header": "Other farm-related income"
        }
      },
      {
        "year": 2014,
        "rse": 1.7,
        "estimate": 133353,
        "topic_abb": "etot",
        "topic_dim": {
          "level": 1,
          "seq": 5,
          "abb": "etot",
          "header": "Total cash expenses"
        }
      },
      {
        "year": 2015,
        "rse": 3.2,
        "estimate": 121863,
        "topic_abb": "etot",
        "topic_dim": {
          "level": 1,
          "seq": 5,
          "abb": "etot",
          "header": "Total cash expenses"
        }
      },
      {
        "year": 2014,
        "rse": 2,
        "estimate": 107412,
        "topic_abb": "evtot",
        "topic_dim": {
          "level": 2,
          "seq": 6,
          "abb": "evtot",
          "header": "Variable expenses"
        }
      },
      {
        "year": 2015,
        "rse": 3.6,
        "estimate": 96854,
        "topic_abb": "evtot",
        "topic_dim": {
          "level": 2,
          "seq": 6,
          "abb": "evtot",
          "header": "Variable expenses"
        }
      },
      {
        "year": 2015,
        "rse": 23.4,
        "estimate": 8823,
        "topic_abb": "evlvpur",
        "topic_dim": {
          "level": 3,
          "seq": 7,
          "abb": "evlvpur",
          "header": "Livestock purchases"
        }
      },
      {
        "year": 2014,
        "rse": 7.5,
        "estimate": 9608,
        "topic_abb": "evlvpur",
        "topic_dim": {
          "level": 3,
          "seq": 7,
          "abb": "evlvpur",
          "header": "Livestock purchases"
        }
      },
      {
        "year": 2015,
        "rse": 6.5,
        "estimate": 14923,
        "topic_abb": "evfeed",
        "topic_dim": {
          "level": 3,
          "seq": 8,
          "abb": "evfeed",
          "header": "Feed"
        }
      },
      {
        "year": 2014,
        "rse": 4.7,
        "estimate": 17295,
        "topic_abb": "evfeed",
        "topic_dim": {
          "level": 3,
          "seq": 8,
          "abb": "evfeed",
          "header": "Feed"
        }
      },
      {
        "year": 2014,
        "rse": 0,
        "estimate": 0,
        "topic_abb": "evloth",
        "topic_dim": {
          "level": 3,
          "seq": 9,
          "abb": "evloth",
          "header": "Other livestock-related"
        }
      },
      {
        "year": 2015,
        "rse": 7.2,
        "estimate": 2323,
        "topic_abb": "evloth",
        "topic_dim": {
          "level": 3,
          "seq": 9,
          "abb": "evloth",
          "header": "Other livestock-related"
        }
      },
      {
        "year": 2014,
        "rse": 2.1,
        "estimate": 10413,
        "topic_abb": "evseedp",
        "topic_dim": {
          "level": 3,
          "seq": 10,
          "abb": "evseedp",
          "header": "Seed and plants"
        }
      },
      {
        "year": 2015,
        "rse": 2.9,
        "estimate": 10070,
        "topic_abb": "evseedp",
        "topic_dim": {
          "level": 3,
          "seq": 10,
          "abb": "evseedp",
          "header": "Seed and plants"
        }
      },
      {
        "year": 2014,
        "rse": 1.7,
        "estimate": 20638,
        "topic_abb": "evfertc",
        "topic_dim": {
          "level": 3,
          "seq": 10,
          "abb": "evseedp",
          "header": "Seed and plants"
        }
      },
      {
        "year": 2014,
        "rse": 1.7,
        "estimate": 20638,
        "topic_abb": "evfertc",
        "topic_dim": {
          "level": 3,
          "seq": 11,
          "abb": "evfertc",
          "header": "Fertilizer and chemicals"
        }
      },
      {
        "year": 2015,
        "rse": 2.8,
        "estimate": 19030,
        "topic_abb": "evfertc",
        "topic_dim": {
          "level": 3,
          "seq": 11,
          "abb": "evfertc",
          "header": "Fertilizer and chemicals"
        }
      },
      {
        "year": 2015,
        "rse": 3.1,
        "estimate": 4122,
        "topic_abb": "evutil",
        "topic_dim": {
          "level": 3,
          "seq": 12,
          "abb": "evutil",
          "header": "Utilities"
        }
      },
      {
        "year": 2014,
        "rse": 3.1,
        "estimate": 4347,
        "topic_abb": "evutil",
        "topic_dim": {
          "level": 3,
          "seq": 12,
          "abb": "evutil",
          "header": "Utilities"
        }
      },
      {
        "year": 2015,
        "rse": 4.7,
        "estimate": 15189,
        "topic_abb": "evlabor",
        "topic_dim": {
          "level": 3,
          "seq": 13,
          "abb": "evlabor",
          "header": "Labor"
        }
      },
      {
        "year": 2014,
        "rse": 3.2,
        "estimate": 16146,
        "topic_abb": "evlabor",
        "topic_dim": {
          "level": 3,
          "seq": 13,
          "abb": "evlabor",
          "header": "Labor"
        }
      },
      {
        "year": 2015,
        "rse": 2.2,
        "estimate": 6291,
        "topic_abb": "evfuelo",
        "topic_dim": {
          "level": 3,
          "seq": 14,
          "abb": "evfuelo",
          "header": "Fuels and oils"
        }
      },
      {
        "year": 2014,
        "rse": 1.5,
        "estimate": 8396,
        "topic_abb": "evfuelo",
        "topic_dim": {
          "level": 3,
          "seq": 14,
          "abb": "evfuelo",
          "header": "Fuels and oils"
        }
      },
      {
        "year": 2015,
        "rse": 5.8,
        "estimate": 8014,
        "topic_abb": "evmainr",
        "topic_dim": {
          "level": 3,
          "seq": 15,
          "abb": "evmainr",
          "header": "Repairs and maintenance"
        }
      }
    ]}
}
const years = ['2014', '2015']
let arms_surveydata = dataSet.data.arms_surveydata

class TableContainer extends React.PureComponent {
  // componentWillReceiveProps(props) {
  //   let arms_surveydata = dataSet.data.arms_surveydata
  //   // arms_surveydata.sort(function(a, b) {
  //   //   return a.year - b.year;
  //   // })
  //   console.log(arms_surveydata)
  // }
  constructor(props) {
    super(props)
       console.log(arms_surveydata)
      for (let i=0;i<arms_surveydata.length-1;i++)
      for (let j=i+1;j<arms_surveydata.length;j++) {
        const a = arms_surveydata[i]
        const b = arms_surveydata[j]
        if (a.topic_abb.level > b.topic_abb.level) {
          arms_surveydata[i] = b
          arms_surveydata[j] = a
        } else if (a.topic_abb.level === b.topic_abb.level) {
          if (a.topic_abb.seq > b.topic_abb.seq) {
            arms_surveydata[i] = b
            arms_surveydata[j] = a
          } 
        }
      }
      const interval = years.length
      let pos = 0
      while (pos<arms_surveydata.length) {
        for (let ii=pos;ii<pos+interval-1;ii++) 
        for (let jj=ii+1;jj<pos+interval;jj++) {
          const a = arms_surveydata[ii]
          const b = arms_surveydata[jj]
          if (a.year > b.year) {
            arms_surveydata[ii] = b
            arms_surveydata[jj] = a
          }
        }
          pos += interval
      }
    console.log(arms_surveydata)
  }
  render() {
    return (
    <div className="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-5 col-sm-3 col-xs-6 table-responsive-2 no-padding">  
          <table className="table table-sm table-responsive">
            <thead>
                <tr>
                  <th>pin</th>
                </tr>
            </thead>
            <tbody>
              <tr><td>PINNED SERIES</td></tr>
              {
                arms_surveydata.map((data, index) => {
                  const c = years.length 
                                 
                  if (index%c === 0)
                  return (
                  <tr>
                    <td>
                      <div>
                      {data.topic_dim.header}
                      </div>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>				
        <div class="col-md-7 col-sm-9 col-xs-6 no-padding">
          <table className="table table-sm table-responsive">
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
                arms_surveydata.map((data, index) => {
                  const c = years.length
                  if (index % c ===0) {
                    return (
                      <tr>
                        {
                          years.map((year, pos) => {
                            return (
                              <td>
                                <div className='estimate_rse'>
                                  <div>{dataSet.data.arms_surveydata[index+pos].estimate}</div>
                                  <div>{dataSet.data.arms_surveydata[index+pos].rse}</div>
                                </div>
                              </td>
                            )
                          })
                        }
                      </tr>
                    )
                  }
                  return null
                })
              }
              <tr>
              </tr>
              <tr>
              </tr>
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

export default TableContainer;
