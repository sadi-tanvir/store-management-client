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
                    name="ঔষধ"
                    img="/product-photo/medicine.jpg"
                    path='/stocks/medicine-stock'
                />

                <ProductCard
                    name="মুরগির বাচ্চা"
                    img="/product-photo/chicks-photo.png"
                    path='/stocks/baby-chicken-stock'
                />


                <ProductCard
                    name="ব্রয়লার ফিড"
                    img="/product-photo/broiler-feed.jpg"
                    path='/stocks/broiler-feed-stock'
                />

                <ProductCard
                    name="লেয়ার ফিড"
                    img="/product-photo/layer-feed.jpg"
                    path='/stocks/layer-feed-stock'
                />

                <ProductCard
                    name="পশু খাদ্য"
                    img="/product-photo/animal-feed.png"
                    path='/stocks/animal-feed-stock'
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