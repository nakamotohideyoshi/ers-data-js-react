import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query yAnalysis (
    $selectedYears: [Int]
  ){
    yAnalysis: arms_filter(
      survey_abb: "finance",
      year: $selectedYears
    ){
      state{
        id
        name
      }
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'yAnalysis',
    name: 'yAnalysis',
  });