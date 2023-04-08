import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Products() {//we can add a condition if no responsse is returned
    const data = useLoaderData();
    //console.log(data);
    const productData = data.data.products;
    console.log(productData)
    return (
        <div className="max-w-screen-2xl mx-auto grid grid-cols-4 gap-10 px-4">
            {
                productData.map( (item) => {
                    return (
                        <div key={item.id} className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4 ">
                            <div className="w-full h-auto flex items-center justify-center">
                                <img className="w-52 h-64 object-contain " src={item.thumbnail} alt="product-image"/>
                            </div>
                            <div className="px-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">{item.title.substring(0, 20)}</h2>
                                    <p className="text-sm text-gray-600 font-emibold" > ${item.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products
