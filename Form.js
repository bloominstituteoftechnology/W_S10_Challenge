import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addOrder } from '../redux/reducers';

const e = {
  fullNameType: 'fullName must be a string',
  fullNameRequired: 'fullName is required',
  fullNameMin: 'fullName must be at least 3 characters',
  fullNameMax: 'fullName cannot exceed 20 characters',
  sizeRequired: 'size is required',
  sizeOptions: 'size must be one of the following values: S, M, L',
  toppingsRequired: 'toppings is required',
  toppingsType: 'toppings must be an array of IDs',
  toppingInvalid: 'topping ID invalid',
  toppingRepeated: 'topping IDs cannot be repeated',
};

const toppings = [
  { id: 1, name: 'Pepperoni' },
  { id: 2, name: 'Green Peppers' },
  { id: 3, name: 'Pineapple' },
  { id: 4, name: 'Mushrooms' },
  { id: 5, name: 'Ham' },
];

const pizzaSchema = Yup.object().shape({
  fullName: Yup.string()
    .typeError(e.fullNameType)
    .trim()
    .required(e.fullNameRequired)
    .min(3, e.fullNameMin)
    .max(20, e.fullNameMax),
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], e.sizeOptions)
    .required(e.sizeRequired)
    .trim(),
  toppings: Yup.array()
    .typeError(e.toppingsType)
    .of(
      Yup.number()
        .typeError(e.toppingsType)
        .integer(e.toppingsType)
        .min(1, e.toppingInvalid)
        .max(5, e.toppingInvalid)
    )
    .test('is-unique', e.toppingRepeated, (list) => {
      if (!list) return true;
      const set = new Set(list);
      return set.size === list.length;
    }),
});

const Form = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      size: '',
      toppings: [],
    },
    validationSchema: pizzaSchema,
    onSubmit: (values) => {
      dispatch(addOrder(values));
    },
  });

  return (
    <div className="form-container">
      <h2>Pizza Form</h2>
      {formik.errors.fullName && formik.touched.fullName && (
        <div className="error-message">{formik.errors.fullName}</div>
      )}
      {formik.errors.size && formik.touched.size && (
        <div className="error-message">{formik.errors.size}</div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group input-container">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            placeholder="Type full name"
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.size}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        <div className="form-group input-container">
          <label>Toppings</label>
          {toppings.map((topping) => (
            <label key={topping.id}>
              <input
                type="checkbox"
                name="toppings"
                value={topping.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.toppings.includes(topping.id)}
              />
              {topping.name}
            </label>
          ))}
        </div>
        <div className="form-group input-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
