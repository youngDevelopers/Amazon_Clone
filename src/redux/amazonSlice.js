import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

//slice is more like a feature to the site -
const initialState = {
    products: [],
    userInfo: [],
}

export const amazonSlice = createSlice({
    name: "amazon",
    initialState,
    reducers: {
        addToCart: (state,action) => {
            const item = state.products.find( (item) => item.id === action.payload.id  )//finding an item inside the products list
            if (item){
                item.quantity += action.payload.quantity
            }else{
                state.products.push(action.payload)
            }
        },
        incrementQnty: (state, action) =>{
            const item = state.products.find( (item) => item.id === action.payload.id )
            item.quantity ++
        },
        decrementQnty: (state, action) => {
            const item = state.products.find( (item) => item.id === action.payload.id)
            if(item.quantity ===1){
                item.quantity = 1
            }
            else{
                item.quantity--
            }
        },
        deleteItem: (state, action) => {
            state.products = state.products.filter( (item) => item.id !== action.payload.id ) //returns a list of items that is not selected or not equal to selected product id in the action payload
        },
        resetCart: (state) => {
            state.products = []
        }
    },
})

export const {addToCart, deleteItem, resetCart, incrementQnty, decrementQnty} = amazonSlice.actions;
export default amazonSlice.reducer;