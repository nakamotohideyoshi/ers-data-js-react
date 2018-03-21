import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query23 (
    $report_num: [Int],
    $subject_num: [Int],
    $state_id: [String],
    $serie: [String]
  ){
    query23: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $state_id,
      serie: $serie
    ){
      year
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query23',
    name: 'query23',
  });