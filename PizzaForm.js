import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOrder } from './orderSlice'
import * as yup from 'yup'

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const e = {
  fullNameType: 'fullName must be a string',
  fullNameRequired: 'fullName is required',
  fullNameMin: 'fullName must be at least 3 characters',
  fullNameMax: 'fullName cannot exceed 20 characters',
  sizeRequired: 'size is required',
  sizeOptions: 'size must be one of the following values: S, M, L',
}

const fullNameSchema = yup.string().typeError(e.fullNameType).trim()
  .required(e.fullNameRequired).min(3, e.fullNameMin).max(20, e.fullNameMax)

const sizeSchema = yup.string().oneOf(['S', 'M', 'L'], e.sizeOptions).required(e.sizeRequired).trim()

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState({ fullName: '', size: '' })
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const toppings = Object.keys(formState).filter(key => formState[key] === true).map(Number)
    const newOrder = {
      fullName: formState.fullName,
      size: formState.size,
      toppings,
    }

    try {
      await fullNameSchema.validate(newOrder.fullName)
      setError(prev => ({ ...prev, fullName: '' }))
    } catch (validationError) {
      setError(prev => ({ ...prev, fullName: validationError.message }))
      return
    }

    try {
      await sizeSchema.validate(newOrder.size)
      setError(prev => ({ ...prev, size: '' }))
    } catch (validationError) {
      setError(prev => ({ ...prev, size: validationError.message }))
      return
    }

    setPending(true)

    setTimeout(() => {
      dispatch(addOrder(newOrder))
      setPending(false)
      setFormState(initialFormState)
    }, 1000) // Simulating a network request delay
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {pending && <div className='pending'>Order in progress...</div>}
      {error.fullName && <div className='failure'>Order failed: {error.fullName}</div>}
      {error.size && <div className='failure'>Order failed: {error.size}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
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
            value={formState.size}
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
          <input data-testid="checkPepperoni" id="checkPepperoni" name="1" type="checkbox" checked={formState['1']} onChange={handleChange} />
          Pepperoni<br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" id="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange} />
          Green Peppers<br />
        </label>
        <label>
          <input data-testid="checkPineapple" id="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
          Pineapple<br />
        </label>
        <label>
          <input data-testid="checkMushrooms" id="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
          Mushrooms<br />
        </label>
        <label>
          <input data-testid="checkHam" id="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange} />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
