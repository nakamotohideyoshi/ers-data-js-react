import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query14 (
    $report_num: [Int],
    $subject_num: [Int],
    $year: [Int]
    $serie: [String],
    $serie_elemnt: [Int]
  ){
    query14: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      year: $year,
      serie: $serie,
      serie_element: $serie_element
    ){
      state{
        id
        name
      }
    }     
  }
`, {
    name: 'query14',
  });