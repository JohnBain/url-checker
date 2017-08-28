import React, { Component } from 'react';
//import { Provider } from 'react-redux';
//import store from './store/configureStore';
import Highlight from './Highlight';
import UrlChecker from './UrlChecker';
import './App.css';

class App extends Component {
  render() {
      console.log(window)
    return (
      <div className="App">
        {window.location.pathname === "/highlight" ? <Highlight/> : <UrlChecker/>}
      </div>
    );
  }
}

export default App;
