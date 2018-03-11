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
      serie {
        abb
        header
        seq
      }
      serie2 {
        abb
        header
        seq
      } 
    }
    topic_1: arms_filter(
      survey_abb: "finance",
      report_num: 1
    ){
      topic {
        abb
        header
      }
    }
    topic_2: arms_filter(
      survey_abb: "finance",
      report_num: 2
    ){
      topic {
        abb
        header
      }
    }
    topic_3: arms_filter(
      survey_abb: "finance",
      report_num: 3
    ){
      topic {
        abb
        header
      }
    }
    topic_4: arms_filter(
      survey_abb: "finance",
      report_num: 4
    ){
      topic {
        abb
        header
      }
    }
    topic_5: arms_filter(
      survey_abb: "finance",
      report_num: 5
    ){
      topic {
        abb
        header
      }
    }
    topic_6: arms_filter(
      survey_abb: "finance",
      report_num: 6
    ){
      topic {
        abb
        header
      }
    }    
    topic_7: arms_filter(
      survey_abb: "finance",
      report_num: 7
    ){
      topic {
        abb
        header
      }
    }
    topic_8: arms_filter(
      survey_abb: "finance",
      report_num: 8
    ){
      topic {
        abb
        header
      }
    }

  }
`, {
    name: 'initial',
  });