import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query dlfseseyAnalysis (
    $arms_report_num: [Int],
    $arms_topic_abb: [String],
    $arms_subject_num: [Int],
    $arms_serie: [String],
    $arms_serie_element: [Int],
    $arms_serie2: [String],
    $arms_serie2_element: [Int]
  ){
    dlfseseyAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $arms_report_num,
      topic_abb: $arms_topic_abb,
      subject_num: $arms_subject_num,
      serie: $arms_serie,
      serie_element: $arms_serie_element,
      serie2: $arms_serie2,
      serie2_element: $arms_serie2_element
    ){
      year
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfseseyAnalysis',
    name: 'dlfseseyAnalysis',
  });