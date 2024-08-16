import React from 'react'
import Cookies from 'js-cookie'

export const Account = () => {

    const userToken = Cookies.get('User');
    const id = JSON.parse(userToken)._id;
    const userName = JSON.parse(userToken).username;
    const userEmail = JSON.parse(userToken).email;

    return (
        <>
            <div>
                <section className='flex flex-row justify-between container px-5 py-24 mx-auto my-5 rounded-lg bg-white '>
                    <div>
                        <h1><span className='font-bold'>User UID: </span><span className='font-normal text-indigo-500'>{id}</span></h1>
                        <h1><span className='font-bold'>User Eamil: </span><span className='font-normal text-indigo-500'>{userEmail}</span></h1>
                    </div>
                    <div className='flex flex-row items-center'>
                        <label htmlFor="" className='mr-5' >Hello, <span className='font-normal text-indigo-500'>{userName}</span></label>
                        <img className='rounded-full h-14 w-14 bg-slate-100' src="#" alt="user logo" />
                    </div>
                </section>
                {/* <section className='flex flex-row justify-center items-center container px-5 py-5 mx-auto my-5 rounded-lg bg-white '>
                    <div className='bg-gray-200 px-5 py-24 m-5'>
                        trackings
                    </div>
                    <div className='bg-gray-200 px-5 py-24 m-5'>
                        shipping
                    </div>
                </section> */}
            </div >
        </>
    )
}
