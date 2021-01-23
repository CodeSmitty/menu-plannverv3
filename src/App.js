import React from 'react';
import './App.css';
import Planner from './component/planner'
import Store from './utility/reducers'
import Home from './containers/home/home'

function App() {
  return (
    <div className="App">
      <Store>
        
        <Home />
      </Store>
    </div>
  );
}

export default App;
