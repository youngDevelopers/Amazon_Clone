import axios from 'axios';

export async function productsData(){
    const products = await axios.get(
         "https://jsonplaceholder.typicode.com/photos"
        //"https://fakestoreapiserver.vercel.app/amazonproducts"
    );
    return products
}