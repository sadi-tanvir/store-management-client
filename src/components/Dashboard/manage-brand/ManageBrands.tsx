import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_BRANDS_1 } from '../../../gql/queries/brandQueries';
import TableHeader from "../../shared/components/TableHeader";
import { BrandIcon, EmailIcon, EyesIcon, TableDeleteIcon, TableEditIcon } from '../../shared/icons/icons';


type ManageBrandType = {
    _id: string;
    name: string;
    email: string;
    suppliers: {
        id: {
            name: string;
            imageUrl: string
        };
    }[];
}

const ManageBrands = () => {
    const brandResponse = useQuery(GET_BRANDS_1);

    return (
        <>
            <div className="w-full">
                <TableHeader headers={["name", "email", "suppliers", "status", "actions"]}>
                    {
                        brandResponse?.data.brandsWithReference.map((brand: ManageBrandType) => {
                            return (
                                <>
                                    <tr>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <BrandIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-medium">
                                                    {brand.name.length > 15 ? `${brand.name.substring(0, 15)}..` : brand.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <EmailIcon iconClass="h-5 w-5 text-primary" />
                                                </div>
                                                <span>
                                                    {brand.email.length > 25 ? `${brand.email.substring(0, 10)} ... @${brand.email.split('@')[1]}` : brand.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {brand.suppliers.map((supplier: any, index: any) => {
                                                    return <img key={index} className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125" src={supplier.id.imageUrl} />
                                                })}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="bg-teal-200 text-teal-600 py-1 px-3 rounded-full text-xs">Active</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <EyesIcon />
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-primary hover:scale-110">
                                                    <TableEditIcon />
                                                </div>
                                                <div className="w-4 mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                                                    <TableDeleteIcon />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }

                </TableHeader>
            </div >
        </>
    );
};

export default ManageBrands;