import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query TailorFootNoteQuery(
    $report_num_0: [Int]
  ) {
    tailorfootnote: arms_footnote(
      report_num: $remport_num_0
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
    skip: (ownProps) => !(ownProps.blockIndex === 0 && ownProps.isGetSurveyData),
    name: 'tailorfootnote',
  });


  