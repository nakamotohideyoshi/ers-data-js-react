import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource6($selectedYears: [Int], $report_num_6: [Int], $subject_num_6: [Int], $serie_6: [String], $serie_element_6: [Int], $serie2_6: [String], $serie2_element_6: [Int], $selectedStates: [String], $topic_abb_6: [String]) {
    dataSource6: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_6,      
      subject_num: $subject_num_6,
      series: $serie_6,
      series_element: $serie_element_6,
      series2: $serie2_6,
      series2_element: $serie2_element_6, 
      topic_abb: $topic_abb_6,
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
    skip: (ownProps) => !(ownProps.blockIndex === 6 || ownProps.isAllDataSources),
    name: 'dataSource6',
  });


  