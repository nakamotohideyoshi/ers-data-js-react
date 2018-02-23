import React from 'react';
import { Col } from 'react-bootstrap';
import './style.css';

const Footnote = ({ title }) => (
  <Col xs={12} md={12} sm={12}>
    <div className="footnote">
    <p>
      <span>Footnote</span><br />
      <strong>*</strong> — Statistically unreliable due to a low sample size.<br />
      <strong>ª</strong> — The Relative Standard Error (RSE) is the standard error of the estimate expressed as a percent of the estimate.<br />
      <strong>1</strong> — Includes accounts receivable, certificates of deposit, checking and saving balances, and any other financial assets of the farm business.<br />
      <strong>2</strong> — The value of the operators' dwelling and any associated liabilities were included if the dwelling was owned by the farm business.<br />
      <strong>NA</strong> — Estimate does not comply with NASS disclosure practices, is not available, or is not applicable.<br />
      <strong>Source:</strong>  Agricultural Resource Management Survey (ARMS), USDA.<br />
      <strong>Date</strong>: Published on December 8, 2016 (see Update &amp; Revision History for details).<br />
    </p>
    </div>
  </Col>
);

export default Footnote;

