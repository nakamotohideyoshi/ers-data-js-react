import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import HeaderNavigation from '../navbar';
import JumbotronContainer from '../jumbotron';

export default class Layout extends React.Component {
  render() {
    return (
      <Grid>
        <HeaderNavigation />
        <JumbotronContainer title="ARMS Farm Structure and Finance" />
      </Grid>
    )
  }
}
