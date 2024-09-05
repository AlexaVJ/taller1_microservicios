import React, { useState } from 'react';
import { Data } from '../utilities/Data';
import { Fields } from '../utilities/Types';
import Alert from './Alert';

interface CardProps<T extends unknown[]> {
    fields: Fields;
    data?: Data;
    title: string;
    empty: boolean;
    alert: string,
    redirectText?: string;
    onSubmit: (...args: T) => void;
    onRedirect?: () => void;
}

const Card = <T extends unknown[]>({
    fields,
    data,
    title,
    empty,
    alert,
    redirectText,
    onSubmit,
    onRedirect
}: CardProps<T>) => {

    const [formData, setFormData] = useState<Partial<Data>>(data || {});

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
        onSubmit(...Object.values(formData) as T);
    };

    return (
        <div className="lg:w-3/5 w-full lg:p-10 p-5 m-5 bg-gray-200 bg-opacity-20 rounded-2xl backdrop-blur-md ">
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
                                <label>
                                    {fields[key].name.charAt(0).toUpperCase() + fields[key].name.slice(1)}
                                </label>
                            )}
                            <input
                                className='w-full peer px-4 py-2 border rounded-2xl border-gray-400 bg-gray-400 bg-opacity-30 text-white placeholder-white focus:outline-none focus:border-blue-200 focus:ring-0'
                                type={fields[key].type}
                                name={key}
                                value={empty ? undefined : formData?.[key] ?? ""}
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
                        <button type="submit" className='rounded-full bg-blue-800 m-5 px-5 py-2 text-gray-200'>
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
