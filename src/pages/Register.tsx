// Register.tsx
import React from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'



interface RegisterProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}


const Register: React.FC<RegisterProps> = ({setLoggedIn, setEmail}) => {
  const image = "url(https://img.freepik.com/vector-gratis/mujer-tomando-su-cafe-e-ignorando-correos-electronicos_23-2148508014.jpg?t=st=1724775245~exp=1724778845~hmac=dcbfe11f5a741ecc6b70fd52c9b43801572a408c5442d4bbf7a9915eb7152532&w=740)"
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

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <Form type="register" onSubmit={handleRegister} image={image} error={error}/>
    </div>
  );
};

export default Register;
