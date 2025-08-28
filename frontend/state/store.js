import { configureStore } from '@reduxjs/toolkit'
import { ordersApi } from './ordersApi'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    ordersApi.middleware
  ),
})

export const store = resetStore()
