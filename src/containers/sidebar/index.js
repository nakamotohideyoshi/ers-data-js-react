import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Reset from '../../images/reset.png'
import './style.css';

const Sidebar = () => (
  <Col sm={3} md={3} xs={12} className="right-padding">
    <Row className="dropdown_up dropdown_dd">
      <button className="btn-dark btn_dd" type="button" >
        Tailored Reports
        <span className="caret_down">
          <i className="fa fa-caret-down"></i>
        </span>
      </button>
    </Row>
    <Row>
      <a className="pull-right reset">
        <img src={Reset} align="resetImg" />Reset
      </a>
    </Row>
    <Row className="dropdown_up dropdown_dd">
      <button className="btn-light btn_dd_1 collapsed">
        <span className="top_heading">report</span>
        <br />
        Farm Business Income Statement 
        <span className="caret_down_sec">
          <i className="fa fa-caret-down"></i>
        </span>
      </button>
    </Row>
    <Row className="dropdown_up dropdown_dd">
      <button className="btn-light btn_dd_1 collapsed">
        <span className="top_heading">subject</span>
        <br />
        All Farms
        <span className="caret_down_sec">
          <i className="fa fa-caret-down"></i>
        </span>
      </button>
    </Row>
    <Row className="dropdown_up dropdown_dd">
      <button className="btn-light btn_dd_1 collapsed">
        <span className="top_heading">filter by</span>
        <br />
        Operator Age
        <span className="caret_down_sec">
          <i className="fa fa-caret-down"></i>
        </span>
      </button>
    </Row>
    <Row className="dropdown_up dropdown_dd">
      <button className="btn-light btn_dd_1 collapsed">
        <span className="top_heading">objector age</span>
        <br />
        Objectors 34 years or younger
        <span className="caret_down_sec">
          <i className="fa fa-caret-down"></i>
        </span>
      </button>
    </Row>
  </Col>
);

export default Sidebar;
