import React from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownButton } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

import Checkbox from '../Checkbox';
import RotateImg from '../../images/rotate.png'
import './style.css'

const MULTIPLE_HEADING = "VIEW MULTIPLE"
const FILTERED_HEADING = "FILTERED BY"
const YEARS_CAPTION = "Years"
const REGIONS_CAPTION = "Regions"

class FilterDropdown extends React.Component {
  generateToolTipList(category, type) {
    let categoryList = ''
    if (category) {
      category.forEach( Info => {
        if (Info.checked)
        categoryList += Info[type] + ', '
      })
      return categoryList.slice(0, -2)
    } else {
      return categoryList
    }
  }
  render() {
    const { onSelectYear, yearsInfo, onSelectState, statesInfo, isYearsMultiple, onSwitchMultiple } = this.props
    
    return (
      <div className="filterDropdownContainer">
      <Col md={6} sm={6} xs={12}>
        <Col md={10} sm={6} xs={12} mdOffset={2} smOffset={6}>
          <div className="top-title right-title">{ isYearsMultiple ? MULTIPLE_HEADING.concat(' ' + YEARS_CAPTION) : MULTIPLE_HEADING.concat(' ' + REGIONS_CAPTION) }</div>
          <DropdownButton
            bsStyle="default"
            title={ 
                <span className='selected-list'>{
                  isYearsMultiple ? 
                  YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year')):
                  REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name'))
                }
              </span>
            }
            className="download-menu"
            data-tip={this.generateToolTipList(isYearsMultiple ? yearsInfo:statesInfo, isYearsMultiple ? 'year':'name')}
          >
          {
            isYearsMultiple &&
              yearsInfo.map((infoObj, index) => {
                return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} isMultiple={true} onCheck={() => onSelectYear(index)} key={index} />
              })
           }
           {
            !isYearsMultiple &&
              statesInfo.map((obj, index) => {
                return <Checkbox title={obj.name + ''} checked={obj.checked} isMultiple={true} onCheck={() => onSelectState(index)} key={index} />
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
          <Col md={10} sm={6} xs={11}>
            <div className="top-title">{ isYearsMultiple ? FILTERED_HEADING.concat(' ' + REGIONS_CAPTION.slice(0, -1)) : FILTERED_HEADING.concat(' ' + YEARS_CAPTION.slice(0, -1)) }</div>
            <DropdownButton
              bsStyle="default"
              title={ 
                <span className='selected-list'> {
                    isYearsMultiple ? 
                    REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name')):
                    YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year'))
                  }
                </span>
              }
              className="download-menu"
              data-tip={this.generateToolTipList(isYearsMultiple ? statesInfo:yearsInfo, isYearsMultiple ? 'name':'year')}
            >
            {
              isYearsMultiple && 
                statesInfo.map((obj, index) => {
                  return <Checkbox title={obj.name + ''} checked={obj.checked} isMultiple={false} onCheck={() => onSelectState(index)} key={index} />
                }) 
            }
            {
              !isYearsMultiple && 
                yearsInfo.map((infoObj, index) => {
                  return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} isMultiple={false} onCheck={() => onSelectYear(index)} key={index} />
                })
            }       	                 	
            </DropdownButton>
          </Col>
      </Col>    
      <ReactTooltip />
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
