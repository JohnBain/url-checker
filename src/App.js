import React, { Component } from 'react';
//import { Provider } from 'react-redux';
//import store from './store/configureStore';

import UrlChecker from './UrlChecker'
import './App.css';

class App extends Component {
  render() {
      console.log(window)
    return (
      <div className="App">
       <UrlChecker/>
      </div>
    );
  }
}

export default App;
