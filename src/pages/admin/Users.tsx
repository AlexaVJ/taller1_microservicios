import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Tabla from '../../components/Tabla';
import Alert from '../../components/Alert';
import { User } from '../../utilities/UserData';
import { useFetchDeleteUser, useFetchGetUsers } from '../../hooks/usersFetch'; 
import { useEffect } from 'react';

interface HomeProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loggedIn: boolean;
}

const Users: React.FC<HomeProps> = ({ setLoggedIn, loggedIn }) => {
    const navigate = useNavigate();
    
    const { items, loading, error, refetch } = useFetchGetUsers(loggedIn);
    const { deleteUser } = useFetchDeleteUser();

    const columns = [
        {
            name: 'Email',
            selector: (row: User) => row.email,
        },
        {
            name: 'Username',
            selector: (row: User) => row.username,
        }
    ];

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    if (!loggedIn) {
        return null;
    }

    const onDelete = async (id: string) => {
        const user = items.find((item: User) => item.email === id);
        if(user) {
            const isDeleted = await deleteUser(user);
            if(isDeleted) {
                await refetch();
            }
        }
    };

    return (
        <div className='w-screen h-screen flex flex-col lg:flex-row mx-10'>
            <Navbar setLoggedIn={setLoggedIn} />

            {/* Sección de contenido principal */}
            <div className='pt-16 px-10 flex-grow items-center place-content-center bg-gray-100 bg-opacity-80 backdrop-blur-lg overflow-y-auto'>
                <div className='pt-10 px-8'>
                    <div className='w-full flex items-center place-content-center text-3xl pb-5'>
                        <h1 className='font-bold'>Usuarios</h1>
                    </div>
                    <h2>Los usuarios registrados son los siguientes: </h2>

                    {/* Mostrar animación de carga, error o el contenido */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-950"></div>
                        </div>
                    ) : error ? (
                        <Alert message={error} color='red' />
                    ) : items.length === 0 ? (
                        <Alert message='No hay usuarios disponibles' color='red' />
                    ) : (
                        <Tabla<User, string>
                            columns={columns}
                            data={items}
                            onDelete={onDelete}
                            getRowId={(row) => row.email}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
