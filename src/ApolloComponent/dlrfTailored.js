import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int]
  ){
    dlrfTailored: arms_filter(
      survey_abb: "finance"
      report_num: $report_num
      sub_report: $sub_report
      subject_num: $subject_num
    ){
      year
      state {
        id
        name
      }
    	serie{
        abb
        header
        desc
      }
    }
     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrfTailored',
    name: 'dlrfTailored',
  });