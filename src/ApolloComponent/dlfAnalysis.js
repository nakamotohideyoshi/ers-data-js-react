import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query dlfAnalysis (
    $analysis.report_num: [Int],
    $analysis.topic_abb: [String],
    $analysis.subject_num: [Int]
  ){
    dlfAnalysis: arms_filter(
      survey_abb: "finance",
      report_num: $analysis.report_num,
      topic_abb: $analysis.topic_abb,
      subject_num: $analysis.subject_num
    ){
      serie{
        abb
        header
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'dlfAnalysis',
    name: 'dlfAnalysis',
  });