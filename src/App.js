import React from 'react';
import './App.css';
import Planner from './component/planner'
import Store from './utility/reducers'
import Home from './containers/home/home'
import Header from './containers/header/header'

function App() {
  return (
    <div className="App">
      <Store>
        <Header />
        <Home />
      </Store>
    </div>
  );
}

export default App;
