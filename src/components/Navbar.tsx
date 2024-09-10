import React, { useEffect, useState } from 'react';
import { BugAntIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setLoggedIn }) => {

    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto

    const navigate = useNavigate();


    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const type = localStorage.getItem('type');
        setUserType(type);
    }, []);

    const onClickLogout = () => {
        localStorage.setItem('loggedIn', 'false');
        setLoggedIn(false);
        navigate('/');
    };

    let links = [
        { name: 'Inicio', link: () => navigate('/home') }
    ];

    if(userType === '1') {
        links = links.concat({ name: 'Usuarios', link: () => navigate('/users') });
    }

    return (
        <div className='bg-black bg-opacity-80 shadow-md w-full fixed top-0 left-0 z-50 lg:py-0 py-2 backdrop-blur-lg '>
            <div className='md:px-10 px-5 flex justify-between items-center text-white'>
                <div className='flex text-2x1 items-center gap-2'>
                    <BugAntIcon className='w-9 h-9' />
                    <h1 className='font-bold'>Facturación</h1>
                </div>

                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <XMarkIcon className='w-8 h-8 text-white' /> // Icono de cerrar
                        ) : (
                            <Bars3Icon className='w-8 h-8 text-white' /> // Icono de menú hamburguesa
                        )}
                    </button>
                </div>

                <ul className={`px-5 md:flex items-center md:static absolute w-full md:w-auto left-0 md:left-auto top-12 md:top-auto 
                 ${isOpen ? 'block' : 'hidden'} 
                 md:bg-transparent md:backdrop-blur-none bg-black backdrop-blur-lg bg-opacity-80 transition-all duration-300 ease-in-out`}>
                    {links.map((link, index) => (
                        <li key={index} className='font-semibold my-4 md:mx-7'>
                            <button onClick={link.link} className='text-left'>
                                {link.name}
                            </button>
                        </li>
                    ))}
                    <button className='btn bg-gray-100 hover:bg-blue-500 text-gray-800 hover:text-gray-100 rounded-full p-2 px-4 mb-4 md:mt-4' onClick={onClickLogout}>
                        Log out
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;