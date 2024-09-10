import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Product } from '../utilities/Data';
import { URL_BACKEND } from '../config/config';

export const useFetchGetProducts = (loggedIn: boolean) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getProducts = async () => {
        setError(null);
        setLoading(true);

        try {
            const response: AxiosResponse<{ products: Product[] }> = await axios.get(`${URL_BACKEND}/product`);
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            getProducts();
        }
    }, [loggedIn]);

    return { products, error, loading, refetch: getProducts };
};

export const useFetchPostProduct = () => {
    const [errorPost, setError] = useState<string | null>(null);
    const [successPost, setSuccess] = useState<boolean>(false);
    
    const postProduct = async (productData: Product) => {
        setError(null);
        setSuccess(false);
        try {
            const response: AxiosResponse = await axios.post(`${URL_BACKEND}/product`, productData);
            setSuccess(true); 
            return response.data; 
        } catch (error) {
            console.error('Error creating product:', error);
            setError('Error creating product');
            return null; 
        }
    };
    return { postProduct, errorPost, successPost };
};

export const useFetchPutProduct = () => {
    const [errorPut, setError] = useState<string | null>(null);
    const [successPut, setSuccess] = useState<boolean>(false);
    
    const putProduct = async (productData: Product) => {
        setError(null);
        setSuccess(false);
        try {
            const response: AxiosResponse<{ product: Product }> = await axios.post(`${URL_BACKEND}/product`, productData);
            setSuccess(true); 
            return response.data.product; 
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Error updating product');
            return null; 
        }
    };
    return { putProduct, errorPut, successPut };
};

export const useFetchDeleteProduct = () => {
    const [errorDel, setError] = useState<string | null>(null);
    const [successDel, setSuccess] = useState<boolean>(false);
    
    const deleteProduct = async (product: Product) => {
        setError(null);
        setSuccess(false);
        
        try {
            const response: AxiosResponse<{ isErased: boolean, message: string }> = await axios.delete(`${URL_BACKEND}/product`, {
                data: { id: product.id}
            });
            setSuccess(true); 
            return response.data.isErased; 
        } catch (error) {
            console.error('Error deleting product:', error);  
            setError('Error deleting product');
            return null; 
        }
    };
    return { deleteProduct, errorDel, successDel };
};
