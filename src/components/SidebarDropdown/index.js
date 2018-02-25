import React from 'react';
import PropTypes from 'prop-types';

const SidebarDropdown = ({ title, headingTitle, isCategory, onToggle }) => (
  <div className="dropdown_up dropdown_dd">
    <button className={`${isCategory ? `btn-dark`:`btn-light`} btn_dd`} onClick={onToggle} >
      {
        headingTitle.length > 0 && (
          <div>
            <span className="top_heading">report</span>
            <br />
          </div>
        )
      }
      {title}
      <span className="caret_down">
        <i className="fa fa-caret-down"></i>
      </span>
    </button>
  </div>
);

SidebarDropdown.propTypes = {
  title: PropTypes.string,
  headingTitle: PropTypes.string,
  isCategory: PropTypes.bool,
  onToggle: PropTypes.func,
};

SidebarDropdown.defaultProps = {
  title: '',
  headingTitle: '',
  isCategory: false 
};

export default SidebarDropdown;