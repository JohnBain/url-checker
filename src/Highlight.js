import React, { Component } from 'react';
import './App.css';

class DOMElem extends Component {
  constructor(props){
    super(props);
    console.log(props)

  }
    
    render(){
      return <div 
      type={this.props.type} onClick={this.props.onClick} className={this.props.clickedElem === this.props.type && 'highlighted'}>
          {this.props.children}
      </div>
  }
}

class Highlight extends Component {
  constructor(){
    super();

    this.state = {clickedElem: '', rawMarkup: `<>`}
  }
    
  handleClick(evt){
      console.log('here', evt.target.getAttribute('type'))
      this.setState({clickedElem: evt.target.getAttribute('type')})
  }

  renderReact(htmlStr){
    var elemsToBeRendered = []; //parse markup into a mix of plain strings (if RegEx fails) and DOMElems
    var x = React.createElement('span', null, ['Steve Wozniak', React.createElement(DOMElem, {type: 'div', clickedElem: this.state.clickedElem, onClick: this.handleClick.bind(this)}, '<div>Ada Lovelace</div>'), 'Bill Gates', React.createElement(DOMElem, {type: 'div', clickedElem: this.state.clickedElem, onClick: this.handleClick.bind(this)}, '<div>Linus Torvalds</div>'), React.createElement(DOMElem, {type: 'span', clickedElem: this.state.clickedElem, onClick: this.handleClick.bind(this)}, '<span>Elon Musk</span>')]);
    return x;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <span>{this.state.rawMarkup &&
this.renderReact(this.state.rawMarkup)}</span>
        </p>
      </div>
    );
  }
}

export default Highlight;
