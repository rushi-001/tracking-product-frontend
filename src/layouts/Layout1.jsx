import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Layout1 = () => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>

        </>
    )
}
