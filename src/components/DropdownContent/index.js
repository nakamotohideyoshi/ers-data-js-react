import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'react-fa'

const DropdownContent = ({ title, isDownIcon }) => (
  <div>{title}
    <span className="caret_nav">
    {
      isDownIcon && (
        <Icon name="chevron-down" />
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
