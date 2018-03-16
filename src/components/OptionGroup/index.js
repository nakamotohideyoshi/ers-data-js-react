import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

export default class OptionGroup extends React.Component {
  render() {
    const { options, selectedIndex, onSelect } = this.props
    return (
      <div className="option-group">
      {
        options && (
          options.map((option, index) => {
            if (index === selectedIndex) {
              return (
                <div className="single-option active" onClick={() => onSelect(index)}>
                  <a>
                    <i class="fa fa-check"></i>{option.label}
                  </a>
                </div>
              )
            }  
            return (
              <div className="single-option" onClick={() => onSelect(index)}>
                <a>
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

