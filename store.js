import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './reducers'; // Ensure this path is correct

const store = configureStore({
  reducer: ordersReducer,
});

export default store;
