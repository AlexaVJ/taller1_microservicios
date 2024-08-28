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