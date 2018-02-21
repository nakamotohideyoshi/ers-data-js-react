import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import HeaderNavigation from '../navbar';
import JumbotronContainer from '../jumbotron';
import Sidebar from '../sidebar';

export default class Layout extends React.Component {
  render() {
    return (
      <Grid>
        <HeaderNavigation />
        <JumbotronContainer title="ARMS Farm Structure and Finance" />
        <Sidebar />
      </Grid>
    )
  }
}
