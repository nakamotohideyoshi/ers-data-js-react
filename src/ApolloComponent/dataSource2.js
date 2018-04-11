import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource2($selectedYears: [Int], $report_num_2: [Int], $subject_num_2: [Int], $serie_2: [String], $serie_element_2: [Int], $serie2_2: [String], $serie2_element_2: [Int], $selectedStates: [String], $topic_abb_2: [String]) {
    dataSource2: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_2,      
      subject_num: $subject_num_2,
      series: $serie_2,
      series_element: $serie_element_2,
      series2: $serie2_2,
      series2_element: $serie2_element_2, 
      topic_abb: $topic_abb_2,
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
    skip: (ownProps) => !(ownProps.blockIndex === 2 || ownProps.isAllDataSources),
    name: 'dataSource2',
  });


  