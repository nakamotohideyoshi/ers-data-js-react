import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrTailored (
    $report_num: [Int],
    $sub_report: [Int]
  ){
    dlrTailored: arms_filter(
      survey_abb: "finance"
      report_num: $report_num
      sub_report: $sub_report
    ){
    	subject {
        num
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrTailored',
    name: 'dlrTailored',
  });