import React, { useState, useMemo } from 'react'
import { useCreateOrderMutation } from '../state/ordersApi'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const TOPPING_IDS = ['1', '2', '3', '4', '5']

export default function PizzaForm() {
  const [form, setForm] = useState(initialFormState)
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation()

  const handleChange = e => {
    const { name, type, checked, value } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value}))
  }


  const onSubmit = e => {
    e.preventDefault()
    const payload = {
      fullName: form.fullName.trim(),
      size: form.size,
      toppings: TOPPING_IDS.filter(id => form[id])
    }
    createOrder(payload)
      .unwrap()
      .then(() => setForm(initialFormState))
      .catch((err) => err)
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>{error?.data?.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            data-testid="sizeSelect" 
            id="size"
            name="size"
            value={form.size}
            onChange={handleChange}
             >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={handleChange} checked={form[1]} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={handleChange} checked={form[2]} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={handleChange} checked={form[3]} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={handleChange} checked={form[4]} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={handleChange} checked={form[5]} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
