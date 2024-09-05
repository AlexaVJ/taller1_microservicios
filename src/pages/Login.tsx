// Login.tsx
// import React, { useState } from 'react';
// import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { fieldsLogin } from '../utilities/UserData';
import { useState } from 'react';



interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setLoggedIn, setEmail }) => {
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
      setError('');
      setTimeout(() => {
        setError("Los datos ingresados son incorrectos");
      }, 0);
      navigate('/');
    }

  };

  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <div className='w-screen h-screen flex bg-cover items-center justify-center'>
      <div className="lg:w-1/2 w-auto flex items-center justify-center font-serif font-bold">
        <Card<[string, string]>
          fields={fieldsLogin}
          onSubmit={handleLogin}
          empty={true}
          title='Inicio de Sesión'
          alert={error}
          onRedirect={handleRedirect}
          redirectText='¿Aún no tienes cuenta?'
        />
      </div>
    </div>
  );
};

export default Login;
