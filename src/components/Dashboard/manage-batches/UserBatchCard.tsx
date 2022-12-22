import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailIcon, NameIcon } from '../../../components/shared/icons/icons';
import CountDownClock from '../../../components/Dashboard/manage-batches/CountDownClock';
import { UserBatchCardProps } from '../../../types/dashboard/manageBatch.types';




const UserBatchCard = ({ batch, isThisCard, closeBatchById, reOpenBatchById }: UserBatchCardProps) => {
    const navigate = useNavigate();

    // state
    const fullName = batch?.userId?.firstName + " " + batch?.userId?.lastName

    return (
        <>
            <div className="relative w-full flex flex-col border rounded-lg overflow-hidden bg-white">
                {isThisCard ||
                    <span className='absolute right-1 top-2 text-xs w-16 text-center font-bold bg-teal-200 text-teal-500 px-[5px] py-px rounded-full'>
                        {batch?.batchNo}
                    </span>
                }
                <div className="flex flex-col space-y-4 px-5 pt-4 pb-2 text-gray-600 mb-8">
                    {batch?.status === 'open' &&
                        <div className='flex flex-row justify-between items-center'>
                            <CountDownClock createdAt={batch?.createdAt} />
                        </div>
                    }
                    <div className="flex flex-col items-start text-sm">
                        <div className="flex flex-row items-center text-[16px]">
                            <span className="mr-3">
                                <NameIcon />
                            </span>
                            <span className="tooltip tooltip-secondary font-bold text-[16px] text-gray-500" data-tip={fullName}>

                                {
                                    isThisCard ? fullName : fullName.length > 15 ? `${fullName.substring(0, 15)}... ` : fullName
                                }
                            </span>
                        </div>
                        <div className="flex flex-row items-center text-sm">
                            <span className="mr-3">
                                <MailIcon />
                            </span>
                            <span className="tooltip tooltip-secondary font-bold text-[16px] text-gray-500" data-tip={batch?.userId?.email}>
                                {batch?.userId?.email.length > 15 ? `${batch?.userId?.email.substring(0, 15)}... ` : batch?.userId?.email}
                            </span>
                        </div>
                    </div>
                </div>


                <div className='w-full flex  absolute bottom-0'>
                    {
                        batch?.status === 'open' ?
                            <span onClick={() => closeBatchById(batch?._id)} className='w-full py-[2px] text-center text-red-600 bg-red-300 font-bold bottom-0 uppercase cursor-pointer text-sm'>
                                close batch
                            </span> :
                            reOpenBatchById &&
                            <span onClick={() => reOpenBatchById(batch?._id)} className='w-full py-[6px] text-center text-red-600 bg-red-300 font-bold bottom-0 uppercase cursor-pointer text-sm'>
                                RE-Open batch
                            </span>
                    }

                    {isThisCard ||
                        <span onClick={() => navigate(`/individual-batch-details/${batch._id}_${batch?.userId?._id}`)} className='w-full py-[2px] text-center text-teal-600 bg-teal-300 font-bold bottom-0 uppercase cursor-pointer text-sm'>
                            details
                        </span>
                    }
                </div>

            </div>
        </>
    );
};

export default memo(UserBatchCard);