import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { TrackingCards } from '../components/Cards'

export const Tracking = () => {

    const [productTracking, setProductTracking] = useState([]);


    const userCookie = Cookies.get('User');
    const id = JSON.parse(userCookie)._id;

    // console.log(id)

    //?-----------------------FOR GETTING DATA FROM DATABASE-----------------------

    useEffect(() => {
        try {
            axios.get(`http://localhost:3000/api/v1/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }).then((response) => {
                setProductTracking(response.data.user.productTracking)
            }).catch((err) => {
                console.log("Error: " + err)
            })
        } catch (err) {
            console.log(err)
        }
    }, [id])

    console.log(productTracking)

    const handleBtnVarify = (otp) => {
        console.log(otp)
    }

    return (
        <>
            <div className='bg-[#EFF2FF]'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Recognize & Prevent Fraud</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Common Warning Signs of Mail, Text or Online Scams and what to do if you receive such communications. Verify the channels FedEx uses to connect with customers.</p>
                        </div>
                        {productTracking.length === 0 && <h1>No Trackings Found For You.</h1>}
                        {productTracking.length !== 0 && productTracking.map((data) => (
                            <TrackingCards
                                key={data._id}
                                trackId={data._id}
                                btnVerify={handleBtnVarify}
                                trackingNumber={data.trackingNumber}
                                trackStatus={data.status}
                            />
                        ))}
                    </div>
                </section>
            </div >
        </>
    )
}
