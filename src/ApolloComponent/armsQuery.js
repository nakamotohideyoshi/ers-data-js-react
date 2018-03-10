import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query ArmsFilterQuery ($report_num: [Int], $subject_num: [Int], $serie: [String], $serie_element: [Int], $serie2: [String]){
    report: arms_filter(
      survey_abb: "finance",
      report_num: $report_num,
      subject_num: $subject_num,
      serie: $serie
    ){
      serie_element {
        id
        name
      }
      serie2 {
        abb
        header
      }
      serie2_element {
        id
        name
      }   
   }
   arms_filter2: arms_filter (
    survey_abb: "finance",
    report_num: $report_num,
    subject_num: $subject_num,
    serie: $serie,
    serie_element: $serie_element
   ) {
    serie2 {
      abb
      header
    }
    serie2_element {
      id
      name
    }
   }
   arms_subfilter2: arms_filter (
    survey_abb: "finance",
    report_num: $report_num,
    subject_num: $subject_num,
    serie: $serie,
    serie_element: $serie_element,
    serie2: $serie2
   ){
    serie2_element{
      id
      name
    }
   }   
  }
`, {
    name: 'armsfilter',
  });