import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, NameIcon, ViewIcon } from '../shared/icons/icons';
import CountDownClock from './CountDownClock';
import ProfilePhoto from './ProfilePhoto';

const UserBatchCard = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-4">
                    <div className="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
                        <ProfilePhoto />
                    </div>
                    <div className="flex flex-col sm:border-l col-span-3">
                        <div className="flex flex-col space-y-4  p-6 text-gray-600">
                            <CountDownClock />

                            <div className="flex flex-row items-center text-sm">
                                <span className="mr-3">
                                    <NameIcon />
                                </span>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-bold text-lg">Tanvir Hossain Sadi</span>
                                </p>
                            </div>



                        </div>
                        <div className="flex flex-col w-full relative bottom-0">
                            <div className="grid grid-cols-2 border-t divide-x text-[#0ed3cf]  bg-gray-50 dark:bg-transparent py-3">
                                <span className="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                                    <div className="mr-2" >
                                        <DeleteIcon />
                                    </div>
                                    Remove
                                </span>
                                <span onClick={() => navigate('/batch-details/asdf')} className="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                                    <ViewIcon />
                                    Details
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default UserBatchCard;