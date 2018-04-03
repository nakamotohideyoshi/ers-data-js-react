import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ytsAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int],
    $selectedYears: [Int],
    $selectedStates: [String],
    $serie: [String]
  ){
    ytsAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num,
      year: $selectedYears,
      state_id: $selectedStates,
      serie: $serie      
    ){
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'ytsAnalysis',
    name: 'ytsAnalysis',
  });