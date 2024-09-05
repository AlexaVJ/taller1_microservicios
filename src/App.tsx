import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { cld } from './utilities/Images';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './index.css'

const App: React.FC = () => {
  const backgroundImage = cld.image('background-login-4');
  backgroundImage.format('auto').quality('auto');
  backgroundImage.resize(fill().width(2000).height(800));
  const imageUrl = backgroundImage.toURL();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isAuthenticated);
  }, []);
  return (
    <div className='h-screen flex bg-cover items-center justify-center' style={{ backgroundImage: `url(${imageUrl})` }}>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/home" element={loggedIn ? <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
