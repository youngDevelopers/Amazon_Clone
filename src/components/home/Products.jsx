import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Products() {
    const data = useLoaderData();
    console.log(data);
    const productData = data.data;
    return (
        <div>
            Products
        </div>
    )
}

export default Products
