import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isAuthenticated);
  }, []);

  return (
    <div className='bg-gray-200'>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/home" element={loggedIn ? <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
