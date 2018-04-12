import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query reset1Query ($report_num: [Int]){
    reset1Query: arms_filter(
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
    skip: (ownProps) => ownProps.runQuery !== 'reset1Query',
    name: 'reset1Query',
  });