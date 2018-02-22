import React from 'react';
import { Col } from 'react-bootstrap';
import DownloadButton from '../../components/DownloadButton';
import SheetDataChart from '../../components/SheetDataChart';
import Footnote from '../Footnote';
import './style.css';

export default class MainContainer extends React.Component {
  render() {
    return (
      <Col xs={12} md={9} sm={3}>
        <h4 className="main-heading">Farm Business Balance Sheet Data 
          <DownloadButton />
        </h4>
        <SheetDataChart />
        <Footnote />
      </Col>
    )
  }
}
