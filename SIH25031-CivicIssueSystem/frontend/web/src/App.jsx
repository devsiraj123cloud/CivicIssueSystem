import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import SignupPage from './component/SignupPage';
import Dashboard from './component/Dashboard';
import Hhome from './component/Hhome';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path='/Hhome' element={<Hhome/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;