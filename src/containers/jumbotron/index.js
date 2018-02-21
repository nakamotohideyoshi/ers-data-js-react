import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const JumbotronContainer = styled.div`
  padding: 0px;
  background:#333333;
  border-radius: 0px;
  margin-bottom: 0px;
  h1 {
    font-size: 30px;
    color:#fff;
    font-family: 'Roboto', sans-serif;
    font-weight:300;
    margin:0px 0px;
    padding:40px 0px 35px 15px;
  }
`;

const Jumbotron = ({ title }) => (
  <JumbotronContainer>
    <h1>{title}</h1>
  </JumbotronContainer>
);

Jumbotron.propTypes = {
  title: PropTypes.string,
};

Jumbotron.defaultProps = {
  title: '',
};

export default Jumbotron;
