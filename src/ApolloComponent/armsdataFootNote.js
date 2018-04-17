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
  ) {
    datasource1: arms_footnote(
      report_num: $remport_num_1
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
      report_num: $remport_num_2
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
      report_num: $remport_num_3
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
      report_num: $remport_num_4
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
      report_num: $remport_num_5
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
      report_num: $remport_num_6
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
      report_num: $remport_num_7
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
      report_num: $remport_num_8
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


  