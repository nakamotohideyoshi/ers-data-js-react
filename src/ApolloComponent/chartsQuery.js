import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ChartsQuery($year: [Int], $report_num: [Int], $subject_num: [Int], $serie: [String], $serie_element: [Int], $serie2: [String], $serie2_element: [Int], $stats: [String], $topic_abb: [String]) {
    arms_surveydata(
      year: $year,
      report_num: $report_num,      
      subject_num: $subject_num,
      series: $serie,
      series_element: $serie_element,
      series2: $serie2,
      series2_element: $serie2_element,   
      state_id: $stats,
      topic_abb: $topic_abb,
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


  