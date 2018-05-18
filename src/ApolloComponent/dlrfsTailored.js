import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfsTailored (
    $report_num: [Int],
    $sub_report: [Int],
    $subject_num: [Int],
    $serie: [String]
  ){
    dlrfsTailored: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      sub_report: $sub_report,
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
    skip: (ownProps) => ownProps.runQuery !== 'dlrfsTailored',    
    name: 'dlrfsTailored',
  });