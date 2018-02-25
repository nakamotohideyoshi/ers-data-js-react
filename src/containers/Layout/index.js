import React from 'react';
import { Grid } from 'react-bootstrap';
import HeaderNavigation from '../Navbar';
import JumbotronContainer from '../Jumbotron';
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
