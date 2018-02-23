import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import DownloadImg from '../../images/download.png'
import './style.css';

export default class MainContainer extends React.Component {
  render() {
    return (
          <div className="btn-second">
            <DropdownButton
              bsStyle="default"
              bsSize="sm"
              pullRight
              title={<div>
              <img src={DownloadImg} alt="" /> Download
            </div>}
              noCaret
              id="dropdown-no-caret"
            >
              <MenuItem eventKey="1">PDF</MenuItem>
              <MenuItem eventKey="2">PNG</MenuItem>
              <MenuItem eventKey="3">EMBED</MenuItem>
              <MenuItem eventKey="4">API</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="5">Chart (CSV)</MenuItem>
              <MenuItem eventKey="6">Table (CSV)</MenuItem>
            </DropdownButton>
          </div>
    )
  }
}
