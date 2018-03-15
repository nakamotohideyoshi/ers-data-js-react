import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ChartsQuery($selectedYears: [Int], $report_num: [Int], $subject_num: [Int], $serie: [String], $serie_element: [Int], $serie2: [String], $serie2_element: [Int], $selectedStates: [String], $topic_abb: [String]) {
    arms_surveydata(
      year: $selectedYears,
      report_num: $report_num,      
      subject_num: $subject_num,
      series: $serie,
      series_element: $serie_element,
      series2: $serie2,
      series2_element: $serie2_element,   
      state_id: $selectedStates,
      topic_abb: $topic_abb,
      order_by: "topic_dim.seq|asc"
    )
    {
      year
      rse
      estimate
      unreliable_est
      report_num
      topic_abb
      report_dim{
        header
      }
      state{
        id
        code
        name
      }
      topic_dim {
        level
        seq
        abb
        header
      }
      unit_dim{
        num
        desc
      }      
    }    
  }
`, {
    name: 'charts',
  });


  