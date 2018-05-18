import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfTailored ($report_num: [Int], $subject_num: [Int]){
    dlfTailored: arms_filter(
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
        desc
      }
    }
     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfTailored',
    name: 'dlfTailored',
  });