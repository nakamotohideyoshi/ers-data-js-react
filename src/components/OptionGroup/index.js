import React from 'react';
import PropTypes from 'prop-types';

import HelpImg from '../../images/help.png'
import './style.css'

export default class OptionGroup extends React.Component {
  onEnterKeyDown(event, index) {
    if (event.keyCode === 13) {
      this.props.onSelect(index)
    }
  }
  render() {
    let { options, selectedIndex, onSelect, tabIndex, fontSizeIndex } = this.props
    return (
      <div className="option-group">
      {
        options && (
          options.map((option, index) => {
            let fontSizeStyle = option.size ? `font-increase-${index}` : `font-${fontSizeIndex}-big`
            if (index === selectedIndex) {
              return (
                <div key={index.toString()} className="single-option center-aligned active" onClick={() => onSelect(index)} onKeyDown={event => this.onEnterKeyDown(event, index)} tabIndex={tabIndex+index}>
                  <a className={fontSizeStyle}>
                    <i className="fa fa-check"></i>{option.label}
                  </a>
                  {
                    option.tooltipText &&
                      <img 
                        src={HelpImg}
                        className="help-img"
                        alt="help-img" 
                        data-tip={option.tooltipText} 
                        data-place="top"
                        data-offset="{'left': 100}"
                        tabIndex={tabIndex+index+1}
                      />
                  }
                </div>
              )
            }  
            return (
              <div key={index.toString()} className="single-option center-aligned" onClick={() => onSelect(index)} onKeyDown={event => this.onEnterKeyDown(event, index)} tabIndex={tabIndex+index}>
                <a className={fontSizeStyle}>
                  {option.label}
                </a>
                {
                  option.tooltipText &&
                    <img 
                      src={HelpImg}
                      className="help-img"
                      alt="help-img" 
                      data-tip={option.tooltipText} 
                      data-place="top"
                      data-offset="{'left': 100}"
                      tabIndex={tabIndex+index+1}
                    />
                }
              </div>
            )
          })
        )
      }
    </div>
    )
  }
}

OptionGroup.propTypes = {
  options: PropTypes.array,
  selectedIndex: PropTypes.number,
  onSelect: PropTypes.func,
};

