import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query reset1Query ($report_num: [Int]){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num
    ){
      subject{
        num
        header
      }
    }
     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'reset1Query',
    name: 'reset1Query',
  });