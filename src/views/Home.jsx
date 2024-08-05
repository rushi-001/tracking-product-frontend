import React, { useState } from 'react';
import { Cards } from '../components/Cards';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const [isFormData, setFormData] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmitBtn = (e) => {
        e.preventDefault();
        const userToken = Cookies.get('UserToken');
        if (userToken) {
            if (isFormData) {
                const trackingNumber = isFormData['trackId'];
                console.log(trackingNumber);
                axios.post('http://localhost:3000/api/track', { trackingNumber }, // sending data in json fromat
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${userToken}`,
                        },
                        withCredentials: true, // for cookies to work
                    }).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        alert("Something went wrong!");
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
        <div className='pt-36 sm:pt-32 md:pt-28 lg:pt-20 xl:pt-16'>
            <section className="relative bg-[#E8B446]">
                <div className='container mx-auto px-4'>
                    <div className='relative'>
                        <img className='w-full h-[100vh] md:h-[70vh] object-cover' src="./assets/home-bg.jpg" alt="background-image" />
                        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8">
                            <div className="flex-1 flex items-center justify-center lg:items-start lg:justify-start text-center lg:text-left">
                                <div>
                                    <h1 className="sm:text-5xl text-3xl font-bold title-font mb-4 text-gray-900">Track Your Package</h1>
                                    <p className="lg:w-2/3 font-semibold text-xl mx-auto leading-relaxed">Live tracking updates & more.</p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center lg:items-start lg:justify-start p-4 lg:p-8">
                                <div className="bg-white bg-opacity-70 backdrop-blur-lg p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-lg">
                                    <form className="flex flex-col">
                                        <div className="w-full mb-4">
                                            <label htmlFor="trackId" className="leading-7 text-lg font-bold text-gray-600">Tracking ID</label>
                                            <input onChange={handleChange} type="text" id="trackId" name="trackId" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                        <div className="w-full mb-4 border-b border-gray-400 pb-3">
                                            <button onClick={handleSubmitBtn} className="flex mx-auto text-white bg-indigo-500 border-0 rounded-lg py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Track Now</button>
                                        </div>
                                        <div className="flex flex-col text-center w-full mb-4">
                                            <p className="lg:w-2/3 mx-auto leading-relaxed font-light text-base">Get updates in your mobile devices.</p>
                                        </div>
                                        <div className="flex w-full md:ml-auto md:mr-0 mx-auto items-center justify-center flex-shrink-0 space-x-4">
                                            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                                                    <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z" />
                                                </svg>
                                                <span className="ml-4 flex items-start flex-col leading-none">
                                                    <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
                                                    <span className="title-font font-medium">Google Play</span>
                                                </span>
                                            </button>
                                            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                                                    <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z" />
                                                    <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z" />
                                                </svg>
                                                <span className="ml-4 flex items-start flex-col leading-none">
                                                    <span className="text-xs text-gray-600 mb-1">Download on the</span>
                                                    <span className="title-font font-medium">App Store</span>
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex flex-col items-center justify-center space-y-5 w-full h-full p-3">
                    <h1 className="text-2xl font-bold mb-3 underline">Manage Your Shipments</h1>
                    <div className='flex flex-wrap justify-center w-auto'>
                        <Cards
                            img={"./assets/pick-up.png"}
                            title="Schedule Pickup"
                            link={"/delivered"}
                        />
                        <Cards
                            img={"./assets/package.png"}
                            title="Rediract You Package"
                            link={"/delivered"}
                        />
                        <Cards
                            img={"./assets/map.png"}
                            title="Find Location"
                            link={"/delivered"}
                        />
                        <Cards
                            img={"./assets/agent.png"}
                            title="Seller  Details"
                            link={"/delivered"}
                        />
                        <Cards
                            img={"./assets/faq.png"}
                            title="FAQs"
                            link={"/delivered"}
                        />
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div id='dev1' className="container mx-auto px-4 mb-7">
                    <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-center">
                        <div className="lg:w-1/2 text-center lg:text-left lg:pl-20">
                            <h2 className="text-3xl font-bold mb-4">Recognize & Prevent Fraud</h2>
                            <p className="text-lg mb-4">Common Warning Signs of Mail, Text or Online Scams and what to do if you receive such communications. Verify the channels FedEx uses to connect with customers.</p>
                            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600">Call to Action</button>
                        </div>
                        <div className="lg:w-1/2 mb-8 lg:mb-0 md:scale-75">
                            <img className="w-full h-auto md:ml-14 object-cover rounded-lg shadow-lg" src="./assets/home-bg.jpg" alt="img" />
                        </div>
                    </div>
                </div>
                <div id='div2' className="container mx-auto px-4">
                    <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-center">
                        <div className="lg:w-1/2 mb-8 lg:mb-0 md:scale-75">
                            <img className="w-full h-auto  object-cover rounded-lg shadow-lg" src="./assets/home-bg.jpg" alt="img" />
                        </div>
                        <div className="lg:w-1/2 text-center lg:text-right lg:pr-8 mb-3">
                            <h2 className="text-3xl font-bold mb-4">Manage your import shipments online</h2>
                            <p className="text-lg mb-4">View your import shipments, upload/download documents and pay duties and taxes electronically.</p>
                            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600">Call to Action</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
