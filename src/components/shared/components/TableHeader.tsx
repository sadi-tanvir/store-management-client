import React from 'react';


type TablePropsType = {
    children: React.ReactNode;
    headers: string[];
}

const TableHeader = ({ children, headers }: TablePropsType) => {
    return (
        <>
            <div className="overflow-x-auto">
                <div className="w-full px-5">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    {
                                        headers.map((header, index) => <th key={index + 1} className="py-3 px-6 text-left">{header}</th>)
                                    }
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 bg-white text-sm font-light">

                                {children}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableHeader;