import { createSlice } from '@reduxjs/toolkit';

// Initial state for the orders slice
const initialState = {
  orders: [],
  filter: 'all',
};

// Create a slice for orders with actions and reducers
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    filterOrders: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Export actions generated from the slice
export const { addOrder, filterOrders } = ordersSlice.actions;

// Export the reducer generated from the slice
export default ordersSlice.reducer;
