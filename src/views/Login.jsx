import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormAlert } from '../components/FormAlert'
import axios from 'axios';
import { FormLoginAlert } from '../components/FormLoginAlert';
import Cookies from 'js-cookie';

export const Login = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    const [formData, setFormData] = useState({
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

        console.log(formData.email, formData.password);

        if (formData.email && formData.password) {
            try {
                const response = await axios.post('http://localhost:3000/api/login',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, // for cookies to work
                    });

                console.log(response);
                console.log(response.data);

                if (response.data) {
                    Cookies.set('UserToken', response.data.token);
                    Cookies.set('User', JSON.stringify(response.data.user));
                    navigate("/");
                    window.location.reload();
                } else {
                    setShowLoginAlert(true);
                }
            } catch (error) {
                console.log(error);
                alert(`Error: ${error.response.data.message}.`);
                setShowLoginAlert(true);
            }
        } else {
            setShowAlert(true);
        }
    }


    return (
        <div className='container mx-auto mt-20 m-10'>
            <form>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" onChange={handleChange} name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" onChange={handleChange} name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={handleCancelBtn} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" onClick={handleSubmitBtn} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                </div>
                {showAlert && (
                    <FormAlert />
                )}
                {showLoginAlert && (
                    <FormLoginAlert />
                )}
            </form>
        </div>
    )
}
