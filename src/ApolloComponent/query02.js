import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query02 (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_elemnt: [Int]
  ){
    query02: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie,
      serie_element: $serie_element
    ){
      year
      state {
        id
        name
      }
    }     
  }
`, {
    name: 'query02',
  });