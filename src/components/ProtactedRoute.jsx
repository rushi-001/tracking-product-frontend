import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const ProtactedRoute = (props) => {
    const navigate = useNavigate();
    const [isUser, setUser] = useState(false);

    useEffect(() => {
        const cookieValue = Cookies.get("UserToken");
        if (cookieValue) {
            try {
                const tokenData = jwtDecode(cookieValue);
                if (tokenData.role === props.role) {
                    setUser(true);
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                navigate("/");
            }
        } else {
            navigate("/login");
        }
    }, [])

    return (
        <>
            {!isUser && (<h1 className='pt-36 flex items-center justify-center text-3xl'>Access denied</h1>)}
            {isUser && (<Outlet />)};
        </>
    );
}
