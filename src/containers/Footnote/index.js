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
              footnotes.push(footnote)
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
                footnotes.push(footnote)
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
          {
            footnotes.length > 0 && (
              <span>Footnote</span>
            )
          }
          <br />
          {
            footnotes.map((val, index) => {
              if (val.is_global === 1 || (val.is_global === 0 && val.report_num === this.props.report_num_0[0]))
                return(
                  (
                    <div key={index.toString()}>
                      <strong>{val.sign}</strong> {' - ' + val.text}<br />
                    </div>
                  )                
                )
              return null
            })
          }
        </div>
      </Col>
    )
  }  
}

export default compose(
  tailorfootnote,
  armsdatafootnote,
)(Footnote);

