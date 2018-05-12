import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'
import HelpImg from '../../images/help.png'

const SidebarDropdown = ({ tabIndex, title, isDataLine, fontSizeIndex, headingTitle, isCategory, isOpened, onToggle, tooltip }) => (
  <div className="dropdown_up dropdown_dd">
    <button className={`${isCategory ? `btn-dark`:`btn-light`} btn_dd`} onClick={onToggle} tabIndex={tabIndex}>
      <div className="filter-options">
        {
          headingTitle.length > 0 && (
            <div>
              <span className={`top_heading font-${fontSizeIndex}-small`}>{headingTitle}</span>
              <br />
            </div>
          )
        }
        <div className={`selected-headers font-${fontSizeIndex}-big`}
        >
        <span>{title}</span>
        {
          tooltip.length > 0 && (
            <img 
              src={HelpImg}
              className="lhs-help-img"
              alt="Help Icon" 
              data-tip={tooltip} 
              data-place="top"
              data-offset="{'top': 10, 'right': 50}"
            />
          )
        }        
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
  tooltip: PropTypes.string,
  isCategory: PropTypes.bool,
  onToggle: PropTypes.func,
};

SidebarDropdown.defaultProps = {
  title: '',
  headingTitle: '',
  isCategory: false 
};

export default SidebarDropdown;
