import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlTailored ($report_num: [Int]){
    dlTailored: arms_filter(
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
    skip: (ownProps) => ownProps.runQuery !== 'dlTailored',
    name: 'dlTailored',
  });