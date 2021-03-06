import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfseyTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_element: [Int],
    $selectedYears: [Int]
  ){
    dlfseyTailored: arms_filter(
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
    skip: (ownProps) => ownProps.runQuery !== 'dlfseyTailored',
    name: 'dlfseyTailored',
  });