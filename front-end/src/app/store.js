import { configureStore } from '@reduxjs/toolkit'
import filterReducer  from '../features/filterSlicer'
export default configureStore({
  reducer: {
    filter: filterReducer
  },
})