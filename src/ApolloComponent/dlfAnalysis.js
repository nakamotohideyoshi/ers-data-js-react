import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $subject_num: [Int]
  ){
    dlfAnalysis: arms_filter(
      report_num: $report_num,
      topic_abb: $topic_abb,
      subject_num: $subject_num
    ){
      serie{
        abb
        header
        desc
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfAnalysis',
    name: 'dlfAnalysis',
  });