import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ChartsQuery($selectedYears: [Int], $report_num_0: [Int], $subject_num_0: [Int], $serie_0: [String], $serie_element_0: [Int], $serie2_0: [String], $serie2_element_0: [Int], $selectedStates: [String], $topic_abb_0: [String]) {
    arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_0,      
      subject_num: $subject_num_0,
      series: $serie_0,
      series_element: $serie_element_0,
      series2: $serie2_0,
      series2_element: $serie2_element_0, 
      topic_abb: $topic_abb_0,
      order_by: "topic_dim.seq|asc"
    )
    {
      year
      rse
      median
      estimate
      unreliable_est
      report_num
      topic_abb
      report_dim{
        header
      }
      subject_dim{
        header
      }
      serie_dim {
        header
      }
      serie_element_dim{
        name
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
        desc
        unit_num
        unit_desc
      }      
    }    
  }
`, {
    skip: (ownProps) => !(ownProps.blockIndex === 0 && ownProps.isGetSurveyData),
    name: 'charts',
  });


  