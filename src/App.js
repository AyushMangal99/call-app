import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './component/Homepage/Homepage';

const NotFound = () => <div>404 Not Found</div>;

function App(){
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
