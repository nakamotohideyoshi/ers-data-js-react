import React from 'react';
import PropTypes from 'prop-types';

const DropdownContent = ({ title, isDownIcon }) => (
  <div>{title}
    <span className="caret_nav">
    {
      isDownIcon && (
        <i class="fa fa-chevron-down"></i>
      )
    }
    </span>
  </div>
);

DropdownContent.propTypes = {
  title: PropTypes.string,
  isDownIcon: PropTypes.bool,
};

DropdownContent.defaultProps = {
  title: '',
  isDownIcon: true 
};

export default DropdownContent;
