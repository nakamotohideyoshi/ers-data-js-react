import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query22 (
    $report_num: [Int],
    $subject_num: [Int],
    $state_id: [String],
    $year: [Int],
    $serie: [String]
  ){
    query22: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $state_id,
      year: $year,
      serie: $serie
    ){
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query22',
    name: 'query22',
  });