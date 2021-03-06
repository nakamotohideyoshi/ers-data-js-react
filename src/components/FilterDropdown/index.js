import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { YEAR_SELECTED } from '../../helpers/constants'

import Checkbox from '../Checkbox';
import SwitcherImg from '../../images/switcher.png'
import SwitcherHoverImg from '../../images/switcher_hover.png'

import './style.css'

const MULTIPLE_HEADING = "VIEW MULTIPLE"
const FILTERED_HEADING = "FILTERED BY"
const YEARS_CAPTION = "Years"
const REGIONS_CAPTION = "Regions"
const changeAxis = "Change Axis"

class FilterDropdown extends React.Component {
  state = {
    isFirstOpened: false,
    isSecondOpened: false,
    isSwitcherHoverd: false,
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
  switcherToggle = () => {
    const isSwitcherHoverd = !this.state.isSwitcherHoverd
    this.setState({ isSwitcherHoverd })
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (event) => {
    if (this.firstUlGroup && !this.firstUlGroup.contains(event.target)) {
      if (this.firstFilterButton && !this.firstFilterButton.contains(event.target))
        this.setState({ isFirstOpened: false })
    }
    if (this.secondUlGroup && !this.secondUlGroup.contains(event.target)) {
      if (this.secondFilterButton && !this.secondFilterButton.contains(event.target))
        this.setState({ isSecondOpened: false })
    }
  }
  render() {
    const { yearsInfo, statesInfo, whichOneMultiple, isSelectedAll, fontSizeIndex, onSelectAll, onSelectState, onSelectYear, onSwitchMultiple } = this.props
    const { isFirstOpened, isSecondOpened, isSwitcherHoverd } = this.state
    return (
      <div className="filterDropdownContainer">
      <Col md={6} sm={12} xs={12} lg={6}>
        <Col md={10} sm={12} xs={12} lg={8} lgOffset={4} mdOffset={2} className="filter-dropdown">
          <div className={`top-title right-title font-${fontSizeIndex}-small`}>{ whichOneMultiple === YEAR_SELECTED ? MULTIPLE_HEADING.concat(' ' + YEARS_CAPTION) : MULTIPLE_HEADING.concat(' ' + REGIONS_CAPTION) }</div>
          <button 
            className='btn-light btn-dd' 
            onClick={this.onFirstToggle} 
            tabIndex={1000}
            data-place="top"
            ref={node => this.firstFilterButton = node}
          >
            <div className={`filter-options font-${fontSizeIndex}-big`}>
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
              <ul className="dropdown-menu collapse in" ref={node => this.firstUlGroup = node}>
                <Checkbox title="Select All" checked={isSelectedAll} fontSizeIndex={fontSizeIndex} isMultiple={true} onCheck={() => onSelectAll(whichOneMultiple)} key={0} tabIndex={1001} />
                {
                  whichOneMultiple === YEAR_SELECTED &&
                    yearsInfo.map((infoObj, index) => {
                      return <Checkbox title={infoObj.year + ''} fontSizeIndex={fontSizeIndex} checked={infoObj.checked} isMultiple={true} onCheck={() => onSelectYear(index)} key={index+1} tabIndex={1002+index} />
                    })
                }
                {
                  whichOneMultiple !== YEAR_SELECTED &&
                    statesInfo.map((obj, index) => {
                      return <Checkbox title={obj.name + ''} fontSizeIndex={fontSizeIndex} checked={obj.checked} isMultiple={true} onCheck={() => onSelectState(index)} key={index} tabIndex={1002+index} />
                    })
                }
              </ul>
            )
          }
        </Col>
      </Col>
      <Col md={1} sm={1} xs={1} lg={1} className="switchSection">
        <div className='switchContainer' onClick={() => onSwitchMultiple()} onKeyDown={this.onEnterKeyDown} tabIndex={1099}>
          <img src={isSwitcherHoverd ? SwitcherHoverImg : SwitcherImg} alt='Switch Icon' data-tip={changeAxis} onMouseEnter={this.switcherToggle} onMouseLeave={this.switcherToggle} />
        </div>
      </Col>
      <Col md={5} sm={11} xs={11} lg={5}>
          <Col md={10} sm={12} xs={12} lg={9} className="filter-dropdown">
            <div className={`top-title font-${fontSizeIndex}-small`}>{ whichOneMultiple === YEAR_SELECTED ? FILTERED_HEADING.concat(' ' + REGIONS_CAPTION.slice(0, -1)) : FILTERED_HEADING.concat(' ' + YEARS_CAPTION.slice(0, -1)) }</div>
              <button 
                className='btn-light btn-dd' 
                onClick={this.onSecondToggle} 
                tabIndex={1100}
                ref={node => this.secondFilterButton = node}
                data-place="top"
              >
                <div className={`filter-options font-${fontSizeIndex}-big`}>
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
                  <ul className="dropdown-menu collapse in" ref={node => this.secondUlGroup = node}>
                    {
                      whichOneMultiple === YEAR_SELECTED && 
                        statesInfo.map((obj, index) => {
                          return <Checkbox title={obj.name + ''} fontSizeIndex={fontSizeIndex}  checked={obj.checked} isMultiple={false} onCheck={() => { onSelectState(index);this.onSecondToggle() }} key={index} tabIndex={1102+index} />
                        }) 
                    }
                    {
                      whichOneMultiple !== YEAR_SELECTED && 
                        yearsInfo.map((infoObj, index) => {
                          return <Checkbox title={infoObj.year + ''} fontSizeIndex={fontSizeIndex}  checked={infoObj.checked} isMultiple={false} onCheck={() => { onSelectYear(index);this.onSecondToggle() }} key={index}tabIndex={1102+index} />
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
