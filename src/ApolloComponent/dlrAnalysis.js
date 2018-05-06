import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $sub_report: [Int]
  ){
    dlrAnalysis: arms_filter(
      survey_abb: "finance"
      report_num: $report_num
      topic_abb: $topic_abb
      sub_report: $sub_report
    ){
    	subject {
        num
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrAnalysis',
    name: 'dlrAnalysis',
  });