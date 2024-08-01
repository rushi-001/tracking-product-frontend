import React from 'react';

export const Footer = () => {
    return (
        <div>
            <footer className="bg-[#4D148C] text-gray-600 body-font">
                <div className="container mx-auto py-4 px-5 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col md:flex-row items-center">
                        <img className='w-auto h-16 m-4 rounded-lg text-gray-50' src="./assets/mnnlr-logo-footer.jpg" alt="logo" />
                        <div className="flex flex-col items-center md:items-start">
                            <p className="text-gray-50 font-bold text-sm text-center md:text-left">Man Need New Life Resources.</p>
                            <p className="text-gray-50 text-sm text-center md:text-left">© High Quality is our first priority 2024 MNNLR (Man Need New Life Resources). All Rights Reserved.
                                <a href="#" rel="noopener noreferrer" className="text-gray-50 hover:text-gray-400 font-bold text-sm ml-1" target="_blank">@MNNLR</a>
                            </p>
                        </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 items-center">
                        <a className="cursor-pointer text-gray-50 transform transition-transform duration-300 hover:scale-125 mx-2">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a className="cursor-pointer text-gray-50 transform transition-transform duration-300 hover:scale-125 mx-2">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                        <a className="cursor-pointer text-gray-50 transform transition-transform duration-300 hover:scale-125 mx-2">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>
                        <a className="cursor-pointer text-gray-50 transform transition-transform duration-300 hover:scale-125 mx-2">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
