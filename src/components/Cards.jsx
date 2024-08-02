import React from 'react';

export const Cards = ({ img, category, title, description, link }) => {
    return (
        <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"> {/* <= for 5 cards chnage acordingly */}
            <div className="h-full w-full bg-gray-100 bg-opacity-75 px-4 pt-8 pb-12 rounded-lg overflow-hidden text-center relative">
                {/* <img src={img} alt="img" /> */} {/* <= that is for square image */}
                <div className='flex items-center justify-center'>
                    <img className='w-auto h-28' src={img} alt="img" />
                </div>
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{category}</h2>
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{title}</h1>
                <p className="leading-relaxed text-sm mb-3">{description}</p>
                <a href={link} className="text-indigo-500 inline-flex items-center">Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
