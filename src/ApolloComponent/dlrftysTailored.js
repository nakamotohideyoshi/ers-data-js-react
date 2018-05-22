import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrftysTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int],
    $selectedStates: [String],
    $selectedYears: [Int],
    $serie: [String]
  ){
    dlrftysTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      sub_report: $sub_report,
      subject_num: $subject_num,
      state_id: $selectedStates,
      year: $selectedYears,
      serie: $serie
    ){
      serie_element{
        id
        name
        desc
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrftysTailored',
    name: 'dlrftysTailored',
  });