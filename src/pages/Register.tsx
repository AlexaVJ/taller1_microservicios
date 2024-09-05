// Register.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { fieldsRegister } from '../utilities/UserData';
import Card from '../components/Card';



interface RegisterProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}


const Register: React.FC<RegisterProps> = ({setLoggedIn, setEmail}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = (email: string, password: string, username: string) => {
    
    //aqui va el endpoint no me importa nada

    const register = email != "abc@abc"
    //response.ok
    if (register) {
      // const data = await response.json();
      setLoggedIn(true);
      setEmail(email);
      localStorage.setItem('username', username);
      navigate('/home');
    } else {
      setError("Este usuario ya existe");
      navigate('/register');
    }
    
  };

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className='w-screen h-screen flex bg-cover items-center justify-center'>
      <div className="lg:w-1/2 w-auto flex items-center justify-center font-serif font-bold">
        <Card<[string, string, string]>
          fields={fieldsRegister}
          onSubmit={handleRegister}
          empty={true}
          title='Crear una cuenta'
          alert={error}
          onRedirect={handleRedirect}
          redirectText='¿Ya tienes cuenta?'
        />
      </div>
    </div>
  );
};

export default Register;
