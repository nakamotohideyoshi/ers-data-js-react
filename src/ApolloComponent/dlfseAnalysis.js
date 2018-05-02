import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfseAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int],
    $serie: [String],
    $serie_element: [Int]
  ){
    dlfseAnalysis: arms_filter(
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num,
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
    skip: (ownProps) => ownProps.runQuery !== 'dlfseAnalysis',
    name: 'dlfseAnalysis',
  });