import { Fields } from './Types';

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export const estructure = {
    id: 1,
    name: "",
    price: 1.0,
    stock: 1,
}

export const fieldProducto: Fields = {
    name: {
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