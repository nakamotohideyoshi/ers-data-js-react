import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  query ChartsQuery($years: [Int]) {
    arms_surveydata(
      year: $years,
      subject_num: 1,
      series: "farm",
      series_element: 0,
      series2: "farm",
      series2_element: 0,
      report_num: [2],
      state_id: "00",
      topic_abb: ["igcfi", "etot", "evtot", "infi"]
    )
    {
      year
      rse
      estimate
      topic_abb
      topic_dim {
        level
        seq
        abb
        header
      }
      
    }
  }
`, {
    name: 'charts',
  });


  