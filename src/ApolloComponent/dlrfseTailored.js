import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfseTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_element: [Int]
  ){
    dlrfseTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      sub_report: $sub_report,
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
  skip: (ownProps) => ownProps.runQuery !== 'dlrfseTailored',
    name: 'dlrfseTailored',
  });