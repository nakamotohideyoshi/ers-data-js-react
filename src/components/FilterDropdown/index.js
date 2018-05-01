import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { YEAR_SELECTED } from '../../helpers/constants'

import Checkbox from '../Checkbox';
import RotateImg from '../../images/rotate.png'
import './style.css'

const MULTIPLE_HEADING = "VIEW MULTIPLE"
const FILTERED_HEADING = "FILTERED BY"
const YEARS_CAPTION = "Years"
const REGIONS_CAPTION = "Regions"

class FilterDropdown extends React.Component {
  state = {
    isFirstOpened: false,
    isSecondOpened: false
  }
  onEnterKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.onSwitchMultiple()
    }
  }
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
  onFirstToggle = () => {
    const isFirstOpened = !this.state.isFirstOpened
    if (isFirstOpened === true) 
      this.setState({ isSecondOpened: false })
    this.setState({ isFirstOpened })
  }
  onSecondToggle = () => {
    const isSecondOpened = !this.state.isSecondOpened
    if (isSecondOpened === true) 
      this.setState({ isFirstOpened: false })
    this.setState({ isSecondOpened }) 
  }
  render() {
    const { yearsInfo, statesInfo, whichOneMultiple, isSelectedAll, onSelectAll, onSelectState, onSelectYear, onSwitchMultiple } = this.props
    const { isFirstOpened, isSecondOpened } = this.state
    return (
      <div className="filterDropdownContainer">
      <Col md={6} sm={12} xs={12} lg={6}>
        <Col md={10} sm={12} xs={12} lg={8} lgOffset={4} mdOffset={2} className="filter-dropdown">
          <div className="top-title right-title">{ whichOneMultiple === YEAR_SELECTED ? MULTIPLE_HEADING.concat(' ' + YEARS_CAPTION) : MULTIPLE_HEADING.concat(' ' + REGIONS_CAPTION) }</div>
          <button 
            className='btn-light btn-dd' 
            onClick={this.onFirstToggle} 
            tabIndex={1000}
            data-place="top"
          >
            <div className="filter-options">
              <div className="selected-headers" 
                data-tip={
                  whichOneMultiple === YEAR_SELECTED ? 
                  YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year')):
                  REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name'))
                }
                data-place="top"
                data-offset="{'top': 10, 'right': 50}"
              >
                {
                  whichOneMultiple === YEAR_SELECTED ? 
                  YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year')):
                  REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name'))
                }
              </div>
            </div>
            {
              isFirstOpened && (
                <span className="caret_down">
                  <i className="fa fa-caret-up"></i>
                </span>
              )
            }
            {
              !isFirstOpened && (
                <span className="caret_down">
                  <i className="fa fa-caret-down"></i>
                </span>
              )
            }
          </button>
          { 
            isFirstOpened && (
              <ul className="dropdown-menu collapse in">
                <Checkbox title="Select All" checked={isSelectedAll} isMultiple={true} onCheck={() => onSelectAll(whichOneMultiple)} key={0} tabIndex={1001} />
                {
                  whichOneMultiple === YEAR_SELECTED &&
                    yearsInfo.map((infoObj, index) => {
                      return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} isMultiple={true} onCheck={() => onSelectYear(index)} key={index+1} tabIndex={1002+index} />
                    })
                }
                {
                  whichOneMultiple !== YEAR_SELECTED &&
                    statesInfo.map((obj, index) => {
                      return <Checkbox title={obj.name + ''} checked={obj.checked} isMultiple={true} onCheck={() => onSelectState(index)} key={index} tabIndex={1002+index} />
                    })
                }
              </ul>
            )
          }
        </Col>
      </Col>
      <Col md={1} sm={1} xs={1} lg={1} className="switchSection">
        <div className='switchContainer' onClick={() => onSwitchMultiple()} onKeyDown={this.onEnterKeyDown} tabIndex={1099}>
          <img src={RotateImg} alt='rotate' />
        </div>
      </Col>
      <Col md={5} sm={11} xs={11} lg={5}>
          <Col md={10} sm={12} xs={12} lg={9} className="filter-dropdown">
            <div className="top-title">{ whichOneMultiple === YEAR_SELECTED ? FILTERED_HEADING.concat(' ' + REGIONS_CAPTION.slice(0, -1)) : FILTERED_HEADING.concat(' ' + YEARS_CAPTION.slice(0, -1)) }</div>
              <button 
                className='btn-light btn-dd' 
                onClick={this.onSecondToggle} 
                tabIndex={1100}
                data-place="top"
              >
                <div className="filter-options">
                  <div className="selected-headers" 
                    data-tip={
                      whichOneMultiple === YEAR_SELECTED ? 
                      REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name')):
                      YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year'))
                    }
                    data-place="top"
                    data-offset="{'top': 10, 'right': 50}"
                  >
                    {
                      whichOneMultiple === YEAR_SELECTED ? 
                      REGIONS_CAPTION.concat(': '+this.generateToolTipList(statesInfo, 'name')):
                      YEARS_CAPTION.concat(': '+this.generateToolTipList(yearsInfo, 'year'))
                    }
                  </div>
                </div>
                {
                  isSecondOpened && (
                    <span className="caret_down">
                      <i className="fa fa-caret-up"></i>
                    </span>
                  )
                }
                {
                  !isSecondOpened && (
                    <span className="caret_down">
                      <i className="fa fa-caret-down"></i>
                    </span>
                  )
                }
              </button>
              { 
                isSecondOpened && (
                  <ul className="dropdown-menu collapse in">
                    {
                      whichOneMultiple === YEAR_SELECTED && 
                        statesInfo.map((obj, index) => {
                          return <Checkbox title={obj.name + ''} checked={obj.checked} isMultiple={false} onCheck={() => onSelectState(index)} key={index} tabIndex={1102+index} />
                        }) 
                    }
                    {
                      whichOneMultiple !== YEAR_SELECTED && 
                        yearsInfo.map((infoObj, index) => {
                          return <Checkbox title={infoObj.year + ''} checked={infoObj.checked} isMultiple={false} onCheck={() => onSelectYear(index)} key={index}tabIndex={1102+index} />
                        })
                    }    
                  </ul>
                )
              }
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
