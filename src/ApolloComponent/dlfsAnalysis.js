import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfsAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int],
    $serie: [String],
  ){
    dlfsAnalysis: arms_filter(
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num,
      serie: $serie
    ){
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfsAnalysis',
    name: 'dlfsAnalysis',
  });