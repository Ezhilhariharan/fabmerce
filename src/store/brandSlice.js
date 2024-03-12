import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    brandList: [],
    catagoriesList:[]
}

export const brandSlice = createSlice({
    name: "brandsName",
    initialState,
    reducers:{
        updateBrands:(state,action)=>{
            state.brandList = action.payload
        },
        updateCatagories:(state,action)=>{
            state.catagoriesList = action.payload
        }
    }
})

export const {updateBrands,updateCatagories} = brandSlice.actions;

export default brandSlice.reducer;