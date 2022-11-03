import React from 'react';
import { CrossIcon } from '../icons/icons';

type SingleSelectOptionType = {
    header: string;
    visibility: {
        visibility: any;
        setVisibility: any
    },
    mainStateValue: any,
    remainingStateValue: any[],
    handleRemoveValue: any,
    handleSelectValue: any,
}

const SingleSelectOption = ({ header, visibility, mainStateValue, remainingStateValue, handleRemoveValue, handleSelectValue }: SingleSelectOptionType) => {
    return (
        <>
            <div className="mt-5 mx-auto flex flex-col gap-2 px-2 bg-white rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                <div onClick={() => visibility.setVisibility(!visibility.visibility)} className="my-3 w-full mx-auto flex flex-wrap gap-2 py-3 px-2 bg-white min-h-[50px] rounded-lg border border-gray-200 shadow-md justify-center items-center cursor-pointer">
                    {mainStateValue.id === "" && <span className="bg-red-300 text-red-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm">{header}</span>}
                    <span className={`${mainStateValue.id === "" && "hidden"} flex justify-center items-center bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-full border border-gray-200 shadow-sm`}>
                        {mainStateValue.name}
                        <CrossIcon onClick={(e: React.MouseEvent) => handleRemoveValue(e)} iconClass="w-5 h-5 ml-1" />
                    </span>
                </div>
                <div className={`mb-2 ${!visibility.visibility && "hidden"}`}>
                    {remainingStateValue?.map((value: any) => {
                        return <span key={value._id} onClick={() => handleSelectValue(value._id)} className="w-full my-1 bg-teal-300 text-teal-600 px-3 py-[1px] inline-block rounded-md border border-gray-200 shadow-md text-start">
                            <span className="mr-1 flex justify-between items-center w-full">
                                {value.name}
                            </span>
                        </span>
                    })}
                </div>
            </div>
        </>
    );
};

export default SingleSelectOption;