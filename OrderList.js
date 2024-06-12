import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const defaultOrder = {
  fullName: 'Sigourney Weaver',
  size: 'S',
  toppings: []
}

export default function OrderList() {
  const orders = useSelector(state => state.orders) || []
  const [filter, setFilter] = useState('All')

  const allOrders = [defaultOrder, ...orders]
  const filteredOrders = filter === 'All' ? allOrders : allOrders.filter(order => order.size === filter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order, index) => (
            <li key={index} className="order-item">
              <div>
                <p data-testid={`order-${index}`}>
                  <strong>
                    {order.fullName} ordered a size {order.size} with {order.toppings.length > 0 ? `${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}` : 'no toppings'}
                  </strong>
                </p>
              </div>
            </li>
          ))
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === filter ? ' active' : ''}`
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => setFilter(size)}
              >
                {size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
