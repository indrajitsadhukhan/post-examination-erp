import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Authenticate from './Pages/Authentication/authenticate';
import Dashboard from './Pages/Dashboard/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Authenticate type="login" />} />
        <Route path="/register" element={<Authenticate type="register" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
