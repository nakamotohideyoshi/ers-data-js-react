import React from 'react';
import { Col } from 'react-bootstrap';
import DownloadButton from '../../components/DownloadButton';
import SheetDataChart from '../../components/SheetDataChart';
import FilterDropdown from '../../components/FilterDropdown';
import Footnote from '../Footnote';
import './style.css';

const years = ['2007', '2008', '2009', '2010', '2011', '2012', '2013',  
               '2014', '2015', '2016', '2017', '2018', '2019', '2020']

export default class MainContainer extends React.Component {
  componentWillMount() {
    let yearsInfo = []
    years.forEach(yearNumber => {
      const infoObj = {}
      infoObj.year = yearNumber
      infoObj.checked = false
      infoObj.grossCashIncome = Math.floor((Math.random() * 250) + 1);
      infoObj.totalCashExpense = Math.floor((Math.random() * 250) + 1);
      infoObj.variableExpense = Math.floor((Math.random() * 250) + 1);
      infoObj.netFarmIncome = Math.floor((Math.random() * 250) + 1);
      yearsInfo.push(infoObj)
    });
    this.setState({ yearsInfo })
  }
  onSelectYear = (index) => {
    let { yearsInfo } = this.state
    yearsInfo[index].checked = !yearsInfo[index].checked
    this.setState({ yearsInfo })
  }
  render() {
    const { yearsInfo } = this.state
    return (
      <Col xs={12} md={9} sm={3}>
        <h4 className="main-heading">Farm Business Balance Sheet Data 
          <DownloadButton />
        </h4>
        <FilterDropdown 
          yearsInfo={yearsInfo} 
          onSelectYear={this.onSelectYear} 
        />
        <SheetDataChart yearsInfo={yearsInfo} />
        <Footnote />
      </Col>
    )
  }
}
