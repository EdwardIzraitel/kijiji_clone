import {createSlice} from "@reduxjs/toolkit"

export const filterSlicer = createSlice({
    name:"filter",
    initialState:{
        filter: ''
    },
    reducers:{
        changeFilter:(state,action)=>{
            state.filter = action.payload
        }
    }
})
export const {changeFilter} = filterSlicer.actions
export const selectFilter = (state) => state.filter.filter
export default filterSlicer.reducer