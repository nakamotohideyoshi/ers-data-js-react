import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $sub_report: [Int],
    $subject_num: [Int]
  ){
    dlrfAnalysis: arms_filter(
      report_num: $report_num,
      topic_abb: $topic_abb,
      sub_report: $sub_report,
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
    skip: (ownProps) => ownProps.runQuery !== 'dlrfAnalysis',
    name: 'dlrfAnalysis',
  });