export const addOrder = (order) => ({
    type: 'ADD_ORDER',
    payload: order,
  });
  
  export const filterOrders = (size) => ({
    type: 'FILTER_ORDERS',
    payload: size,
  });
  