import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    filter:{
        companies:[],
        locations:[],
        roles:[],
        minBasePay:[],
        experience:[],
        worktype:[]
    }
};

const filterSlice = createSlice({
    name:'filter',
    initialState:INITIAL_STATE,
    reducers:{
        setFilter:(state,action)=>{
            state.filter = action.payload
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer