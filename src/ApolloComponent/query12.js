import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ArmsFilterQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedYears: [Int],
    $selectedStates: [String],
    $serie: [String]
  ){
    query12: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      year: $selectedYears,
      state_id: $selectedStates,
      serie: $serie
    ){
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'query12',
    name: 'query12',
  });