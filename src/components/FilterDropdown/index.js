import React from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownButton } from 'react-bootstrap';
import Checkbox from '../Checkbox';
import './style.css';

const FilterDropdown = ({ onSelectYear, yearsInfo }) => (
  <div className="filterDropdownContainer">
    <Col md={6} sm={6} xs={12}>
      <Col md={7} sm={6} xs={12} mdOffset={5} smOffset={6}>
        <div className="top-title right-title">VIEW MULTIPLE YEARS</div>
        <DropdownButton
          bsStyle="default"
          title="Years"
          id="dropdown-years"
          className="download-menu"
        >
        {
          yearsInfo.map((infoObj, index) => {
            return <Checkbox title={infoObj.year} checked={infoObj.checked} onCheck={() => onSelectYear(index)} key={index} />
          })
        }
        </DropdownButton>
      </Col>
    </Col>
    <Col md={6} sm={6} xs={12}>
        <Col md={1} sm={1} xs={1}>
        </Col>
        <Col md={7} sm={6} xs={11}>
          <div className="top-title">FILTERED BY REGION</div>
          <DropdownButton
            bsStyle="default"
            title="Region"
            id="dropdown-region"
            className="download-menu"
          >
            <Checkbox title="California" />        	                 	
          </DropdownButton>
        </Col>
    </Col>    
  </div>
  
);

FilterDropdown.propTypes = {
  onSelectYear: PropTypes.func,
  yearsInfo: PropTypes.array,
};

export default FilterDropdown;
