import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ArmsFilterQuery ($report_num: [Int], $subject_num: [Int], $serie: [String], $serie2: [String]){
    arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie,
      serie2: $serie2
    ){
      serie_element {
        id
        name
      }
      serie2_element {
        id
        name
      }   
   }    
  }
`, {
    name: 'armsfilter',
  });