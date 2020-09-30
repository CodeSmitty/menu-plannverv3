import React from 'react';
import './App.css';
import Planner from './component/planner'
import Store from './utility/reducers'

function App() {
  return (
    <div className="App">
      <Store>
        <Planner />
      </Store>
    </div>
  );
}

export default App;
