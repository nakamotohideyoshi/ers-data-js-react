import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query InitialQuery {
    arms_filter(
      survey_abb: "finance"
    ){
      year
      state {
        id
        name
      }
      report {
        num
        header
      }
      subject {
        num
        header
      }
      topic {
        abb
        header
        seq
      }
      serie {
        abb
        header
        seq
      }
      serie_element {
        id
        name
      }
      serie2 {
        abb
        header
        seq
      }
      serie2_element {
        id
        name
      }   
   }    
  }
`, {
    name: 'initial',
  });