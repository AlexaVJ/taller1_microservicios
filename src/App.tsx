import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { cld } from './utilities/Images';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Home from './pages/user/Home';
import HomeAdmin from './pages/admin/Home_Admin';
import Register from './pages/Register';
import Login from './pages/Login';
import './index.css';
import Users from './pages/admin/Users';

const App: React.FC = () => {
  const backgroundImage = cld.image('background-login-4');
  backgroundImage.format('auto').quality('auto');
  backgroundImage.resize(fill().width(2000).height(800));
  const imageUrl = backgroundImage.toURL();
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [userType, setUserType] = useState<string>(''); 

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loggedIn') === 'true';
    const type = localStorage.getItem('type'); 
    setLoggedIn(isAuthenticated);
    setUserType(type || ''); 
  }, [userType]);

  return (
    <div className='h-screen flex bg-cover items-center justify-center' style={{ backgroundImage: `url(${imageUrl})` }}>
      <Routes>
        {/* Si está logueado y el tipo es '1' (admin), redirige a /home_admin, si no a /home */}
        <Route path="/" element={loggedIn ? (userType === '1' ? <Navigate to="/home_admin" /> : <Navigate to="/home" />) : <Login setLoggedIn={setLoggedIn} setEmail={setEmail} setUserType={setUserType} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        {/* Rutas para home y home_admin dependiendo del tipo de usuario */}
        <Route path="/home" element={loggedIn && userType !== '1' ? <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/home_admin" element={loggedIn && userType === '1' ? <HomeAdmin loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/users" element={loggedIn && userType === '1' ? <Users loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;