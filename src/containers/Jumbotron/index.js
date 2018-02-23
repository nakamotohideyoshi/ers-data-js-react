import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import './style.css';

const JumbotronContainer = ({ title }) => (
  <Jumbotron>
    <h1>{title}</h1>
  </Jumbotron>
);

JumbotronContainer.propTypes = {
  title: PropTypes.string,
};

JumbotronContainer.defaultProps = {
  title: '',
};

export default JumbotronContainer;
