import { configureStore } from '@reduxjs/toolkit'
import filterReducer  from '../features/filterSlicer'
// import {combineReducers } from 'redusx' ss
export default configureStore({
  reducer: {
    filter: filterReducer
  },
})