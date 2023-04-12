import React from 'react';
import {useSelector } from "react-redux";

function Cart() {

    const products = useSelector( (state)=> state.amazonReducer.products);

    return (
        <div className="w-full bg-gray-100 p-4">
            <div className="container mx-auto h-96 grid grid-cols-5 gap-8 " >
                <div className="w-full h-full bg-white px-4 col-span-4">
                    <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3" > 
                        <h2 className="text-3xl font-medium" >Shopping Cart</h2>
                        <h4 className="text-xl font-normal">Subtotal</h4>
                    </div>
                </div>
        
                <div className="w-full h-full bg-white col-span-1">

                </div>
            </div>
        </div>
    )
}

export default Cart
