import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

  export default graphql(gql`
  query tAnalysis (
    $selectedStates: [String]
  ){
    arms_filter(
      survey_abb: "finance",
      state_id: $selectedStates
    ){
      year
    }     
  }
`, {
    skip: (ownProps) => ownProps.runQuery !== 'tAnalysis',
    name: 'tAnalysis',
  });