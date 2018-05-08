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
  }
`, {
    name: 'initial',
  });