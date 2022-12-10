import React from 'react';

const BusinessOverview = () => {
    return (
        <>
            <section className='pb-5'>
                <h1 className="text-3xl font-bold text-center uppercase pb-5">our clients</h1>
                <div className="space-y-8 md:grid md:grid-cols-3 md:gap-12 md:space-y-0">
                    <div className='flex flex-col justify-center items-center'>
                        <svg className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                        <h3 className="mb-2 text-2xl font-bold dark:text-white">50K+ Users</h3>
                        <p className="font-light text-gray-500 dark:text-gray-400">Trusted by over 50 Thousand users around the world</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <svg className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg>
                        <h3 className="mb-2 text-2xl font-bold dark:text-white">50+ countries</h3>
                        <p className="font-light text-gray-500 dark:text-gray-400">We export our product worldwide</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <svg className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                        <h3 className="mb-2 text-2xl font-bold dark:text-white">10K+ Order</h3>
                        <p className="font-light text-gray-500 dark:text-gray-400">Order per day</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BusinessOverview;