import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query10 (
    $report_num: [Int],
    $subject_num: [Int],
    $year: [Int]
  ){
    query10: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      year: $year
    ){
      state{
        id
        name
      }
      serie{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query10',
    name: 'query10',
  });