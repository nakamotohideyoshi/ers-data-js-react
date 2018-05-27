import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ArmsData(
    $selectedYears: [Int],
    $selectedStates: [String],
    $report_num_1: [Int],
    $subject_num_1: [Int],
    $topic_abb_1: [String],
    $serie_1: [String],
    $serie_element_1: [Int],
    $serie2_1: [String],
    $serie2_element_1: [Int],
    $report_num_2: [Int],
    $subject_num_2: [Int],
    $topic_abb_2: [String],
    $serie_2: [String],
    $serie_element_2: [Int],
    $serie2_2: [String],
    $serie2_element_2: [Int],
    $report_num_3: [Int],
    $subject_num_3: [Int], 
    $topic_abb_3: [String],
    $serie_3: [String],
    $serie_element_3: [Int],
    $serie2_3: [String],
    $serie2_element_3: [Int],
    $report_num_4: [Int],
    $subject_num_4: [Int], 
    $topic_abb_4: [String],
    $serie_4: [String],
    $serie_element_4: [Int],
    $serie2_4: [String],
    $serie2_element_4: [Int],
    $report_num_5: [Int],
    $subject_num_5: [Int], 
    $topic_abb_5: [String]
    $serie_5: [String],
    $serie_element_5: [Int],
    $serie2_5: [String],
    $serie2_element_5: [Int],
    $report_num_6: [Int],
    $subject_num_6: [Int], 
    $topic_abb_6: [String],
    $serie_6: [String],
    $serie_element_6: [Int],
    $serie2_6: [String],
    $serie2_element_6: [Int],
    $report_num_7: [Int],
    $subject_num_7: [Int],
    $topic_abb_7: [String] 
    $serie_7: [String],
    $serie_element_7: [Int],
    $serie2_7: [String],
    $serie2_element_7: [Int],
    $report_num_8: [Int],
    $subject_num_8: [Int], 
    $topic_abb_8: [String]
    $serie_8: [String],
    $serie_element_8: [Int],
    $serie2_8: [String],
    $serie2_element_8: [Int],
  ) {
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
    dataSource5: arms_surveydata(
      year: $selectedYears,
      state_id: $selectedStates,
      report_num: $report_num_5,      
      subject_num: $subject_num_5,
      series: $serie_5,
      series_element: $serie_element_5,
      series2: $serie2_5,
      series2_element: $serie2_element_5,
      topic_abb: $topic_abb_5,
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
    skip: (ownProps) => !(ownProps.blockIndex !== 0 && !ownProps.isRemoveDataSource),
    name: 'armsData',
  });


  