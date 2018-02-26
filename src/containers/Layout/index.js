import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';


class Layout extends React.Component {
  render() {
    if(this.props.data.arms_year) {
      return (
        <Grid>
          <Sidebar />
          <MainContainer years={this.props.data.arms_year} />
        </Grid>
      )
    } else {
      return(
        <p>Loading...</p>
      )
    }
    
  }
}

const years_list = gql`{ 
  arms_year
 }`;

export default graphql(years_list)(Layout);
