import React, { Component } from 'react';
//import { Provider } from 'react-redux';
//import store from './store/configureStore';
import Highlight from './Highlight';
import UrlChecker from './UrlChecker';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {screen: 'urlchecker'}
    }
    
    handleClick(){
       this.state.screen === 'urlchecker' ? this.setState({screen: "highlighter"}) : this.setState({screen: "urlchecker"});
    }
    
  render() {
    return (
      <div className="App">
        {this.state.screen === "highlighter" ? <Highlight/> : <UrlChecker/>}
        <button onClick={this.handleClick.bind(this)} style={{position: 'absolute', bottom: '0px', right: '0px'}}>{this.state.screen}</button>
      </div>
    );
  }
}

export default App;
