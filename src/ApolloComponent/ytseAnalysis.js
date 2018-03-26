import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ytseAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int],
    $selectedYears: [Int],
    $selectedStates: [String],
    $serie: [String],
    $serie_element: [Int]
  ){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num,
      year: $selectedYears,
      state_id: $selectedStates,
      serie: $serie,
      serie_element: $serie_element     
    ){
      serie2{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'ytseAnalysis',
    name: 'ytseAnalysis',
  });