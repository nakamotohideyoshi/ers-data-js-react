import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query04 (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_elemnt: [Int],
    $state_id: [String]
  ){
    query04: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie,
      serie_element: $serie_element,
      state_id: $state_id
    ){
      year
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query04',
    name: 'query04',
  });