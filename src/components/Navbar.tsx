import React from 'react';
import { BugAntIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setLoggedIn }) => {

    const navigate = useNavigate();

    const onClickLogout = () => {
        localStorage.setItem('loggedIn', 'false');
        setLoggedIn(false);
        navigate('/');
    };

    const Links = [
        { name: 'Inicio', link: '/home' }
    ];

    return (
        <div className='bg-teal-700 shadow-md w-full py-2'>
            <div className='md:px-10 px-5 text-white md:flex justify-between items-center'>
                <div className='flex text-2x1 items-center gap-2'>
                    <BugAntIcon className='w-9 h-9' />
                    <h1 className='font-bold'>Facturación</h1>
                </div>
                    <ul className='md:flex items-center'>
                        {
                            Links.map((link, index) =>
                                <li key={index} className='font-semibold md:ml-8 ml-9 m-1'>
                                    <a href={link.link}>{link.name}</a>
                                </li>)
                        }
                        <button className='btn bg-gray-100 ml-9 text-gray-800 rounded py-1 px-2 m-2' onClick={onClickLogout}>Log out</button>
                    </ul>
            </div>
        </div>
    );
};

export default Navbar;