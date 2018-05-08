import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfyTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int],
    $selectedYears: [Int]
  ){
    dlrfyTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      sub_report: $sub_report,
      subject_num: $subject_num,
      year: $selectedYears
    ){
      state{
        id
        name
      }
      serie{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrfyTailored',
    name: 'dlrfyTailored',
  });