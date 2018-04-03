import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ysQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedYears: [Int],
    $serie: [String]
  ){
    ysQuery: arms_filter(
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
    skip: (ownProps) => ownProps.runQuery !== 'ysQuery',
    name: 'ysQuery',
  });