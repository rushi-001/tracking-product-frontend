import React, { useState } from 'react';

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
                {/* <a href={link} className="text-indigo-500 inline-flex items-center">Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </svg>
                </a> */}
            </div>
        </div>
    );
}

//? -------------------Shipping Cards------------------- 
export const ShippingCards = ({ trackId, trackStatus, btnUpdate, btnDelete, trackingNumber }) => {


    const [isEditing, setEditing] = useState(false);
    const [newTrackStatus, setNewTrackStatus] = useState();

    const handleStatusChange = (e) => {
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
                                <input
                                    type="text"
                                    value={newTrackStatus}
                                    onChange={handleStatusChange}
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
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
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
export const TrackingCards = ({ trackId, trackStatus, btnVerify }) => {
    return (
        <>
            <div className="flex flex-col shadow-md hover:shadow-xl transform duration-300 sm:flex-row justify-between items-center m-5 bg-gray-100 py-9 rounded-lg">
                <div className="text-gray-800 ps-5 font-semibold text-lg">
                    <span className="block">Track ID: <span className="font-normal">{trackId}</span></span>
                    <span className="block">Track Status: <span className="font-normal">{trackStatus}</span></span>
                </div>
                <div className="flex flex-col sm:flex-row items-center m-3">
                    <button
                        onClick={btnVerify}
                        className="flex mx-3 mb-3 sm:mb-0 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </>
    )
}
