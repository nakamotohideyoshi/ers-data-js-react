import React from 'react';
import PropTypes from 'prop-types';

import SidebarDropdown from '../SidebarDropdown'
import { SlideDown } from 'react-slidedown'
import Reset from '../../images/reset.png'
import ReactTooltip from 'react-tooltip'

export default class SidebarItem extends React.Component {
  onEnterKeyDown = (event, index, type) => {
    if (event.keyCode === 13) {
      switch (type) {
        case 'updateFilter': 
          this.props.updateFilter(index)
          break
        case 'resetFilter': 
          this.props.resetFilter()
          break
        default: 
          break
      }
    }
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  render() {
    const {
      tabIndex,
      headingTitle, 
      titles, 
      visible, 
      selectedIndex, 
      isOpened, 
      isCategory, 
      isReports, 
      isDataReset, 
      isRemoval, 
      isDataLine, 
      fontSizeIndex,
      removeDataSource, 
      toggleCategoryOptions, 
      updateFilter, 
      resetFilter
    } = this.props

  let datalineTitle = 'Select'
  if (isDataLine && selectedIndex.length > 0) {
    datalineTitle = ''
    selectedIndex.forEach(index => {
      datalineTitle = datalineTitle.concat(titles[index].header + ', ')
    });
  }
  datalineTitle = datalineTitle.slice(0, -2)
  return (
    <div>
      {
        visible && !isReports && isRemoval && (
          <div className="divider">
            
          </div>
        )
      }
      {
        visible && (
          <div className="dropdown_second">
          {
            !isReports && isRemoval && (
              <div>
                <a className="pull-right reset" onClick={() => removeDataSource()} tabIndex={tabIndex}>
                  <img src={Reset} alt="Remove Icon" />Remove
                </a>
              </div>
            )
          }
          <SidebarDropdown 
            tabIndex={tabIndex+1}
            headingTitle={headingTitle}
            isDataLine={isDataLine}
            fontSizeIndex={fontSizeIndex}
            tooltip = {isDataLine ? '' : titles[selectedIndex].tooltip}
            title={isDataLine ? datalineTitle : titles[selectedIndex].header} 
            isOpened={isOpened} 
            isCategory={isCategory} 
            onToggle={() => toggleCategoryOptions()} 
          />
          <SlideDown className='my-dropdown-slidedown'>
            {
              isOpened && (
              <ul className={`dropdown-menu_2 collapse in font-${fontSizeIndex}-big`}>
                {
                  titles.map((val, index) => {
                    return (
                      <li 
                        key={index.toString()}
                        tabIndex={tabIndex+index+2}
                        onKeyDown={event => this.onEnterKeyDown(event, index, 'updateFilter')}
                        onClick={()=>updateFilter(index)} 
                        className={`${(isDataLine ? selectedIndex.indexOf(index) > -1 : selectedIndex === index) ? `active`:``}`}
                      >
                        <a>
                        {
                          (isDataLine ? selectedIndex.indexOf(index) > -1 : selectedIndex === index) && (
                            <div className="checked-option li-option">
                              <i className="fa fa-check"></i>
                              <span>{titles[index].header}</span>
                            </div>
                          ) 
                        }
                        {
                          !(isDataLine ? selectedIndex.indexOf(index) > -1 : selectedIndex === index) && (
                            <div className="right-padding-option li-option">{titles[index].header}</div>
                          )
                        }
                        </a>
                      </li>
                    )
                  })
                }
                </ul>              
              )
            }
          </SlideDown> 
          {
            isCategory && isReports && (
              <div onKeyDown={event => this.onEnterKeyDown(event, null, 'resetFilter')}>
                <a 
                  className="pull-right reset" 
                  onClick={resetFilter}
                  tabIndex={tabIndex+titles.length+2}
                >
                  <img src={Reset} alt="Reset Icons" />Reset
                </a>
              </div>
            )
          }
          {
            isDataReset && (
              <div onKeyDown={event => this.onEnterKeyDown(event, null, 'resetFilter')}>
                <a 
                  className="pull-right reset"
                  onClick={resetFilter}
                  onKeyDown={event => this.onEnterKeyDown(event, null, 'resetFilter')}
                  tabIndex={tabIndex+titles.length+3}
                >
                  <img src={Reset} alt="Reset Icon" />Reset
                </a>
              </div>
            )
          }              
          </div>
        )
      }
       <ReactTooltip 
        place="top"
        type="info" 
        effect="float"
      />   
    </div>
    );
  }
}

SidebarItem.propTypes = {
  titles: PropTypes.array,
  siebarItemIndex: PropTypes.number,
  isOpened: PropTypes.bool,   
  isCategory: PropTypes.bool,
  isReports: PropTypes.bool,
  isDataReset: PropTypes.bool,
  isLast: PropTypes.bool,
  isRemoval: PropTypes.bool,
  isDataLine: PropTypes.bool,
  removeDataSource: PropTypes.func,
  toggleCategoryOptions: PropTypes.func,
  updateFilter: PropTypes.func  
};

SidebarItem.defaultProps = {
  titles: [],
  siebarItemIndex: 0,  
  isOpened: false,  
  isCategory: false
};

