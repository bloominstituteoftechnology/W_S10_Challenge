import React from 'react';
import Form from './components/Form';
import Orders from './components/Orders';

const App = () => {
  return (
    <div className="container">
      <h1>
        Pizza App <span role="img" aria-label="pizza">🍕</span>
      </h1>
      <div className="form-and-orders">
        <Form />
        <Orders />
      </div>
    </div>
  );
};

export default App;
