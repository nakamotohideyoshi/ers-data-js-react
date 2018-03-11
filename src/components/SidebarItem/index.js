import React from 'react';
import PropTypes from 'prop-types';
import SidebarDropdown from '../SidebarDropdown'
import { SlideDown } from 'react-slidedown'
import Reset from '../../images/reset.png'

const SidebarItem = ({ headingTitle, titles, visible, selectedIndex, isOpened, isCategory, isReports, isDataReset, isRemoval, removeDataSource, isLast, toggleCategoryOptions, updateFilter, resetFilter }) => (
  <div>
    {
      visible && !isReports && isRemoval && (
        <div class="block">
          
        </div>
      )
    }
    {
      visible && (
        <div className="dropdown_second">
        {
          !isReports && isRemoval && (
            <div>
              <a className="pull-right reset" onClick={() => removeDataSource()}>
                <img src={Reset} alt="" />Remove
              </a>
            </div>
          )
        }
        <SidebarDropdown headingTitle={headingTitle} title={selectedIndex === -1 ||  selectedIndex === -2 ? 'Select' : titles[selectedIndex].header} isOpened={isOpened} isCategory={isCategory} onToggle={() => toggleCategoryOptions()} />
        <SlideDown className='my-dropdown-slidedown'>
          {
            isOpened && (
              <ul className="dropdown-menu_2 collapse in">
              {
                titles.map((val, index) => {
                  return (
                    <li onClick={()=>updateFilter(index)} className={`${selectedIndex === index ? `active`:``}`}>
                      <a>
                      {
                        selectedIndex === index && (
                          <div className="checked-option"><i className="fa fa-check"></i>{titles[index].header}</div>
                        ) || (
                          <div className="right-padding-option">{titles[index].header}</div>
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
            <div>
              <a className="pull-right reset" onClick={resetFilter}>
                <img src={Reset} alt="" />Reset
              </a>
            </div>
          )
        }
        {
          isDataReset && (
            <div>
              <a className="pull-right reset" onClick={resetFilter}>
                <img src={Reset} alt="" />Reset
              </a>
            </div>
          )
        }              
        </div>
      )
    }   
  </div>
  
);

SidebarItem.propTypes = {
  titles: PropTypes.array,
  siebarItemIndex: PropTypes.number,
  isOpened: PropTypes.bool,   
  isCategory: PropTypes.bool,
  isReports: PropTypes.bool,
  isDataReset: PropTypes.bool,
  isLast: PropTypes.bool,
  isRemoval: PropTypes.bool,
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

export default SidebarItem;
