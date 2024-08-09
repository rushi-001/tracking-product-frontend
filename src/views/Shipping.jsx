import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export const Shipping = () => {

    const [isFormData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitBtnPOST = async (e) => {
        e.preventDefault();
        const userToken = Cookies.get('UserToken');
        const userInfo = JSON.parse(Cookies.get('User'));
        if (userToken) {
            if (isFormData) {
                const trackingNumber = isFormData['trackNumber'];
                const customerId = isFormData['customerId'];
                const sellerId = userInfo._id;
                const status = 'In Transit';

                // ------FOR CREATING NEW TRACK IN SCHEMA ONLY--------
                // axios.post('http://localhost:3000/api/track', { trackingNumber }, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'authorization': `Bearer ${userToken}`,
                //     },
                //     withCredentials: true,
                // }).then((response) => {
                //     console.log(response);
                //     alert(response.data.message);
                // }).catch((error) => {
                //     console.log(error);
                //     if (error.response.data.message) {
                //         alert(`Something went wrong: ${error.response.data.message}!`);
                //     } else {
                //         alert("Something went wrong.");
                //     }
                // });

                axios.post('http://localhost:3000/api/v1/create', { sellerId, status, customerId, trackingNumber }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }).then((response) => {
                    console.log(response);
                    const trackIdFromServer = response.data._id;
                    console.log(trackIdFromServer);
                }).catch((error) => {
                    console.log(error);
                })

            } else {
                alert('Please add the "Track ID"');
            }
        } else {
            navigate('/login');
            alert('Please login first!');
        }
    }

    // baki PUT, DELETE

    const handleSubmitBtnPUT = (e) => {
        e.preventDefault();
        const userToken = Cookies.get('UserToken');
        if (userToken) {
            if (isFormData) {
                const trackingNumber = isFormData['trackId']; // backend looking for trackingNumber in req.body
                axios.post('http://localhost:3000/api/track', { trackingNumber }, // sending data in json fromat
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${userToken}`,
                        },
                        withCredentials: true, // for cookies to work
                    }).catch((error) => {
                        if (error.response) {
                            alert(`Error: ${error.response.data.message}. Check the existing Trackings.`); // Error response from server
                        } else {
                            alert("Something went wrong!"); // Network or other errors
                        }
                        console.log('Error: ' + error);
                    })
            } else {
                alert('Please add the "Track ID"');
            }
        } else {
            navigate('/login');
            alert('Please login first!');
        }
    }

    const handleSubmitBtnDELETE = (e) => {
        e.preventDefault();

        const bool = window.confirm('Are you sure you want to delete?');
        if (!bool) {
            return;
        }

        const userToken = Cookies.get('UserToken');
        if (userToken) {
            if (isFormData) {
                const trackingNumber = isFormData['trackId']; // backend looking for trackingNumber in req.body
                axios.post('http://localhost:3000/api/track', { trackingNumber }, // sending data in json fromat
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${userToken}`,
                        },
                        withCredentials: true, // for cookies to work
                    }).catch((error) => {
                        if (error.response) {
                            alert(`Error: ${error.response.data.message}. Check the existing Trackings.`); // Error response from server
                        } else {
                            alert("Something went wrong!"); // Network or other errors
                        }
                        console.log('Error: ' + error);
                    })
            } else {
                alert('Please add the "Track ID"');
            }
        } else {
            navigate('/login');
            alert('Please login first!');
        }
    }

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Recognize & Prevent Fraud</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Common Warning Signs of Mail, Text or Online Scams and what to do if you receive such communications. Verify the channels FedEx uses to connect with customers.</p>
                    </div>
                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <form className="relative flex-grow w-full">
                            <label className="leading-7 text-sm text-gray-600">Tracking Number</label>
                            <input onChange={handleChange} placeholder='Create new tracking number for your customer (eg. "ABC@abc!123").' type="text" id="trackNumber" name="trackNumber" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <label className="leading-7 text-sm text-gray-600">Customer ID</label>
                            <input onChange={handleChange} placeholder='Add customer ID.' type="text" id="customerId" name="customerId" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <button type='submit' onClick={handleSubmitBtnPOST} className="mt-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Track</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className='px-5 py-24 mx-auto'>
                <div className="bg-gray-100 shadow-md hover:shadow-xl transform duration-300 rounded-lg p-6 max-w-sm mx-auto">
                    <div className="flex flex-col space-y-4">
                        <div className="text-gray-800 font-semibold text-lg">
                            <span className="block">Track ID: <span className="font-normal">trackId</span></span>
                            <span className="block">Customer ID: <span className="font-normal">customerId</span></span>
                            <span className="block">Customer Name: <span className="font-normal">customerName</span></span>
                            <span className="block">Track Status: <span className="font-normal text-blue-500">trackStatus</span></span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                Update Status
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                            >
                                Delete Track
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}