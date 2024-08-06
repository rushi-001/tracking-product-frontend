import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Layout1 = () => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <main className="flex-grow pt-36 sm:pt-32 md:pt-28 lg:pt-20 xl:pt-16">
                    <Outlet />
                </main>
                <Footer />
            </div>

        </>
    )
}
