import React, { useMemo, useState } from 'react'
import { useGetOrdersQuery } from '../state/ordersApi'

export default function OrderList() {
  const { data: orders = [] } = useGetOrdersQuery()
  const [size, setSize] = useState('All')

  const filtered = useMemo(() => {
    return size === 'All' ? orders : orders.filter(o => o.size === size)
  }, [orders, size])

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filtered.map((ord) => {
            return (
              <li key={ord.id}>
                <div>
                  {`${ord.customer} ordered a size ${ord.size} with ${ord.toppings ? ord.toppings.length : 'no'} toppings`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(s => {
            const className = `button-filter${s === size ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${s}`}
              className={className}
              key={s}
              onClick={() => setSize(s)}
              >
                {s}
              </button>
          })
        }
      </div>
    </div>
  )
}
