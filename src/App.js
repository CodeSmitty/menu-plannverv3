import React from 'react';
import './App.css';
import Planner from './component/planner'
import Store from './utility/reducers'
import Home from './containers/home/home'
import Header from './containers/header/header'
import AboutPage from './containers/about/about';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

function App() {
  let routes = (
      <Switch>
        <Route path="/" exact render={(props)=><Home {...props}/>}/>
        <Route path="/about" render={(props)=><AboutPage {...props} />} />
      </Switch>
  )

  return (
    <div className="App">
      <BrowserRouter>
        <Store>
          <Header />
          {routes}
        </Store>
      </BrowserRouter>
    </div>
  );
}

export default App;
