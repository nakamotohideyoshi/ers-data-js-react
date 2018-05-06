import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrftsTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int],
    $selectedStates: [String],
    $serie: [String]
  ){
    dlrftsTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      sub_report: $sub_report,
      subject_num: $subject_num,
      state_id: $selectedStates,
      serie: $serie
    ){
      year
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrftsTailored',
    name: 'dlrftsTailored',
  });