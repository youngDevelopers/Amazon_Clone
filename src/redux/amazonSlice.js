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
        addToCart: (state,action) =>{
            const item = state.products.find( (item) => item.id === action.payload.id  )//finding an item inside the products list
            if (item){
                item.quantity += action.payload.quantity
            }else{
                state.products.push(action.payload)
            }
        }
    },
})

export const {addToCart} = amazonSlice.actions;
export default amazonSlice.reducer;