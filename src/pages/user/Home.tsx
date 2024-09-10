import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

interface HomeProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  email: string;
}

const Home: React.FC<HomeProps> = ({ setLoggedIn, loggedIn, email }) => {
  const navigate = useNavigate();
  console.log(email);
  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  if (!loggedIn) {
    return null;
  }

  return (
    <div className='w-screen h-screen flex flex-col lg:flex-row mx-10'>
      <Navbar setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default Home;
