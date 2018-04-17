import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource3($selectedYears: [Int], $report_num_3: [Int], $subject_num_3: [Int], $serie_3: [String], $serie_element_3: [Int], $serie2_3: [String], $serie2_element_3: [Int], $selectedStates: [String], $topic_abb_3: [String]) {
    dataSource3: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_3,      
      subject_num: $subject_num_3,
      series: $serie_3,
      series_element: $serie_element_3,
      series2: $serie2_3,
      series2_element: $serie2_element_3, 
      topic_abb: $topic_abb_3,
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
    skip: (ownProps) => !((ownProps.blockIndex === 3 || ownProps.isAllDataSources) && ownProps.isGetSurveyData),
    name: 'dataSource3',
  });


  