import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query01 (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String]
  ){
    query01: arms_filter(
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
      }
    }
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query01',    
    name: 'query01',
  });