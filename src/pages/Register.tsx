import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fieldsRegister, User_register } from '../utilities/UserData';
import Card from '../components/Card';
import { useFetchPostUser } from '../hooks/usersFetch';

interface RegisterProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Register: React.FC<RegisterProps> = ({ setLoggedIn, setEmail }) => {
  const navigate = useNavigate();
  const { postUser, error, success } = useFetchPostUser();
  const [user, setUser] = useState<User_register>();

  const handleRegister = async (newUser: User_register) => {
    setUser(newUser);
    await postUser(newUser);
  };

  useEffect(() => {
    if(success && user) {
      setLoggedIn(true);
      setEmail(user.email);
      localStorage.setItem('type', '0');
      localStorage.setItem('username', user.username);
      navigate('/home');
    } 
    else {
      navigate('/register');
    }
  }, [success, setEmail, navigate, setLoggedIn, user]);
  

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className='w-screen h-screen flex bg-cover items-center justify-center'>
      <div className="lg:w-1/2 w-auto flex items-center justify-center font-serif font-bold ">
        <Card<User_register>
          fields={fieldsRegister}
          onSubmit={handleRegister}
          empty={true}
          title='Crear una cuenta'
          alert={error || ''}
          onRedirect={handleRedirect}
          background={true}
          redirectText='¿Ya tienes cuenta?'
        />
      </div>
    </div>
  );
};

export default Register;
