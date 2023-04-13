import React, { useState, useEffect} from 'react';
import {useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deleteItem, resetCart, incrementQnty, decrementQnty } from '../redux/amazonSlice';
import {useDispatch} from 'react-redux';
import { emptyCart } from '../assets/assetsExports';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";

function Cart() {

    const dispatch = useDispatch();
    const products = useSelector( (state)=> state.amazon.products);//
    //console.log(products)
    const [totalPrice, setTotalPrice] = useState("")
    //console.log(totalPrice);

    useEffect( () => { //call this function when the cart renders
        let Total = 0;
        if(products.length ===0){
            return setTotalPrice(Total);
        }
        else{
            products.map( (item) => {
                Total += item.price * item.quantity ;
                return setTotalPrice(Total.toFixed(2));
            })
        }
    }, [products]);

    return (
        <div className="w-full bg-gray-100 p-4">
            {
                products.length > 0 ? (
                    <div className="container mx-auto h-auto grid grid-cols-5 gap-8 " >
                    <div className="w-full h-full bg-white px-4 col-span-4">
                        <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3" > 
                            <h2 className="text-3xl font-medium" >Shopping Cart</h2>
                            <h4 className="text-xl font-normal">Subtotal</h4>
                        </div>
                        <div>
                            {
                                products.map( (item) =>(
                                    <div key={item.id} className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6">
                                        <div className="w-full flex items-center justify-between gap-6">
                                            <div className="w-1/5">
                                                <img className="w-full object-contain h-44" src={item.image} alt="product-Image"/>
                                            </div>
                                            <div className="w-3/5">
                                                <h2 className="font-semibold text-lg">{item.title}</h2>
                                                <p className="text-sm" >{item.description.substring(0, 60)}</p>
                                                <p className="text-base">Unit Price <span className="font-semibold">$ {item.price}</span></p>
                                                <div className="bg-[#F0F2F2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                                                    <p>Qnty:</p>
                                                    <span onClick={ () => dispatch(incrementQnty(
                                                        {id:item.id
                                                        }
                                                        )) } className="cursor-pointer object-contain bg-gary-200 px-1 rounded-md hover:bg-gray-400 duration-300"><AddIcon/></span>
                                                    <p>{item.quantity}</p>
                                                    <span onClick={ () => dispatch(decrementQnty({id:item.id})) } className="cursor-pointer object-contain bg-gary-200 px-1 rounded-md hover:bg-gray-400 duration-300"><RemoveIcon/></span>
                                                </div>
                                                <button onClick={ () => dispatch(deleteItem({id:item.id})) } className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300">
                                                    Delete Item
                                                </button>
                                            </div>
                                            <div>
                                                <p className="text-lg font-titleFont font-semibold">
                                                    $ {item.price * item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div onClick={ () => dispatch(resetCart()) } className="w-full py-2">
                            <button className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg  font-titleFont font-semibold text-lg tracking-wide" >
                                Clear Cart
                            </button>
                        </div>
                    </div>
            
                    <div className="w-full h-auto bg-white col-span-1 flex flex-col items-center justify-center p-4">
                            <div>
                                <p>
                                    <span><CheckCircleIcon className="bg-white text-green-500 rounded-full" /></span>{"  "}
                                    Your Order Qualifies for FREE Shipping Choode this option at checkout. See Details ............
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold px-10 py-1 flex items-center gap-2 justify-between">Total: <span className="text-lg font-bold">${totalPrice}</span></p>
                            </div>
                            <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300  hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3" >
                                Proceed to Pay
                            </button>
                    </div>
                </div>
                ) : (
                    <motion.div initial={{y:70,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.5,duration:0.5}} className="flex justify-center items-center gap-4 py-10">
                        <div>
                            <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="empty-cart"/>
                        </div>
                        <div className="w-96 bg-white flex flex-col items-center rounded-md shadow-lg pb-3" >
                            <h1 className="font-titleFont text-xl font-semibold" >Your Cart Feels Lonely!!!!! <span><SentimentVeryDissatisfiedIcon className="text-red-400"/></span></h1>
                            <p className="text-sm text-center" >
                                Your Shopping Cart lives to satify or serve you .Give it purpose - fill it with books, electronincs, videos, etc
                            </p>
                            <Link to='/'>
                                <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hove:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg">Continoue Shopping</button>
                            </Link>
                        </div>
                    </motion.div>
                )
            }
        </div>
    )
}

export default Cart
