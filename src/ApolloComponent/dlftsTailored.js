import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlftsTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedStates: [String],
    $serie: [String]
  ){
    dlftsTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      state_id: $selectedStates,
      serie: $serie
    ){
      year
      serie_element{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlftsTailored',
    name: 'dlftsTailored',
  });