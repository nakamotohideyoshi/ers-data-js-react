import React from 'react';
import PropTypes from 'prop-types';
import SidebarDropdown from '../SidebarDropdown'
import { SlideDown } from 'react-slidedown'
import Reset from '../../images/reset.png'

const SidebarItem = ({ headingTitle, titles, selectedIndex, isOpened, isCategory, toggleCategoryOptions, updateFilter }) => (
  <div className="dropdown_second">
    <SidebarDropdown headingTitle={headingTitle} title={titles[selectedIndex]} isOpened={isOpened} isCategory={isCategory} onToggle={() => toggleCategoryOptions()} />
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
                      <div><i className="fa fa-check"></i>{titles[index]}</div>
                    ) || (
                      <div className="right-padding-option">{titles[index]}</div>
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
      isCategory && (
        <div>
          <a className="pull-right reset">
            <img src={Reset} alt="" />Reset
          </a>
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
