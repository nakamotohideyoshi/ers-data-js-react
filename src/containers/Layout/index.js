import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
const filters = [
  [],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3],
  ['farm', 'grp', 'sal', 'stypll', 'age', 'reg', 'spec'],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  ['kount', 'atot', 'actot', 'acliv', 'accrop', 'acinpt', 'acgrow', 'acprpins', 'acothr', 'antot', 'aninvest', 'anreale', 'anopdw', 'anequip', 'anbreed', 'dtot', 'lctot', 'dshort', 'lcterm', 'lcint', 'lcpay', 'lntot', 'lnnreale', 'lnreale', 'netw'],
  ['kount', 'igcfi', 'iliv', 'icrop', 'igovt', 'iothfm', 'etot', 'evtot', 'evlvpur', 'evfeed', 'evloth', 'evseedp', 'evfertc', 'evutil', 'evlabor', 'evfuelo', 'evmainr', 'evcwork', 'evoth', 'eftot', 'eftaxes', 'efint', 'efins', 'efrent', 'incfi', 'endepr', 'enben', 'ivalinv', 'inmon', 'infi'],
  ['kount', 'frcrnum', 'frwcnum', 'frdanum', 'frroanum', 'frroenum', 'fropmnum', 'frdcnum', 'fratnum', 'froenum', 'freconum'],
  ['fmnum', 'vprodtot', 'tacres', 'acres', 'ten1', 'ten2', 'ten3', 'opoc1', 'opoc2', 'opoc3', 'oped1', 'oped2', 'oped3', 'oped4', 'ophr1', 'ophr2', 'ophr3', 'ophr4'],
  ['kount', 'kdebt', 'igcfi', 'infi', 'drinc', 'drintp', 'drdcm', 'drmaxpay', 'dtot', 'drmaxd75', 'drmaxd10', 'drcnum75', 'drcnum10'],
  ['kount1', 'acrestot', 'fsalest', 'acrest', 'fsales', 'igcfit', 'incfit', 'kountn1', 'acresnt', 'fsalesnt', 'acresn', 'fsalesn', 'igcfin', 'incfin', 'kountg1', 'acresgt', 'fsalesgt', 'acresg', 'fsalesg', 'igovtg1', 'igcfig', 'incfig', 'igovtg2', 'conspay1', 'landret1', 'workland1', 'commpay1', 'igovdp1', 'igovccp1', 'mlb1', 'otherpay1', 'igovtt', 'igovtt', 'gplt', 'gpot', 'conspayt', 'landrett', 'worklandt', 'commpayt', 'igovdpt', 'igovccpt', 'mlbt', 'otherpayt', 'v4b', 'conspay2', 'landret2', 'workland2', 'commpay2', 'igovdp2', 'igovccp2', 'mlb2', 'otherpay2', 'kntcnsv1', 'kntcnsv2', 'acrescnsv', 'fsalescnsv', 'conspay3', 'igovtcnsv1', 'igcficnsv', 'incficnsv', 'kntrlp1', 'kntrlp2', 'acresrlp', 'fsalesrlp', 'landret3', 'igovtrlp1', 'igcfirlp', 'incfirlp', 'kntwlp1', 'kntwlp2', 'acreswlp', 'fsaleswlp', 'workland3', 'igovtwlp1', 'igcfiwlp', 'incfiwlp', 'kntprg1', 'kntprg2', 'acresprg', 'fsalesprg', 'commpay3', 'igovtprg1', 'igcfiprg', 'incfiprg', 'kntdcp1', 'kntdcp2', 'acresdcp', 'fsalesdcp', 'dpccp3', 'igovtdcp1', 'igcfidcp', 'incfidcp', 'kntdp1', 'kntdp2', 'acresdp', 'fsalesdp', 'igovdp3', 'igovtdp1', 'igcfidp', 'incfidp', 'kntccp1', 'kntccp2', 'acresccp', 'fsalesccp', 'igovccp3', 'igovtccp1', 'igcficcp', 'incficcp', 'kntmlb1', 'kntmlb2', 'acresmlb', 'fsalesmlb', 'mlb3', 'igovtmlb1', 'igcfimlb', 'incfimlb', 'kntoth1', 'kntoth2', 'acresoth', 'fsalesoth', 'otherpay3', 'igovtoth1', 'igcfioth', 'incfioth'],
  ['kount', 'tothhi', 'farmhhi', 'totofi', 'fmhhtot', 'depcl2', 'depcl3', 'depcl4', 'depcl5', 'depcl1', 'depcl6'],
  ['kount', 'hhasset', 'fasst', 'nfasst', 'hhdebt', 'fdebt', 'nfdebt', 'hhnw', 'fnw', 'nfnw'],
  [0, 1, 2, 3],
  ['farm', 'grp', 'sal', 'stypll', 'age', 'reg', 'spec'],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  ['farm', 'grp', 'sal', 'stypll', 'age', 'reg', 'spec'],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
]

export default class Layout extends React.Component {
 
  componentWillMount() {

    const report_num = 1;
    const subject_num = 1;
    const series = 'farm';
    const series_element = 0
    const series2 = 'farm'
    const series_element2 = 0 
    const {years} = this.props
    this.setState({ report_num, subject_num, series, series_element, series2, series_element2, years })
    
  }
  onSelectFilter = (sidebarItemIndex, selectedIndex) => {
    let {report_num, subject_num, series, series_element, series2, series_element2} = this.state
    if (sidebarItemIndex === 0) {
      report_num = 1
      subject_num = 1
      series = 'farm'
      series_element = 0
      series2 = 'farms'
      series_element2 = 0
    } else if(sidebarItemIndex === 1 || sidebarItemIndex === 10) {
      report_num = filters[sidebarItemIndex][selectedIndex]
    } else if (sidebarItemIndex === 2 || sidebarItemIndex === 26){
      subject_num = filters[sidebarItemIndex][selectedIndex]
    } else if (sidebarItemIndex === 3 || sidebarItemIndex === 27) {
      series = filters[sidebarItemIndex][selectedIndex]
      series_element = 0
    } else if (sidebarItemIndex === 34) {
      series2 = filters[sidebarItemIndex][selectedIndex]
      series_element2 = 0
    } else if ((sidebarItemIndex >=4 && sidebarItemIndex <= 9) || (sidebarItemIndex >= 28 && sidebarItemIndex <= 33)){
      series_element = filters[sidebarItemIndex][selectedIndex]
    } else if (sidebarItemIndex >= 11 && sidebarItemIndex <= 17) {
      // report_num.push(filters[sidebarItemIndex][selectedIndex])
    } else if (sidebarItemIndex >= 35 && sidebarItemIndex <= 40) {
      series_element2 = filters[sidebarItemIndex][selectedIndex]
    }
    this.setState({report_num, subject_num, series, series_element, series2, series_element2})
    
  }
  render() {
    const { subject_num, series, report_num, years, series_element, series2, series_element2 } = this.state
    return (
      <Grid>
        <Sidebar
          onSelectFilter={this.onSelectFilter}
        />
        <MainContainer 
          years={years}
          report_num = {report_num}
          subject_num = {subject_num}
          series = {series}
          series_element = {series_element}
          series2 = {series2}
          series_element2 = {series_element2}         
        />
      </Grid>
    )
  }
}

