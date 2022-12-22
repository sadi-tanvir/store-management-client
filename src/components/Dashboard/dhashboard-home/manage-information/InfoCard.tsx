import React from 'react';

const InfoCard = ({ heading, info }: { heading: string; info: string }) => {
    return (
        <>
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-4 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
                    </svg>
                    <div className="space-y-2">
                        <p className="text-slate-800 font-bold">{heading}</p>
                        <span className="block  font-semibold text-primary group-hover:text-slate-800 transition duration-200">
                            {info}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoCard;