import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

//? -------------------Home Cards-------------------
export const HomeCards = ({ img, category, title, description, link }) => {
    return (
        <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"> {/* <= for 5 cards chnage acordingly */}
            <div className="h-full w-full shadow-md hover:scale-105 hover:shadow-xl transform duration-200 bg-gray-100 bg-opacity-75 px-4 pt-8 pb-12 rounded-lg overflow-hidden text-center relative">
                {/* <img src={img} alt="img" /> */} {/* <= that is for square image */}
                <div className='flex items-center justify-center'>
                    <img className='w-auto h-28' src={img} alt="img" />
                </div>
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{category}</h2>
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{title}</h1>
                <p className="leading-relaxed text-sm mb-3">{description}</p>
            </div>
        </div>
    );
}

//? -------------------Shipping Cards------------------- 
export const ShippingCards = ({ trackId, trackStatus, btnUpdate, btnDelete, trackingNumber }) => {


    const [isEditing, setEditing] = useState(false);
    const [newTrackStatus, setNewTrackStatus] = useState();

    const userToken = Cookies.get('User');
    const id = JSON.parse(userToken)._id;
    // console.log(id)

    const handleStateChange = (e) => {
        setNewTrackStatus(e.target.value);
    }

    const toggleEdit = () => {
        setEditing(!isEditing);
    }

    const getTrackingIdBtnUpdate = (e) => {
        e.preventDefault();
        btnUpdate(trackingNumber, newTrackStatus);
        toggleEdit();
    }

    const getTrackingIdBtnDelete = (e) => {
        e.preventDefault();

        btnDelete(trackingNumber);
    }

    const getOTPfromServer = async (e) => {
        e.preventDefault();
        const bool = window.confirm("OTP will be generated for your customer. Do you want to continue?");
        if (bool) {
            await axios.post('http://localhost:3000/api/v1/deliver', { sellerId: id, trackingId: trackId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }).then((response) => {
                console.log(response)
                alert('Tracking Number: ' + trackingNumber + ", You can shere the OTP to your customer: " + response.data.otp);
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <div className="shadow-md hover:shadow-xl hover:scale-[1.03] m-5 transform duration-200 rounded-lg p-6 max-w-sm mx-auto">
                <div className="flex flex-col space-y-4">
                    <div className="text-gray-800 font-semibold text-lg">
                        <span className="block">Tracking Number: <span className="font-normal">{trackingNumber}</span></span>
                        <span className="block">Tracking ID: <span className="font-normal">{trackId}</span></span>
                        <span className="block">Track Status: <span className="font-normal text-blue-500">{trackStatus}</span></span>
                    </div>
                    {isEditing ? (
                        <form onSubmit={getTrackingIdBtnUpdate} className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700">New Status:</span>
                                {/* <input
                                    type="text"
                                    value={newTrackStatus}
                                    onChange={handleStateChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                /> */}
                                <select
                                    type="text"
                                    value={newTrackStatus}
                                    onChange={handleStateChange}
                                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    <option value="In-Transit">In-Transit</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </label>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={toggleEdit}
                                className="m-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div className="flex space-x-4">
                            <button
                                onClick={toggleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                Update Status
                            </button>
                            <button
                                onClick={getOTPfromServer} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                Generate OTP
                            </button>
                            <button
                                onClick={getTrackingIdBtnDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                            >
                                Delete Track
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

//? -------------------Tracking Cards------------------- 
export const TrackingCards = ({ trackId, trackStatus, trackingNumber }) => {

    const [isEditing, setEditing] = useState(false);
    const [isOTP, setOTP] = useState();

    const userToken = Cookies.get('User');
    const id = JSON.parse(userToken)._id;


    const handleStateChange = (e) => {
        setOTP(e.target.value);
    }

    const toggleEdit = () => {
        setEditing(!isEditing);
    }

    const getOTP = (e) => {
        e.preventDefault();

        try {
            axios.post('http://localhost:3000/api/v1/ifOtp', { trackingId: trackId, buyerId: id, otp: isOTP }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }).then((response) => {
                console.log(response)
                if (response.data) {
                    alert('OTP is verified successfully, ' + response.data.message);
                    toggleEdit();
                    window.location.reload();
                }
            })
        } catch (error) {
            console.log(error);
            alert('Invalid OTP, Try Again.');
        }
    }


    return (
        <>
            <div className="flex flex-col shadow-md hover:shadow-xl hover:scale-[1.01] transform duration-300 sm:flex-row justify-between items-center m-5 py-9 rounded-lg">
                <div className="text-gray-800 ps-5 font-semibold text-lg">
                    <span className="block">Track ID: <span className="font-normal">{trackId}</span></span>
                    <span className="block">Tracking Number: <span className="font-normal">{trackingNumber}</span></span>
                    <span className="block">Track Status: <span className="font-normal text-indigo-500">{trackStatus}</span></span>
                </div>
                {isEditing ? (
                    <form onSubmit={getOTP} className="space-y-4 m-3">
                        <label className="block">
                            <span className="text-gray-700">OTP:</span>
                            <input
                                value={isOTP}
                                onChange={handleStateChange}
                                placeholder='Enter OTP'
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={toggleEdit}
                            className="m-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="flex flex-col sm:flex-row items-center m-3">
                        <button
                            onClick={toggleEdit}
                            className="flex mx-3 mb-3 sm:mb-0 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Verify With OTP
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
