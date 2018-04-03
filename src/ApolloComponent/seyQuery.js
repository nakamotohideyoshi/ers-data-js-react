import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query seyQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_element: [Int],
    $selectedYears: [Int]
  ){
    seyQuery: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie,
      serie_element: $serie_element,
      year: $selectedYears
    ){
      state {
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'seyQuery',
    name: 'seyQuery',
  });