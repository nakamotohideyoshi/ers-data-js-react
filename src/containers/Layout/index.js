import React from 'react';
import { Grid } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import MainContainer from '../MainContainer';

export default class Layout extends React.Component {
  render() {
    return (
      <Grid>
        <Sidebar />
        <MainContainer />
      </Grid>
    )
  }
}
