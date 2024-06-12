import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterOrders } from '../redux/reducers'; // Adjusted relative path

const Orders = () => {
  const { orders, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const filteredOrders = orders.filter(
    (order) => filter === 'all' || order.size === filter
  );

  return (
    <div className="orders-container">
      <h2>Pizza Orders</h2>
      <div id="orders">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order">
            <strong>{order.name}</strong> ordered a size {order.size} with{' '}
            {order.toppings.length} toppings: {order.toppings.join(', ')}
          </div>
        ))}
      </div>
      <div className="filter">
        <label>Filter by size:</label>
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => dispatch(filterOrders('all'))}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'S' ? 'active' : ''}`}
          onClick={() => dispatch(filterOrders('S'))}
        >
          S
        </button>
        <button
          className={`filter-btn ${filter === 'M' ? 'active' : ''}`}
          onClick={() => dispatch(filterOrders('M'))}
        >
          M
        </button>
        <button
          className={`filter-btn ${filter === 'L' ? 'active' : ''}`}
          onClick={() => dispatch(filterOrders('L'))}
        >
          L
        </button>
      </div>
    </div>
  );
};

export default Orders;
