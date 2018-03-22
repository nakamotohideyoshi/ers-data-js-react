import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ysQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedYears: [Int],
    $serie: [String]
  ){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      yaer: $selectedYears,
      serie: $serie
    ){
      state{
        id
        name
      }
      serie_element{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'ysQuery',
    name: 'ysQuery',
  });