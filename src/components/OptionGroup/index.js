import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

export default class OptionGroup extends React.Component {
  onEnterKeyDown(event, index) {
    if (event.keyCode === 13) {
      this.props.onSelect(index)
    }
  }
  render() {
    const { options, selectedIndex, onSelect, tabIndex, fontSizeIndex } = this.props
    return (
      <div className="option-group">
      {
        options && (
          options.map((option, index) => {
            let defaultFontSize = '1em'
            if (fontSizeIndex === 1) defaultFontSize = '1.5em'
            else if (fontSizeIndex === 2) defaultFontSize = '2em'
            const fontSize =  { fontSize: option.size ? option.size : defaultFontSize }
            if (index === selectedIndex) {
              return (
                <div key={index.toString()} className="single-option center-aligned active" onClick={() => onSelect(index)} onKeyDown={event => this.onEnterKeyDown(event, index)} tabIndex={tabIndex+index}>
                  <a style={fontSize}>
                    <i className="fa fa-check"></i>{option.label}
                  </a>
                </div>
              )
            }  
            return (
              <div key={index.toString()} className="single-option center-aligned" onClick={() => onSelect(index)} onKeyDown={event => this.onEnterKeyDown(event, index)} tabIndex={tabIndex+index}>
                <a style={fontSize}>
                  {option.label}
                </a>
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

