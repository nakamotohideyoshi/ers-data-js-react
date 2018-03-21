import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ArmsFilterQuery ($report_num: [Int], $subject_num: [Int]){
    query00: arms_filter(
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
    skip: (ownProps) => ownProps.runQuery !== 'query00',
    name: 'query00',
  });