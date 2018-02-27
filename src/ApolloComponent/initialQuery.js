import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query InitialQuery {
    arms_year
  }
`, {
    name: 'initial',
  });