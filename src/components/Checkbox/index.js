import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

const Checkbox = ({ title, checked, arrayIndex, isMultiple, onCheck }) => (
  <div className="checkboxlist-item">
    <label className="checkbox-container">
      {title}
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <span className={isMultiple ? "checkmark" : "checkmark single"}></span>
    </label>
  </div>
);

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

export default Checkbox;
