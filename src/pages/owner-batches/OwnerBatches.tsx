import React, { useRef, useState } from 'react';
import Card from './Card';
import DetailsSection from './DetailsSection';

const OwnerBatches = () => {



    const card = [
        {
            id: 1,
            name: 'Product 1',
            badge: true
        },
        {
            id: 2,
            name: 'Product 2',
        },
        {
            id: 3,
            name: 'Product 3',
        },
        {
            id: 4,
            name: 'Product 3',
        },
    ]

    // const handleHideShow = () => {
    //     currRefs?.current?.childNodes[1].classList.toggle('hidden')
    // }

    return (
        <>
            <div className="w-full flex flex-col mt-5">
                <h1 className="px-3 text-2xl text-secondary font-bold mx-auto">Manage My Batches </h1>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 px-3">
                    {
                        card.map((elem) => <Card data={elem} />)
                    }
                </div>

                <DetailsSection />
            </div>
        </>
    );
};

export default OwnerBatches;