import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cars : null,
    one_car : null,
    mycars : null,
    createFormData : {
        title : "",

    }
}

const slice = createSlice({
    name : "cars",
    initialState,
    reducers : {
        setCars : (state,action) => {
            state.cars = action.payload
        },
        setMyCars : (state,action) => {
            state.cars = action.payload
        },
        setOne : (state,action) => {
            state.one_car = action.payload
        }
        
        
    }
}) 

export const {setCars,setOne,setMyCars} = slice.actions;
export default slice.reducer;