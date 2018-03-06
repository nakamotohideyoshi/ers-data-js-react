import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query InitialQuery {
    arms_year
    arms_state{
      id
      code
      name
    }
    arms_report(
      survey_abb: "finance"
    ){
      num
      header
    }
    arms_subject(
      survey_abb: "finance"
    ){
      num
      header
    }
    arms_serie(
      abb: ["farm", "grp", "sal", "ftypll", "age", "reg", "n5reg", "spec"]
    ){
      abb
      header
      element_dim {
        id
        name
        serie_abb
      }
    }    
  }
`, {
    name: 'initial',
  });