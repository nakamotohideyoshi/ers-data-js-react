import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ArmsDataFootNote(
    $report_num_1: [Int]
    $report_num_2: [Int]
    $report_num_3: [Int]
    $report_num_4: [Int]
    $report_num_5: [Int]
    $report_num_6: [Int]
    $report_num_7: [Int]
    $report_num_8: [Int]
    $topic_abb_1: [String]
    $topic_abb_2: [String]
    $topic_abb_3: [String]
    $topic_abb_4: [String]
    $topic_abb_5: [String]
    $topic_abb_6: [String]
    $topic_abb_7: [String]
    $topic_abb_8: [String]
  ) {
    datasource1: arms_footnote(
      report_num: $report_num_1
      topic_abb: $topic_abb_1
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource2: arms_footnote(
      report_num: $report_num_2
      topic_abb: $topic_abb_2
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource3: arms_footnote(
      report_num: $report_num_3
      topic_abb: $topic_abb_3
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource4: arms_footnote(
      report_num: $report_num_4
      topic_abb: $topic_abb_4
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource5: arms_footnote(
      report_num: $report_num_5
      topic_abb: $topic_abb_5
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource6: arms_footnote(
      report_num: $report_num_6
      topic_abb: $topic_abb_6
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource7: arms_footnote(
      report_num: $report_num_7
      topic_abb: $topic_abb_7
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }
    datasource8: arms_footnote(
      report_num: $report_num_8
      topic_abb: $topic_abb_8
    )
    {
      survey_abb
      report_num
      topic_abb
      text
      sign
      is_global
      order     
    }    
  }
`, {
    skip: (ownProps) => !(ownProps.blockIndex !== 0 && ownProps.isGetSurveyData),
    name: 'armsdatafootnote',
  });


  