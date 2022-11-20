import React, { useState } from 'react';

const Card = ({ data }: any) => {
    return (
        <>
            <div className="w-full mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                <div className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-start items-center cursor-pointer">
                    <span className="flex w-full justify-around items-center bg-slate-300 text-slate-600 px-3 py-[3px] inline-block rounded border border-gray-200 shadow-sm">
                        Batch NO. 5
                        {data?.badge && <span className="badge badge-primary text-teal-700 font-bold capitalize">latest</span>}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Card;