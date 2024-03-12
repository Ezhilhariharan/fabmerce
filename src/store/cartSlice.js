import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
    updateCartList: false,
}

export const cartSlice = createSlice({
    name : "carts",
    initialState,
    reducers:{
        updateCartListItems:(state,action)=>{
            state.cartList = action.payload
        },
        updateCartCount:(state,action)=>{
            state.updateCartList = action.payload
        },
        clearCartSlice : (state,action)=>{
            if(action.payload==="PURGE"){
                state.cartList = [],
                state.updateCartList = false
            }
        }

    }
})

export const {updateCartListItems,updateCartCount,clearCartSlice} = cartSlice.actions;

export default cartSlice.reducer;