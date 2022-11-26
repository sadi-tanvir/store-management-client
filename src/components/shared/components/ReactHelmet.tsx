import React from "react";
import { Helmet } from "react-helmet-async";

const ReactHelmet = ({ title }: { title: string }) => {
    return (
        <>
            <Helmet>
                <title>{title} - Store Management</title>
            </Helmet>
        </>
    );
};

export default ReactHelmet;