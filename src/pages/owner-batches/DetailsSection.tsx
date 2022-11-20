import React from 'react';

const DetailsSection = () => {
    return (
        <>
            <div>
                <section className="text-gray-700">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-center mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                                Frequently Asked Question
                            </h1>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                                The most common questions about how our business works and what
                                can do for you.
                            </p>
                        </div>
                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <div className="w-full lg:w-1/2 px-4 py-2">
                                <details className="mb-4 cursor-pointer">
                                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                                        How Long is this site live?
                                    </summary>

                                    <div className="w-50 h-20 bg-slate-50">

                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DetailsSection;