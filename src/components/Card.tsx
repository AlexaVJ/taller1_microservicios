import React, { useState } from 'react';
import { Fields } from '../utilities/Types';
import Alert from './Alert';

interface CardProps<T> {
    fields: Fields;
    data?: T;
    title: string;
    empty: boolean;
    alert: string;
    redirectText?: string;
    background: boolean;
    onSubmit: (formData: T) => void;
    onRedirect?: () => void;
}

const Card = <T extends object>({
    fields,
    data,
    title,
    empty,
    alert,
    redirectText,
    background,
    onSubmit,
    onRedirect
}: CardProps<T>) => {

    const [formData, setFormData] = useState<Partial<T>>(data || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData as T);
        setFormData({});
    };


    return (
        <div className={`lg:p-10 p-5 m-5 rounded-2xl ${background ? 'bg-gray-200 bg-opacity-20 backdrop-blur-md' : ''}`}>
            <div className="p-5 ">
                {alert && <Alert message={alert} color="red" />}
                <div className='py-5 flex items-center justify-center'>
                    <h1 className="text-4xl text-white">
                        {title}
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {Object.keys(fields).map(key => (
                        <div key={key} className='p-3'>
                            {!empty && (
                                <label className='text-white'>
                                    {fields[key].name.charAt(0).toUpperCase() + fields[key].name.slice(1)}
                                </label>
                            )}
                            <input
                                className='w-full peer px-4 py-2 border rounded-2xl border-gray-400 bg-gray-400 bg-opacity-30 text-white placeholder-white focus:outline-none focus:border-blue-200 focus:ring-0'
                                type={fields[key].type}
                                name={key}
                                value={formData[key as keyof T] !== undefined ? String(formData[key as keyof T]) : ""}
                                step="any"
                                min={fields[key].type === 'number' ? 0 : undefined}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                placeholder={fields[key].name.charAt(0).toUpperCase() + fields[key].name.slice(1)}
                            />
                        </div>
                    ))}
                    <div className='flex items-center justify-center'>
                        <button type="submit" className='rounded-full bg-blue-800 m-5 px-5 py-2 text-gray-200 hover:text-gray-700 bg-blue-800 hover:bg-blue-100 '>
                            Enviar
                        </button>
                    </div>
                </form>
                <a
                    href="#"
                    className="text-s text-gray-200 capitalize text-center w-full"
                >
                    {
                        redirectText && (
                            <>{redirectText} <span className="text-blue-300" onClick={onRedirect}>Ingresa aquí!</span></>
                        )
                    }
                </a>
            </div>
        </div>
    );
};

export default Card;
