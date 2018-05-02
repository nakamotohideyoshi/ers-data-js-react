import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query DataSource7($selectedYears: [Int], $report_num_7: [Int], $subject_num_7: [Int], $serie_7: [String], $serie_element_7: [Int], $serie2_7: [String], $serie2_element_7: [Int], $selectedStates: [String], $topic_abb_7: [String]) {
    dataSource7: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_7,      
      subject_num: $subject_num_7,
      series: $serie_7,
      series_element: $serie_element_7,
      series2: $serie2_7,
      series2_element: $serie2_element_7, 
      topic_abb: $topic_abb_7,
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
        desc
        unit_num
        unit_desc
      }      
    }    
  }
`, {
    skip: (ownProps) => !((ownProps.blockIndex === 7 || ownProps.isAllDataSources) && ownProps.isGetSurveyData),
    name: 'dataSource7',
  });


  