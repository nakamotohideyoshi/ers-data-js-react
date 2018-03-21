import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query20 (
    $report_num: [Int],
    $subject_num: [Int],
    $state_id: [String]
  ){
    query20: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $state_id
    ){
      year
      serie{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query20',
    name: 'query20',
  });