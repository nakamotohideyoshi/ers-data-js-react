import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlrfsesAnalysis (
    $report_num: [Int],
    $topic_abb: [String],
    $sub_report: [Int],
    $subject_num: [Int],
    $serie: [String],
    $serie_element: [Int],
    $serie2: [String]
  ){
    dlrfsesAnalysis: arms_filter(
      report_num: $report_num,
      topic_abb: $topic_abb,
      sub_report: $sub_report,
      subject_num: $subject_num,
      serie: $serie,
      serie_element: $serie_element,
      serie2: $serie2
    ){
      serie2_element{
        id
        name
        desc
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlrfsesAnalysis',
    name: 'dlrfsesAnalysis',
  });