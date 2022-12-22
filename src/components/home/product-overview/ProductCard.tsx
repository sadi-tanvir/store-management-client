import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ name, img, path }: { name: string; img: string; path?: string; }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="container mx-auto p-9 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                <img draggable={false} className="rounded-xl w-full sm:h-36 mx-auto" src={img} alt="product" />
                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <button onClick={() => navigate(path as string)} className="mt-3 sm:mt-0 text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
                        View All
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;