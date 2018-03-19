import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ArmsFilterQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $year: [Int],
    $state_id: [String],
    $serie: [String]
  ){
    query12: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      year: $year,
      state_id: $state_id,
      serie: $serie
    ){
      serie_element{
        id
        name
      }
    }     
  }
`, {
    name: 'query12',
  });