import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ytDLAnalysis (
    $report_num: [Int],
    $selectedYears: [Int],
    $selectedStates: [String],
    $topic_abb: [String]
  ){
    ytDLAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      state_id: $selectedStates,
      topic_abb: $topic_abb,
      year: $selectedYears
    ){
      subject{
        num
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'ytDLAnalysis',
    name: 'ytDLAnalysis',
  });