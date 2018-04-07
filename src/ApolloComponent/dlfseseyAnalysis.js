import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfseseyAnalysis (
    $analysis.report_num: [Int],
    $analysis.topic_abb: [String],
    $analysis.subject_num: [Int],
    $analysis.serie: [String],
    $analysis.serie_element: [Int],
    $analysis.serie2: [String],
    $analsysis.serie2_element: [Int]
  ){
    dlfseseyAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $analysis.report_num,
      topic_abb: $analysis.topic_abb,
      subject_num: $analysis.subject_num,
      serie: $analysis.serie,
      serie_element: $analysis.serie_element,
      serie2: $analsysis.serie2,
      serie2_element: $analysis.serie2_element
    ){
      year
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfseseyAnalysis',
    name: 'dlfseseyAnalysis',
  });