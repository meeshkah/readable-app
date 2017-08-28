import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header text="📖 Readable" />
        <Posts />
      </div>
    );
  }
}

export default App;
