// Login.tsx
import React, { useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setLoggedIn, setEmail }) => {
  const image = "url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)"
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {

    // Aquí iría la lógica para consumir el endpoint
    // Ejemplo de llamada a un endpoint:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    const login = password == "123";
    const username = "Pepito";
    //Acuerdese de pedirle el usuario al back xd
    //response.ok

    if (login) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      setLoggedIn(true);
      setEmail(email);
      navigate('/home');
    }
    else {
      setError("Los datos ingresados son incorrectos")
      navigate('/');
    }

  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <Form type="login" onSubmit={handleLogin} image={image} error={error} />
    </div>
  );
};

export default Login;
