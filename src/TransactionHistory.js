import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');

  const API_URL = 'http://localhost:8000/transactions'; // URL for local db.json

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Call fetchTransactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to delete a transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Fetch the updated transactions list after deleting
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="transaction-history-container">
      <center>
        <h2>Transaction History</h2>
      </center>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="transaction-list">
        {filteredTransactions.map((t) => (
          <li key={t.id} className={`transaction-item ${t.type}`}>
            <span className="transaction-type">{t.type}</span>
            <span className="transaction-amount">${t.amount.toFixed(2)}</span>
            <span className="transaction-description">{t.description}</span>
            <button className="delete-button" onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
