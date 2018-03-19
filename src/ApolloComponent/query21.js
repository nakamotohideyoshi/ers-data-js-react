import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query21 (
    $report_num: [Int],
    $subject_num: [Int],
    $state_id: [String],
    $year: [Int]
  ){
    query21: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $state_id,
      year: $year
    ){
      serie{
        abb
        header
      }
    }     
  }
`, {
    name: 'query21',
  });