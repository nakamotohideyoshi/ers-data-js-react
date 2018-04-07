import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query sesetAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int],
    $selectedStates: [Int],
    $serie: [String],
    $serie_element: [Int],
    $serie2: [String],
    
  ){
    sesetAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num,
      state_id: $selectedStates,
      serie: $serie,
      serie_element: $serie_element,
      serie2: $serie2
    ){
      year
    }
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'sesetAnalysis',
    name: 'sesetAnalysis',
  });