import React, { useState } from 'react';
import { Data } from '../utilities/Data';


interface CardProps {
    fields: string[];
    data: Data;
    onSubmit: (data: Data) => void;
    title: string;
    empty: boolean
}

const Card: React.FC<CardProps> = ({ fields, data, onSubmit, title, empty }) => {
    const image = "url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)";
    const [formData, setFormData] = useState<Data>(data);

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
        onSubmit(formData);
    };

    return (
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full m-8 mx-auto">
            <div className="w-full p-8 lg:w-1/2">
                <h5 className="mb-2 text-xl font-medium text-neutral-800">
                    {title}
                </h5>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div className="" key={field}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                type={typeof formData[field] === 'number' ? 'number' : 'text'}
                                name={field}
                                value={empty ? undefined : formData[field]}
                                step="any"
                                min={typeof formData[field] === 'number' ? 0 : undefined}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="mt-4 bg-teal-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Enviar
                    </button>
                </form>
            </div>
            <div
                className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                style={{
                    backgroundImage: image,
                }}
            ></div>
        </div>
    );
};

export default Card;
