import React from 'react';
import { Col } from 'react-bootstrap';
import './style.css';
import tailorfootnote from '../../ApolloComponent/tailorFootNote'
import armsdatafootnote from '../../ApolloComponent/armsdataFootNote'
import { compose } from 'react-apollo'

class Footnote extends React.Component{
  state = {
    footnotes: []
  }

  componentWillReceiveProps(props){
    let footnotes = []
    if (props.isGetSurveyData) {
      if (props.blockIndex === 0) {
        if (props.tailorfootnote) {
          if(props.tailorfootnote.networkStatus === 7 && props.tailorfootnote.tailorfootnote) {
            props.tailorfootnote.tailorfootnote.forEach(footnote => {
              const obj = {}
              obj.text = footnote.text
              footnotes.push(obj)
            })
          }
        }
        this.setState({footnotes})
      } else {
        if (props.armsdatafootnote.networkStatus === 7) {
          for (let i=1; i<9; i++) {
            const datasource = 'datasource'+i
            if (props.armsdatafootnote[datasource]) {
              props.armsdatafootnote[datasource].forEach(footnote => {
                const obj = {}
                obj.text = footnote.text
                footnotes.push(obj)
              })
            }
          }
          this.setState({footnotes})
        }        
      }
    }
  }

  render() {
    const { footnotes } = this.state
    const { fontSizeIndex } = this.props

    return (
      <Col xs={12} md={12} sm={12}>
        <div className={`footnote font-${fontSizeIndex}-normal`}>
          <br />
          <span>Footnote</span><br />
          <strong>*</strong> — Statistically unreliable due to a low sample size.<br />
          <strong>ª</strong> — The Relative Standard Error (RSE) is the standard error of the estimate expressed as a percent of the estimate.<br />
          {
            footnotes.map((val, index) => {
              return(
                (
                  <div key={index.toString()}>
                    <strong>{index+1}</strong> {' - ' + val.text}<br />
                  </div>
                )                
              )
            })
          }
          <strong>NA</strong> — Estimate does not comply with NASS disclosure practices, is not available, or is not applicable.<br />
          <strong>Source:</strong>  Agricultural Resource Management Survey (ARMS), USDA.<br />
          <strong>Date</strong>: Published on December 8, 2016 (see Update &amp; Revision History for details).<br />
        </div>
      </Col>
    )
  }  
}

export default compose(
  tailorfootnote,
  armsdatafootnote,
)(Footnote);

