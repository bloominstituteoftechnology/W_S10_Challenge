import { configureStore } from '@reduxjs/toolkit'
import orderReducer from '../components/orderSlice'  // Import the orderSlice reducer

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    orders: orderReducer,  // Add the orderReducer here
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
