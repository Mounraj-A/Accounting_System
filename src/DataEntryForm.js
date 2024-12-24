import React, { useState } from 'react';
import axios from 'axios';
import './DataEntryForm.css';

function DataEntryForm({ onAddTransaction }) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!type || !amount || !description) {
      setError('All fields are required');
      return;
    }

    try {
      // Create a new transaction object
      const newTransaction = {
        type,
        amount: parseFloat(amount),
        description,
      };

      // Post the new transaction to the server (db.json)
      const response = await axios.post('http://localhost:8000/transactions', newTransaction);

      // Log the full response and status for debugging
      console.log('Response:', response);
      console.log('Status Code:', response.status);

      // Handle both 201 (Created) and 200 (OK) as success statuses
      if (response.status === 201 || response.status === 200) {
        setError(''); // Clear the error

        // Pass the new transaction to the parent component
        onAddTransaction(response.data);

        // Reset form fields after successful submission
        setType('');
        setAmount('');
        setDescription('');

        // Display success alert
        alert('Transaction is complete!');
      } else {
        // Handle unexpected statuses
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error occurred:', err); // Log the error to the console
      setError('Error occurred while adding the transaction');
    }
  };

  return (
    <div className="data-entry-container">
      <h2>Add Transaction</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter transaction type"
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default DataEntryForm;
