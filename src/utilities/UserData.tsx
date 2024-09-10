import { Fields } from './Types';

export const fieldsRegister: Fields = { 
    username: {
        name: "usuario",
        type: "text"
    },
    email: {
        name: "correo",
        type: "email"
    },
    password: {
        name: "contraseña",
        type: "password"
    }
}

export const fieldsLogin: Fields = { 
    email: {
        name: "correo",
        type: "email"
    },
    password: {
        name: "contraseña",
        type: "password"
    }
}

export interface User {
    email: string;
    username: string;
}

export interface User_login {
    email: string;
    password: string;
}

export interface User_register {
    email: string;
    username: string;
    password: string;
}