import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query Query13 (
    $report_num: [Int],
    $subject_num: [Int],
    $year: [Int],
    $serie: [String]
  ){
    query13: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      yaer: $year,
      serie: $serie
    ){
      state{
        id
        name
      }
      serie_element{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query13',
    name: 'query13',
  });