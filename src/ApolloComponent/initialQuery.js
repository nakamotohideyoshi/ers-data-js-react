import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query InitialQuery {
    initial: arms_filter(
      survey_abb: "finance"
    ){
      report {
        num
        header
      }
    }
    footnotes: arms_footnote
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
    name: 'initial',
  });