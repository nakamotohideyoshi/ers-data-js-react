import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ChartsQuery($years: [Int], $report_num: [Int], $subject_num: [Int], $series: [String], $series_element: [Int]) {
    arms_surveydata(
      year: $years,
      report_num: $report_num,      
      subject_num: $subject_num,
      series: $series,
      series_element: $series_element,
      series2: "farm",
      series2_element: 0,      
      state_id: "00",
      order_by: "topic_dim.seq|asc"
    )
    {
      year
      rse
      estimate
      topic_abb
      topic_dim {
        level
        seq
        abb
        header
      }      
    }    
  }
`, {
    name: 'charts',
  });


  