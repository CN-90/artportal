import React from 'react';
import Navbar from './layout/navbar/Navbar';
import Authpage from './pages/authpage/Authpage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';

import './App.scss';
import ProtectRoute from './utility/ProtectRoute';
import Profilepage from './pages/profilepage/Profilepage';
import Settingspage from './pages/settingspage/Settingspage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ProtectRoute path="/" exact component={Homepage} />
        <Route path="/(signin|signup)/" component={Authpage} />
        <Route exact path="/profile/:id" component={Profilepage} />
        <Route path="/profile/:id/settings" component={Settingspage} />
      </div>
    </Router>
  );
}

export default App;
