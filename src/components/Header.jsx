import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

export const Header = () => {
    // cookie is present or not
    const [isCookiePresent, setIsCookiePresent] = useState(false);
    // user data
    const [isUserData, setUserData] = useState(null);

    useEffect(() => {
        try {
            // Check if the cookies exist
            const userToken = Cookies.get('UserToken');
            const user = Cookies.get('User');

            if (userToken && user) {
                // Decode token and parse user data
                // const decodedToken = jwtDecode(userToken);
                const userData = JSON.parse(user);

                setIsCookiePresent(true);
                setUserData(userData);
            }
        } catch (error) {
            console.error('Failed to decode token or parse user data:', error);
        }
    }, []);

    const logoutBtn = () => {
        Cookies.remove('UserToken');
        Cookies.remove('User');
        window.location.reload();
    }

    return (
        <div>
            <header className="fixed top-0 left-0 w-full text-gray-600 body-font bg-[#4D148C] z-50">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <div className="flex justify-center items-center mb-4 md:mb-0">
                        <Link to="/">
                            <img src="#" alt="logo" className='rounded-lg h-auto w-16 text-gray-50' />
                        </Link>
                        <span className="items-center justify-center ml-3 text-xl title-font font-medium text-gray-50">| Tracking Product</span>
                    </div>
                    <nav className="md:ml-36 md:mr-auto flex flex-wrap items-center text-base justify-center md:justify-between flex-1">
                        <div className="flex flex-wrap items-center text-base justify-center">
                            <Link to='/tracking' className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Tracking</Link>
                            <Link to='/shipping' className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Shipping</Link>
                            <Link to='/account' className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Account</Link>
                            <Link to='/support' className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Support</Link>
                        </div>
                        {!isCookiePresent && (
                            <div className="flex flex-wrap items-center text-base justify-center md:justify-end">
                                <Link to='/login' className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Login</Link>
                                <Link to='/sign-up' className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Sign Up</Link>
                            </div>
                        )}
                        {isCookiePresent && (
                            <div className="flex flex-wrap items-center text-base justify-center md:justify-end">
                                <span onClick={logoutBtn} className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">Logout</span>
                                <span className="mr-5 hover:text-gray-400 text-gray-50 cursor-pointer font-bold">{isUserData.username}</span>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header;
