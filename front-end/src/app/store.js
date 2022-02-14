import { configureStore } from '@reduxjs/toolkit'
import filterReducer  from '../features/filterSlicer'
// import {combineReducers } from 'redux'
export default configureStore({
  reducer: {
    filter: filterReducer
  },
})