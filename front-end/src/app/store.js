import { configureStore } from '@reduxjs/toolkit'
import filterReducer  from '../features/filterSlicer'
// import {combineReducers } from 'redusx' 
export default configureStore({
  reducer: {
    filter: filterReducer
  },
})