import { configureStore } from '@reduxjs/toolkit'
import filterReducer  from '../features/filterSlicer'
// import {combineReducers    } from 'redus  x' ss
export default configureStore({
  reducer: {
    filter: filterReducer
  },
})