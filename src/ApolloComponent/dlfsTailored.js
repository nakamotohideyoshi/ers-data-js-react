import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfsTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String]
  ){
    dlfsTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie
    ){
      year
      state {
        id
        name
      }
    	serie_element{
        id
        name
        desc
      }
    }
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfsTailored',    
    name: 'dlfsTailored',
  });