import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfyTailored (
    $report_num: [Int],
    $subject_num: [Int],
    $selectedYears: [Int]
  ){
    dlfyTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      year: $selectedYears
    ){
      state{
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
    skip: (ownProps) => ownProps.runQuery !== 'dlfyTailored',
    name: 'dlfyTailored',
  });