import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query setQuery (
    $report_num: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_elemnt: [Int],
    $selectedStates: [String]
  ){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie,
      serie_element: $serie_element,
      state_id: $selectedStates
    ){
      year
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'setQuery',
    name: 'setQuery',
  });