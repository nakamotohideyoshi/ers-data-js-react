import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query InitialQuery {
    arms_year
  }
`, {
    name: 'initial',
  });

//   export default graphql(gql`
//   query InitialQuery {
//     arms_year
//     arms_report(
//       survey_abb: "finance"
//     ) {
//       num
//       header
//     }
//     arms_serie(
//       abb: ["farm", "grp", "sal", "ftypll", "age", "reg", "spec"]
//     ){
//       abb
//       header
//       seq
//       element_dim{
//         id
//         invalid
//         name
//         serie_abb
//       }
//     }
//     arms_subject (
//       survey_abb: "finance"
//     ){
//       num
//       header
//       invalid
//     }
//     arms_state{
//       id
//       code
//       name
//     }
//   }
// `, {
//     name: 'initial',
//   });