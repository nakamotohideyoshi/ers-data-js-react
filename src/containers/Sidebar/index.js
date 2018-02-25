import React from 'react';
import { Col } from 'react-bootstrap';
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import Reset from '../../images/reset.png'
import SidebarDropdown from '../../components/SidebarDropdown'
import './style.css';

export default class Sidebar extends React.Component {
  state = {
    isCategoryOpened: false,
    filterCategory: 0
  }
  toggleCategoryOptions = () => {
    this.setState({ isCategoryOpened: !this.state.isCategoryOpened })
  }
  updateCategory = (val) => {
    this.setState({ filterCategory: val })
    this.setState({ isCategoryOpened: false })
  }
  render() {
    const { isCategoryOpened, filterCategory} = this.state
    return (
    <Col sm={3} md={3} xs={12} className="sidebar-container">
        <SidebarDropdown title={`${filterCategory ? `ARMS Data Analysis`:`Tailored Reports`}`} isCategory={true} onToggle={this.toggleCategoryOptions} />
        <SlideDown className={'my-dropdown-slidedown'}>
          {
            isCategoryOpened && (
              <ul className="dropdown-menu_2 collapse in">
                <li onClick={()=>this.updateCategory(0)} className={`${filterCategory === 0 ? `active`:``}`}><a><i class="fa fa-check"></i> Tailored Reports</a></li>
                <li onClick={()=>this.updateCategory(1)} className={`${filterCategory ? `active`:``}`}><a><i class="fa fa-check"></i>ARMS Data Analysis</a></li>  
              </ul>
            )
          }
        </SlideDown>
        <div>
          <a className="pull-right reset">
            <img src={Reset} alt="" />Reset
          </a>
        </div>
        <SidebarDropdown title="Farm Business Income Statement" onToggle={this.toggleView} />
        <SidebarDropdown title="All Farms" onToggle={this.toggleView} />
        <SidebarDropdown title="All Farms" headingTitle="filter by" onToggle={this.toggleView} />
        <SidebarDropdown title="Objectors 34 years or younger" headingTitle="objector age" onToggle={this.toggleView} />
      </Col>
    )
  }
}

