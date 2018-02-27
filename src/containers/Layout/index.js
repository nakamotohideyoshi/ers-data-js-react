import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';
const filters = [
  [],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3],
  ['farm', 'grp', 'sal', 'stypll', 'age', 'reg', 'spec'],
  []
]

export default class Layout extends React.Component {
 
  componentWillMount() {
    const subject_num = [1];
    const series = ['farm'];
    const report_num = [2];
    const selected_years = [];
    const {years} = this.props
    this.setState({ subject_num, series, report_num, selected_years, years })
    
  }
  onSelectYear1 = (selectedyears) => {
    let {selected_years} = this.state
    selected_years = selectedyears    
    this.setState({ selected_years })
  }
  render() {
    const { subject_num, series, report_num, selected_years, years} = this.state
    console.log(this.state)    
    return (
      <Grid>
        <Sidebar
        />
        <MainContainer 
          years={years}
          subjectnum = {subject_num}
          series1 = {series}
          reportnum = {report_num}
          selectedyears = {selected_years}
          onSelectYear1 = {this.onSelectYear1}
        />
      </Grid>
    )
  }
}

