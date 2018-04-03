import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query tysQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedStates: [String],
    $selectedYears: [Int],
    $serie: [String]
  ){
    tysQuery: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $selectedStates,
      year: $selectedYears,
      serie: $serie
    ){
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'tysQuery',
    name: 'tysQuery',
  });