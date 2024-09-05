import { Fields } from './Types';

export interface Data {
    id: number;
    product: string;
    price: number;
    stock: number;
    [key: string]: string | number;
}

export const estructure = {
    id: 1,
    product: "",
    price: 1.0,
    stock: 1,
}

export interface Input {
    [key: string]: string | number;
}

export const fieldProducto: Fields = {
    product: {
        name: "Producto",
        type: "text"
    },
    price: {
        name: "Precio",
        type: "number"
    },
    stock: {
        name: "Stock",
        type: "number"
    }
};