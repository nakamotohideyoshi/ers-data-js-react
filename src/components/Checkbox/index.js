import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

const Checkbox = ({ title, checked, arrayIndex, onCheck }) => (
  <div className="checkboxlist-item">
    <label class="checkbox-container">
      {title}
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <span class="checkmark"></span>
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
