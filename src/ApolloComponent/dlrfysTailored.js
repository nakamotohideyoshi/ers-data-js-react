import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfysTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int],
    $selectedYears: [Int],
    $serie: [String]
  ){
    dlrfysTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      sub_report: $sub_report,
      subject_num: $subject_num,
      year: $selectedYears,
      serie: $serie
    ){
      state{
        id
        name
      }
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrfysTailored',
    name: 'dlrfysTailored',
  });