import React from 'react'

export const FormLoginAlert = () => {
    return (
        <div role="alert" className='mt-5'>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>Email or Password is incorrect.</p>
            </div>
        </div>

    )
}
