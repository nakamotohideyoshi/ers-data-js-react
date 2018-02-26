import React from 'react';
import PropTypes from 'prop-types';
import HelpImg from '../../images/help.png'
import './style.css'

const TableContainer = ({ }) => (
  <div className="col-md-12 col-sm-12 col-xs-12">
    <div class="col-md-5 col-sm-3 col-xs-6 table-responsive-2 no-padding">  
      <div class="table-responsive style-4">				
          <div class="divTable">
            <div class="col-md-12 col-sm-12 col-xs-12 no-padding-2">
              <div class="divTableHeading table-heading">
                <div class="divTableRow">
                  <div class="divTableHead popver_width3"><img class="help_icon_4" src="images/unin.png" alt="" /> pin</div>
                  <div class="divTableHead popver_width4">
                    <div class="popover__wrapper"><img src="images/hide_all.png" alt="" />
                      <div class="push popover__content_2">
                      <p class="popover__message">Hide all</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divTableBody">
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding-2">
                <div class="divTableRow table-heading-2">
                  <div class="divTableCell">pinned series</div>
                  <div class="divTableCell">&nbsp;</div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width3"><img class="help_icon_4" src="images/unin.png" alt="" /> Farms
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/show.png" alt="" />Number</div></div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width3"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> Farm Assets
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                
                </div>
                <div class="divTableRow" data-toggle="collapse" data-target=".child1" aria-expanded="false">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail">Assets: Current</span>
                      <div class="push popover__content_3">
                          <p class="popover__message">Pin it</p>
                      </div>
                      </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm </div></div>
                </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12 no-padding-2 collapse child1">
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Livestock Inventor</span>
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Crop Inventory</span>
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Purchased Inputs</span>
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Cash invested in growing crops</span>
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Prepaid insurance</span>
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                </div>
                <div class="divTableRow">
                  <div class="divTableCell">
                    <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Operators dweling</span>
                      <div class="push popover__content_3">
                      <p class="popover__message">Pin it</p>
                      </div>
                    </div>
                  </div>
                  <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
                </div>`
              <div class="divTableRow">
                <div class="divTableCell">
                  <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Farm equipment</span>
                    <div class="push popover__content_3">
                    <p class="popover__message">Pin it</p>
                    </div>
                  </div>
                </div>
                <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
              
              </div>
              <div class="divTableRow">
                <div class="divTableCell">
                  <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Breeding animals</span>
                  <div class="push popover__content_3">
                  <p class="popover__message">Pin it</p>
                  </div>
                  </div>
                </div>
                <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
              </div>
              <div class="divTableRow">
                <div class="divTableCell">
                <div class="popover__wrapper popver_width"><img class="help_icon_4" src="images/unin_hide.png" alt="" /> <span class="table_detail_2">Assets: Breeding animals</span>
                <div class="push popover__content_3">
                <p class="popover__message">Pin it</p>
                </div>
                </div>
                </div>
                <div class="divTableCell"><div class="popver_width2"><img class="help_icon_4" src="images/hide.png" alt="" />Dollar per farm</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>				
    <div class="col-md-7 col-sm-9 col-xs-6 no-padding">
      <div class="table-responsive style-4" id="content-rd">
 			  <div class="divTable">
					<div class="divTableHeading table-heading">
				    <div class="divTableRow">
              <div class="divTableHead text-right">2013</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2014</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2015</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2016</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2017</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2018</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2019</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2020</div>
              <div class="divTableHead">&nbsp;</div>
              <div class="divTableHead text-right">2021</div>
              <div class="divTableHead">&nbsp;</div>
						</div>
          </div>
				  <div class="divTableBody">
						<div class="divTableRow table-heading-2">
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
              <div class="divTableCell">Estimate</div>
              <div class="divTableCell">RSE</div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">80,948</div>
              <div class="divTableCell">13.1</div>
              <div class="divTableCell">1,409</div>
              <div class="divTableCell">32.1</div>
              <div class="divTableCell">1,409</div>
              <div class="divTableCell">32.1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

TableContainer.propTypes = {
};

TableContainer.defaultProps = {
};

export default TableContainer;
