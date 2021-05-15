import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './pages/Home';
import YourSavings from './pages/YourSavings';
import Banner from './components/Banner'
import MySpendings from './pages/MySpendings';
import MySpendingsDetails from './pages/MySpendingsDetails';
import MySpendingsEdit from './pages/MySpendingsEdit';
import MyAccount from './pages/MyAccount';
import Tips from './pages/Tips';
import MySavingsDetailed from "./pages/YourSavingsDetailed"
import MySavingsEdit from './pages/YourSavingsEdit';

function App() {
  return (
    <div>
      <Router>
        <Banner />
        <Route exact path="/" component={Home} />
        <Route exact path="/YourSavings" component={YourSavings} />
        <Route exact path="/MySpendings" component={MySpendings} />
        <Route path="/MySpendings/details/:id" component={MySpendingsDetails} />
        <Route path="/MySpendings/edit/:id" component={MySpendingsEdit} />
        <Route path="/MyAccount" component={MyAccount} />
        <Route path="/Tips" component={Tips} />
        <Route path="/YourSavings/details/:id" component={MySavingsDetailed} />
        <Route path="/YourSavings/edit/:id" component={MySavingsEdit} />
      </Router>
    </div>
  );
}

export default App;
