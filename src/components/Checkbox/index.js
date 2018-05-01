import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

export default class Checkbox extends React.Component {
  onEnterKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.onCheck()
    }
  }
  render() {
    const { title, checked, isMultiple, tabIndex, onCheck } = this.props
    return (
      <div className="checkboxlist-item" tabIndex={tabIndex} onKeyDown={this.onEnterKeyDown}>
        <label className="checkbox-container">
          {title}
          <input type="checkbox" checked={checked} onChange={onCheck} />
          <span className={isMultiple ? "checkmark" : "checkmark single"}></span>
        </label>
      </div>
    )
  }
}

Checkbox.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  arrayIndex: PropTypes.number,
  onCheck: PropTypes.func
};

Checkbox.defaultProps = {
  title: '',
  checked: false,
  arrayIndex: 0
};

