import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ title, checked, arrayIndex, onCheck }) => (
  <div className="checkbox-2 checkbox-primary">
    <input type="checkbox" checked={checked} onChange={onCheck} />
    <label>
      {title}
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
