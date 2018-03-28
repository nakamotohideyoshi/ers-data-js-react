import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ytDLFAnalysis (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedYears: [Int],
    $selectedStates: [String],
    $topic_abb: [String]
  ){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $selectedStates,
      topic_abb: $topic_abb,
      year: $selectedYears
    ){
      serie{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'ytDLFAnalysis',
    name: 'ytDLFAnalysis',
  });