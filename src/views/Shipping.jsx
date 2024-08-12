import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ShippingCards } from '../components/Cards';

export const Shipping = () => {

    const [isFormData, setFormData] = useState({});
    const [isTracks, setTracks] = useState([]);


    const userToken = Cookies.get('UserToken');
    const userInfo = JSON.parse(Cookies.get('User'));


    //? -----------------------FATCH DATA FROM FORM-----------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    //?-----------------------FOR CREATING NEW TRACK IN DATABASE AND POPULATING USER DATABASE-----------------------
    const handleSubmitBtnNewTrackAndPopulateDB = async (e) => {
        e.preventDefault();

        if (userToken) {
            if (isFormData['trackNumber'] && isFormData['customerId']) {
                const trackingNumber = isFormData['trackNumber'];
                const customerId = isFormData['customerId'];
                const sellerId = userInfo._id;
                const status = 'In Transit';

                axios.post('http://localhost:3000/api/v1/create', { sellerId, status, customerId, trackingNumber }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }).then((response) => {
                    console.log(response);
                    // const trackIdFromServer = response.data._id;
                    // console.log(trackIdFromServer);
                    window.location.reload(); // need to reload the page manualy
                }).catch((error) => {
                    console.log(error);
                    alert("Try different Track Number.");
                })
            } else {
                alert('Please add the "Track ID and Customer ID"');
            }
        } else {
            navigate('/login');
            alert('Please login first!');
        }
    }

    //?-----------------------GETTING TRACKS FROM DATABASE-----------------------
    useEffect(() => {
        try {
            axios.get(`http://localhost:3000/api/v1/${userInfo._id}`).then((response) => {
                setTracks(response.data.user.orderTracking);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
            alert('Somthing went wrong!');
        }
    }, []);


    //? -----------------------UPDATING TRACK STATE IN DATABASE-----------------------
    const handleBtnUpdateStateOfTrack = (trackingNumber, newTrackStatus) => {

        console.log("num: " + trackingNumber + " status: " + newTrackStatus);

        axios.put('http://localhost:3000/api/track', { trackingNumber, state: newTrackStatus }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${userToken}`,
            },
            withCredentials: true,
        }).then((response) => {
            window.location.reload();
            // console.log(response);
            alert(response.data.message);
        }).catch((err) => {
            alert(err.response.data.message);
            console.log(err);
        })
    }


    //? -----------------------DELETE TRACK IN DATABASE AND REMOVE FROM SHIPPING PAGE-----------------------
    const handleBtnDeleteTrack = (trackingNumber) => {

        axios.delete('http://localhost:3000/api/track', { trackingNumber }, {
            headers: {
                'authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((response) => {
            window.location.reload();
            // console.log(response);
            alert("Deleted: " + trackingNumber + "." + response.data.message);
        }).catch((err) => {
            alert(err.response.data.message);
            console.log(err);
        })

        // console.log("num: " + trackingNumber)
    }

    //?------FOR CREATING NEW TRACK IN SCHEMA ONLY--------
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

    // baki PUT, DELETE


    return (
        <>
            <div className='bg-[#EFF2FF]'>
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
                                <button type='submit' onClick={handleSubmitBtnNewTrackAndPopulateDB} className="mt-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Track</button>
                            </form>
                        </div>
                    </div>
                </section>
                <div className="m-3">
                    <section className='gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {isTracks.map((track) => (
                            <ShippingCards
                                key={track._id}
                                btnUpdate={handleBtnUpdateStateOfTrack}
                                btnDelete={handleBtnDeleteTrack}
                                trackId={track._id}
                                trackStatus={track.status}
                                trackingNumber={track.trackingNumber}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </>
    )
}