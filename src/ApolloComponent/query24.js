import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query24 (
    $report_num: [Int],
    $subject_num: [Int],
    $state_id: [String],
    $year: [Int],
    $serie: [String],
    $serie_element: [Int]
  ){
    query24: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $state_id,
      serie: $serie,
      serie_element: $serie_element
    ){
      year
    }     
  }
`, {
    name: 'query24',
  });