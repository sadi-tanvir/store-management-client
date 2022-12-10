import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_STOCKS } from '../../../gql/queries/stockQueries';
import ProductCard from './ProductCard';

const ProductOverview = () => {

    return (
        <>
            <h1 className="text-3xl font-bold text-center uppercase pb-7">Our Products</h1>
            <section className="grid grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
                <ProductCard
                    name="মুরগির বাচ্চা"
                    img="/product-photo/chicks-photo.png"
                />

                <ProductCard
                    name="ঔষধ"
                    img="/product-photo/medicine.jpg"
                />

                <ProductCard
                    name="ব্রয়লার ফিড"
                    img="/product-photo/broiler-feed.jpg"
                />

                <ProductCard
                    name="লেয়ার ফিড"
                    img="/product-photo/layer-feed.jpg"
                />

                <ProductCard
                    name="পশু খাদ্য"
                    img="/product-photo/animal-feed.png"
                />

                <ProductCard
                    name="মাছের খাদ্য"
                    img="/product-photo/fish-feed.jpeg"
                />

            </section>
        </>
    );
};

export default ProductOverview;