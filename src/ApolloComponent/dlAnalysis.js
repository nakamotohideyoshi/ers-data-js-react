import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlAnalysis (
    $report_num: [Int],
    $topic_abb: [String]
  ){
    dlAnalysis: arms_filter(
      survey_abb: "finance"
      report_num: $report_num
      topic_abb: $topic_abb
    ){
    	subject {
        num
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlAnalysis',
    name: 'dlAnalysis',
  });