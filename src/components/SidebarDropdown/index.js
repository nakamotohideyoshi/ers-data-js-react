import React from 'react';
import PropTypes from 'prop-types';

const SidebarDropdown = ({ title, headingTitle, isCategory, isOpened, onToggle }) => (
  <div className="dropdown_up dropdown_dd">
    <button className={`${isCategory ? `btn-dark`:`btn-light`} btn_dd`} onClick={onToggle} >
      <div>
        {
          headingTitle.length > 0 && (
            <div>
              <span className="top_heading">{headingTitle}</span>
              <br />
            </div>
          )
        }
        {title}
      </div>
      {
        isOpened && (
          <span className="caret_down">
            <i className="fa fa-caret-up"></i>
          </span>
        )
      }
      {
        !isOpened && (
          <span className="caret_down">
            <i className="fa fa-caret-down"></i>
          </span>
        )
      }

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
