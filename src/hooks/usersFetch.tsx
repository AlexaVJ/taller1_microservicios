import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { User, User_register } from '../utilities/UserData';
import { URL_BACKEND } from '../config/config';

export const useFetchGetUsers = (loggedIn: boolean) => {
    const [items, setItems] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const response: AxiosResponse<{ users: User[] }> = await axios.get(`${URL_BACKEND}/user`);
            setItems(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (loggedIn) {
            fetchUsers();
        }
    }, [loggedIn]);

    return { items, loading, error, refetch: fetchUsers };
};

export const useFetchPostUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const postUser = async (userData: User_register) => {
        setError(null);
        setSuccess(false);

        try {
            await axios.post(`${URL_BACKEND}/user`, userData);
            setSuccess(true);
        } catch (error) {
            console.error('Error creating user:', error);
            setError('El correo del usuario ya se encuentra registrado');
        }
    };

    return { postUser, error, success };
};

export const useFetchGetUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [userDB, setUser] = useState<User_register | null>(null);

    const getUserByEmail = async (email: string) => {
        setError(null);
        setSuccess(false);

        try {
            const response: AxiosResponse<{ user: User_register }> = await axios.get(`${URL_BACKEND}/user`, {
                params: { email }
            });

            if (response.data.user) {
                setUser(response.data.user);
                setSuccess(true);
            } else {
                setError('No user found');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('El email ingresado no existe.');
        }
    };
    return { getUserByEmail, userDB, error, success };
};

export const useFetchDeleteUser = () => {
    const [errorDel, setError] = useState<string | null>(null);
    const [successDel, setSuccess] = useState<boolean>(false);

    const deleteUser = async (user: User) => {
        setError(null);
        setSuccess(false);

        try {
            const response: AxiosResponse<{ isErased: boolean, message: string }> = await axios.delete(`${URL_BACKEND}/user`, {
                data: { email: user.email }
            });
            setSuccess(true);
            return response.data.isErased;
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
            return null;
        }
    };
    return { deleteUser, errorDel, successDel };
};
