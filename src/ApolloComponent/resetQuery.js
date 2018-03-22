import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query resetQuery ($report_num: [Int], $subject_num: [Int]){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
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
      }
    }
     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'resetQuery',
    name: 'resetQuery',
  });