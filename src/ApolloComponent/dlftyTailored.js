import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlftyTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedStates: [String],
    $selectedYears: [Int]
  ){
    dlftyTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $selectedStates,
      year: $selectedYears
    ){
      serie{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlftyTailored',
    name: 'dlftyTailored',
  });