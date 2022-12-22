import React, { useRef, useState } from 'react';
import DetailsSection from './DetailsSection';
import classes from "../../components/styles/global-style/global.module.css"
import { useQuery } from '@apollo/client';
import { GET_BATCHES_BY_USER_REF } from '../../gql/queries/batchQueries';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import BatchCard from './Card';

const OwnerBatches = () => {


    // redux
    const { ownerInfo } = useAppSelector(state => state.authReducer);

    // gql
    const batchResponse = useQuery(GET_BATCHES_BY_USER_REF, {
        variables: { id: ownerInfo._id }
    });

    // const handleHideShow = () => {
    //     currRefs?.current?.childNodes[1].classList.toggle('hidden')
    // }

    return (
        <>
            <div className={`w-full min-h-screen ${classes.global_background}`}>
                <div className={`min-h-screen bg-slate-200 opacity-[0.80] pt-24`}>
                    <div className={`w-full flex flex-col mt-5`}>
                        <h1 className="px-3 text-2xl text-secondary font-bold mx-auto">Manage My Batches </h1>

                        {
                            batchResponse?.data?.getBatchesByUserRef?.length <= 0 ?
                                <h1 className="text-3xl font-bold text-center mt-20 uppercase opacity-70">batch not available</h1>
                                :
                                <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 px-3">
                                    {
                                        batchResponse?.data?.getBatchesByUserRef?.map((batch: any) => {
                                            return (
                                                <>
                                                    <BatchCard batch={batch} />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                        }

                        {/* <DetailsSection /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OwnerBatches;