import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FormAlert } from '../components/FormAlert';
export const SignUp = () => {
    const [showAlert, setShowAlert] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const handleCancelBtn = () => {

        navigate("/");
    }
    const handleSubmitBtn = async (e) => {
        e.preventDefault();

        if (formData.fullName && formData.email && formData.password) {
            try {
                const response = await axios.post('http://localhost:8000/user/sign-up', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.data;
                console.log(result);
            } catch (error) {
                console.error('Error:', error);
            }
            navigate("/login");
        } else {
            setShowAlert(true);
        }

    }

    return (
        <div className='container mx-auto mt-64 m-10'>
            <form>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                            <div className="mt-2">
                                <input type="text" value={formData.fullName} onChange={handleChange} name="fullName" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" value={formData.email} onChange={handleChange} name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" value={formData.password} onChange={handleChange} name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={handleCancelBtn} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" onClick={handleSubmitBtn} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                </div>
                {showAlert && (
                    <FormAlert />
                )}
            </form>
        </div>
    )
}
