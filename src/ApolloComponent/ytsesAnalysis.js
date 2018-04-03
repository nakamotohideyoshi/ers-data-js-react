import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ytsesAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int],
    $selectedYears: [Int],
    $selectedStates: [String],
    $serie: [String],
    $serie_element: [Int],
    $serie2: [String]
  ){
    ytsesAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num,
      year: $selectedYears,
      state_id: $selectedStates,
      serie: $serie,
      serie_element: $serie_element,
      serie2: $serie2
    ){
      serie2_element{
        id
        name
      }
    }
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'ytsesAnalysis',
    name: 'ytsesAnalysis',
  });