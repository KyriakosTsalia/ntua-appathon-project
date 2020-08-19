import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import ResultContainer from "./components/ResultContainer";
import Error404 from "./components/Error404";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/disease_result" component={ResultContainer} />
        <Route path="/*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
