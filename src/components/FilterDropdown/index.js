import React from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownButton } from 'react-bootstrap';
import Checkbox from '../Checkbox';
import RotateImg from '../../images/rotate.png'
import './style.css'

const YEARS_HEADING = "VIEW MULTIPLE YEARS"
const REGIONS_HEADING = "FILTERED BY REGION"
const YEARS_CAPTION = "Years"
const REGIONS_CAPTION = "Regions"


class FilterDropdown extends React.Component {
  render() {
    const { onSelectYear, yearsInfo, onSelectState, statesInfo, isYearsMultiple, onSwitchMultiple } = this.props
    
    return (
      <div className="filterDropdownContainer">
      <Col md={6} sm={6} xs={12}>
        <Col md={7} sm={6} xs={12} mdOffset={5} smOffset={6}>
          <div className="top-title right-title">{ isYearsMultiple ? YEARS_HEADING:REGIONS_HEADING }</div>
          <DropdownButton
            bsStyle="default"
            title={ isYearsMultiple ? YEARS_CAPTION:REGIONS_CAPTION }
            className="download-menu"
          >
          {
            isYearsMultiple &&
            yearsInfo.map((infoObj, index) => {
              return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} onCheck={() => onSelectYear(index)} key={index} />
            }) ||
            statesInfo.map((obj, index) => {
              return <Checkbox title={obj.name + ''} checked={obj.checked} onCheck={() => onSelectState(index)} key={index} />
            })
          }
          </DropdownButton>
        </Col>
      </Col>
      <Col md={1} sm={1} xs={12}>
        <div className='switchContainer' onClick={() => onSwitchMultiple()}>
          <img src={RotateImg} alt='rotate' />
        </div>
      </Col>
      <Col md={5} sm={5} xs={12}>
          <Col md={8} sm={6} xs={11}>
            <div className="top-title">{ isYearsMultiple ? REGIONS_HEADING:YEARS_HEADING }</div>
            <DropdownButton
              bsStyle="default"
              title={ isYearsMultiple ? REGIONS_CAPTION:YEARS_CAPTION }
              className="download-menu"
            >
            {
              isYearsMultiple &&
              statesInfo.map((obj, index) => {
                return <Checkbox title={obj.name + ''} checked={obj.checked} onCheck={() => onSelectState(index)} key={index} />
              }) || 
              yearsInfo.map((infoObj, index) => {
                return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} onCheck={() => onSelectYear(index)} key={index} />
              }) 
            }       	                 	
            </DropdownButton>
          </Col>
      </Col>    
    </div>
    )
  }
}

FilterDropdown.propTypes = {
  onSelectYear: PropTypes.func,
  onSelectState: PropTypes.func,
  onSwitchMultiple: PropTypes.func,
  yearsInfo: PropTypes.array,
  statesInfo: PropTypes.array,
  isYearsMultiple: PropTypes.bool
};

export default FilterDropdown;
