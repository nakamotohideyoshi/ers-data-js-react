import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource8($selectedYears: [Int], $report_num_8: [Int], $subject_num_8: [Int], $serie_8: [String], $serie_element_8: [Int], $serie2_8: [String], $serie2_element_8: [Int], $selectedStates: [String], $topic_abb_8: [String]) {
    dataSource8: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_8,      
      subject_num: $subject_num_8,
      series: $serie_8,
      series_element: $serie_element_8,
      series2: $serie2_8,
      series2_element: $serie2_element_8, 
      topic_abb: $topic_abb_8,
      order_by: "topic_dim.seq|asc"
    )
    {
      year
      state{
        id
        code
        name
      }
      rse
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
      serie2_dim{
        header
      }
      serie2_element_dim{
        name
      }      
      topic_dim {
        level
        seq
        abb
        header
        unit_num
        unit_desc
      }      
    }    
  }
`, {
    skip: (ownProps) => !(ownProps.blockIndex === 8 || ownProps.isAllDataSources),
    name: 'dataSource8',
  });


  