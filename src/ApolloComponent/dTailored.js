import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dTailored ($report_num: [Int]){
    dTailored: arms_filter(
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
      sub_report {
        id
        name
        report_num
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dTailored',
    name: 'dTailored',
  });