import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrftTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedStates: [String]
  ){
    dlrftTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $selectedStates
    ){
      year
      serie{
        abb
        header
        desc
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrftTailored',
    name: 'dlrftTailored',
  });