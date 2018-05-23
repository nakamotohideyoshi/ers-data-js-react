import React from 'react';
import { Col } from 'react-bootstrap';
import './style.css';

class Footnote extends React.Component{
  state = {
    footnotes: []
  }

  componentWillReceiveProps(props){
    let footnotes = []
    if (props.footnotes.length > 0) { 
      if (props.blockIndex === 0) {      
        footnotes = props.footnotes 
        this.setState({footnotes})
      } else {        
        for (let i=1; i<9; i++) {
          const report = 'report_num_' + i
          const topic = 'topic_abb_' + i
          if (props[report].length > 0) {
            props.footnotes.forEach(footnote => {
              if(footnote.is_global === 0 && footnote.report_num === props[report][0] && props[topic].indexOf(footnote.topic_abb) > -1) {
                const obj = {}
                obj.report_num = footnote.report_num
                obj.topic_abb = footnote.topic_abb
                obj.text = footnote.text
                obj.sign = footnote.sign
                obj.is_global = footnote.is_global
                obj.datasource = i
                footnotes.push(obj)
              } 
            })
          }
        }

        props.footnotes.forEach(footnote => {
          if(footnote.is_global === 1) {
            const obj = {}
            obj.report_num = footnote.report_num
            obj.topic_abb = footnote.topic_abb
            obj.text = footnote.text
            obj.sign = footnote.sign
            obj.is_global = footnote.is_global
            footnotes.push(obj)
          } 
        })
        this.setState({footnotes})            
      }
    }   
  }

  render() {
    const { footnotes } = this.state
    const { fontSizeIndex, blockIndex } = this.props
    // console.log('foot', footnotes)
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
            blockIndex === 0 && (
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
            )
          }
          {
            blockIndex !== 0 && (              
              footnotes.map((val, index) => {
                if (val.is_global === 0)
                  return(
                    (
                      <div key={index.toString()}>
                        <strong>{'DataS Source ' + val.datasource + ': (' + val.sign+')'}</strong> {' - ' + val.text}<br />
                      </div>
                    )                
                  )
                else 
                  return(
                    (
                      <div key={index.toString()}>
                        <strong>{val.sign}</strong> {' - ' + val.text}<br />
                      </div>
                    )                
                  )
              })
            )
          }
        </div>
      </Col>
    )
  }  
}

export default Footnote;

