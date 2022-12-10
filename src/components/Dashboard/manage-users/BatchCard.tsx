import React from 'react';
import { useNavigate } from 'react-router-dom';

const BatchCard = ({ batch }: any) => {
    // router
    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => navigate(`/individual-batch-details/${batch._id}_${batch.userId._id}`)} className="w-full mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                <div className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-start items-center cursor-pointer">
                    <span className="flex w-full justify-center font-bold items-center bg-slate-300 text-slate-600 px-3 py-[3px] inline-block rounded border border-gray-200 shadow-sm">
                        {batch.batchNo}
                        <span className={`${batch.status === 'open' ? 'bg-teal-200 text-teal-700' : 'bg-rose-200 text-rose-600'} ml-3 rounded-full px-3 font-semibold`}>
                            {batch.status === 'open' ? 'current' : 'closed'}
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default BatchCard;