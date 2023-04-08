import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Products() {//we can add a condition if no responsse is returned
    const data = useLoaderData();
    //console.log(data);
    const productData = data.data.products;
    console.log(productData)
    return (
        <div>
            {
                productData.map( (item) => {
                    <div>
                        <img src={item.thumbnail} alt=""/>
                    </div>
                })
            }
        </div>
    )
}

export default Products
