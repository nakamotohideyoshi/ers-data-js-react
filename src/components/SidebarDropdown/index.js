import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

const SidebarDropdown = ({ tabIndex, title, isDataLine, headingTitle, isCategory, isOpened, onToggle }) => (
  <div className="dropdown_up dropdown_dd">
    <button className={`${isCategory ? `btn-dark`:`btn-light`} btn_dd`} onClick={onToggle} tabIndex={tabIndex}>
      <div className="filter-options">
        {
          headingTitle.length > 0 && (
            <div>
              <span className="top_heading">{headingTitle}</span>
              <br />
            </div>
          )
        }
        <div className="selected-headers" 
          data-tip={isDataLine ? title : ''}
          data-place="top"
          data-offset="{'top': 10, 'right': 50}"
        >
          {title}
        </div>
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
      <ReactTooltip 
        place="top"
        type="info" 
        effect="float"
      />
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
