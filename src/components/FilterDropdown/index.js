import React from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownButton } from 'react-bootstrap';

import { YEAR_SELECTED } from '../../helpers/constants'

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
    const { yearsInfo, statesInfo, whichOneMultiple, isSelectedAll, onSelectAll, onSelectState, onSelectYear, onSwitchMultiple } = this.props
    
    return (
      <div className="filterDropdownContainer">
      <Col md={6} sm={12} xs={12} lg={6}>
        <Col md={10} sm={12} xs={12} lg={8} lgOffset={4} mdOffset={2}>
          <div className="top-title right-title">{ whichOneMultiple === YEAR_SELECTED ? MULTIPLE_HEADING.concat(' ' + YEARS_CAPTION) : MULTIPLE_HEADING.concat(' ' + REGIONS_CAPTION) }</div>
          <DropdownButton
            bsStyle="default"
            id="1"
            title={ 
                <span className='selected-list'>{
                  whichOneMultiple === YEAR_SELECTED ? 
                  YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year')):
                  REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name'))
                }
              </span>
            }
            className="download-menu"
            data-place="top"
            data-tip={this.generateToolTipList(whichOneMultiple === YEAR_SELECTED ? yearsInfo:statesInfo, whichOneMultiple === YEAR_SELECTED ? 'year':'name')}
          >
          <Checkbox title="Select All" checked={isSelectedAll} isMultiple={true} onCheck={() => onSelectAll(whichOneMultiple)} key={0} />
          {
            whichOneMultiple === YEAR_SELECTED &&
              yearsInfo.map((infoObj, index) => {
                return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} isMultiple={true} onCheck={() => onSelectYear(index)} key={index+1} />
              })
           }
           {
            whichOneMultiple !== YEAR_SELECTED &&
              statesInfo.map((obj, index) => {
                return <Checkbox title={obj.name + ''} checked={obj.checked} isMultiple={true} onCheck={() => onSelectState(index)} key={index} />
              })
          }
          </DropdownButton>
        </Col>
      </Col>
      <Col md={1} sm={1} xs={1} lg={1} className="switchSection">
        <div className='switchContainer' onClick={() => onSwitchMultiple()}>
          <img src={RotateImg} alt='rotate' />
        </div>
      </Col>
      <Col md={5} sm={11} xs={11} lg={5}>
          <Col md={10} sm={12} xs={12} lg={9}>
            <div className="top-title">{ whichOneMultiple === YEAR_SELECTED ? FILTERED_HEADING.concat(' ' + REGIONS_CAPTION.slice(0, -1)) : FILTERED_HEADING.concat(' ' + YEARS_CAPTION.slice(0, -1)) }</div>
            <DropdownButton
              bsStyle="default"
              id="2"
              title={ 
                <span className='selected-list'> {
                    whichOneMultiple === YEAR_SELECTED ? 
                    REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name')):
                    YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year'))
                  }
                </span>
              }
              className="download-menu"
              data-place="top"
              data-tip={this.generateToolTipList(whichOneMultiple === YEAR_SELECTED ? statesInfo:yearsInfo, whichOneMultiple === YEAR_SELECTED ? 'name':'year')}
            >
            {
              whichOneMultiple === YEAR_SELECTED && 
                statesInfo.map((obj, index) => {
                  return <Checkbox title={obj.name + ''} checked={obj.checked} isMultiple={false} onCheck={() => onSelectState(index)} key={index} />
                }) 
            }
            {
              whichOneMultiple !== YEAR_SELECTED && 
                yearsInfo.map((infoObj, index) => {
                  return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} isMultiple={false} onCheck={() => onSelectYear(index)} key={index} />
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
  whichOneMultiple: PropTypes.string
};

export default FilterDropdown;
