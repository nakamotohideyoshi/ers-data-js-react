import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dAnalysis (
    $report_num: [Int]
  ){
    dAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $report_num
    ){
      topic{
        abb
        header
      }
      subject{
        num
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dAnalysis',
    name: 'dAnalysis',
  });