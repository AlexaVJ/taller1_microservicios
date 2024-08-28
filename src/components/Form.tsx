import React, { useState } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
    type: 'login' | 'register';
    image: string;
    error: string;
    onSubmit: (email: string, password: string, username: string) => void;
}

const Form: React.FC<AuthFormProps> = ({ type, onSubmit, image, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password, username);
    };

    const handleRedirect = () => {
        if (type === 'register') {
            navigate('/');
        } else {
            navigate('/register');
        }
    };


    return (
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
            <div
                className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                style={{
                    backgroundImage: image,
                }}
            ></div>
            <div className="w-full p-8 lg:w-1/2">
                {error && <Alert message={error} color="red" />}
                <p className="text-xl text-gray-600 text-center">Bienvenido!</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {type === 'register' && (
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-teal-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                        >
                            {type === 'register' ? 'Registrarse' : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 flex items-center w-full text-center">
                    <a
                        href="#"
                        className="text-xs text-gray-500 capitalize text-center w-full"
                    >{
                            (type === 'register' || type === 'login') && (
                                <>
                                    {type === 'register' ? (
                                        <>¿Ya tienes cuenta? <span className="text-blue-700" onClick={handleRedirect}>Ingresa aquí!</span></>
                                    ) : (
                                        <>¿Aún no tienes cuenta? <span className="text-blue-700" onClick={handleRedirect}>Regístrate aquí!</span></>
                                    )}
                                </>
                            )
                        }

                    </a>
                </div>
            </div>
        </div>
    );
};

export default Form;
