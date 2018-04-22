import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource1($selectedYears: [Int], $report_num_1: [Int], $subject_num_1: [Int], $serie_1: [String], $serie_element_1: [Int], $serie2_1: [String], $serie2_element_1: [Int], $selectedStates: [String], $topic_abb_1: [String]) {
    dataSource1: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_1,      
      subject_num: $subject_num_1,
      series: $serie_1,
      series_element: $serie_element_1,
      series2: $serie2_1,
      series2_element: $serie2_element_1, 
      topic_abb: $topic_abb_1,
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
    skip: (ownProps) => !((ownProps.blockIndex === 1 || ownProps.isAllDataSources) && ownProps.isGetSurveyData),
    name: 'dataSource1',
  });


  