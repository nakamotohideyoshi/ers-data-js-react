import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
const filters = [
  [],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3],
  ['farm', 'grp', 'sal', 'stypll', 'age', 'reg', 'spec'],
  [0, 1],
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
    const {years} = this.props
    this.setState({ report_num, subject_num, series, series_element, years })
    
  }
  onSelectFilter = (sidebarItemIndex, selectedIndex) => {
    let {report_num, subject_num, series, series_element} = this.state
    if(sidebarItemIndex === 1) {
      report_num = filters[sidebarItemIndex][selectedIndex]
    } else if (sidebarItemIndex === 2){
      subject_num = filters[sidebarItemIndex][selectedIndex]
    } else if (sidebarItemIndex === 3) {
      series = filters[sidebarItemIndex][selectedIndex]
    } else {
      series_element = filters[sidebarItemIndex][selectedIndex]
    }
    this.setState({report_num, subject_num, series, series_element})
    
  }
  render() {
    const { subject_num, series, report_num, years, series_element } = this.state
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
        />
      </Grid>
    )
  }
}

