import React from 'react';
import { Cards } from '../components/Cards';

export const Home = () => {

    return (
        <div className='pt-36 sm:pt-32 md:pt-28 lg:pt-20 xl:pt-16'>
            <section className="relative bg-[#E8B446]">
                <div className='container mx-auto px-4'>
                    <div className='relative'>
                        <img className='w-full h-[70vh] object-cover' src="./assets/home-bg.jpg" alt="background-image" />
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
                                            <label htmlFor="name" className="leading-7 text-lg font-bold text-gray-600">Tracking ID</label>
                                            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                        <div className="w-full mb-4 border-b border-gray-400 pb-3">
                                            <button className="flex mx-auto text-white bg-indigo-500 border-0 rounded-lg py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Track Now</button>
                                        </div>
                                        <div className="flex flex-col text-center w-full mb-4">
                                            <p className="lg:w-2/3 mx-auto leading-relaxed font-semibold text-base">Get updates in your mobile devices.</p>
                                        </div>
                                        <div className='w-full flex items-center justify-center'>
                                            <button className='hover:scale-105 rounded-md pr-1'>
                                                <img className='w-auto h-12' src="./assets/android-logo.png" alt="android-logo" />
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
                    <div className='flex flex-wrap justify-center gap-0 w-full'>
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
        </div>
    )
}
