// Login.tsx
// import React, { useState } from 'react';
// import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { fieldsLogin, User_login } from '../utilities/UserData';
import { useEffect, useState } from 'react';
import { ADMIN } from '../config/config';
import { useFetchGetUser } from '../hooks/usersFetch';



interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setLoggedIn, setEmail, setUserType }) => {
  const navigate = useNavigate();
  const { getUserByEmail, error, success, userDB } = useFetchGetUser();
  const [user, setUser] = useState<User_login>();

  const handleLogin = async (user: User_login) => {
    setUser(user);
    await getUserByEmail(user.email);
  };

  useEffect(() => {
    if(success && (user && userDB && user.password === userDB.password)) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', userDB.username);
      if(userDB.email == ADMIN) {
        setUserType('1');
        localStorage.setItem('type', '1');
      }
      else {
        setUserType('0');
        localStorage.setItem('type', '0');
      }
      setLoggedIn(true);
      setEmail(userDB.username);
      navigate('/home');
    } 
    else {
      navigate('/');
    }
  }, [success, navigate, setEmail, setLoggedIn, user, userDB, setUserType]);
  

  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <div className='w-screen h-screen flex bg-cover items-center justify-center'>
      <div className="lg:w-1/2 w-auto flex items-center justify-center font-serif font-bold ">
          <Card<User_login>
            fields={fieldsLogin}
            onSubmit={handleLogin}
            empty={true}
            title='Inicio de Sesión'
            alert={error || ''}
            background={true}
            onRedirect={handleRedirect}
            redirectText='¿Aún no tienes cuenta?'
          />
      </div>
    </div>
  );
};

export default Login;
