import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfysTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedYears: [Int],
    $serie: [String]
  ){
    dlfysTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      year: $selectedYears,
      serie: $serie
    ){
      state{
        id
        name
      }
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfysTailored',
    name: 'dlfysTailored',
  });