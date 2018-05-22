import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query TailorFootNote
   {
    tailorfootnote: arms_footnote
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
    skip: (ownProps) => !(ownProps.blockIndex === 0),
    name: 'tailorfootnote',
  });


  