import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource4($selectedYears: [Int], $report_num_4: [Int], $subject_num_4: [Int], $serie_4: [String], $serie_element_4: [Int], $serie2_4: [String], $serie2_element_4: [Int], $selectedStates: [String], $topic_abb_4: [String]) {
    dataSource4: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_4,      
      subject_num: $subject_num_4,
      series: $serie_4,
      series_element: $serie_element_4,
      series2: $serie2_4,
      series2_element: $serie2_element_4, 
      topic_abb: $topic_abb_4,
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
    skip: (ownProps) => !(ownProps.blockIndex === 4 || ownProps.isAllDataSources),
    name: 'dataSource4',
  });


  