import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Function to fetch data and update income/expense
  const handleUpdate = () => {
    axios
      .get('http://localhost:8000/transactions')
      .then((response) => {
        const transactions = response.data;

        // Calculate total income and expense
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);

        const expense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);

        // Update state
        setTotalIncome(income);
        setTotalExpense(expense);

        // Update summary in db.json
        updateSummary(income, expense);
      })
      .catch((err) => {
        console.error('Error fetching transactions:', err);
      });
  };

  // Function to update summary in db.json
  const updateSummary = (income, expense) => {
    axios
      .put('http://localhost:8000/summary', {
        totalIncome: income,
        totalExpense: expense,
      })
      .then((response) => {
        console.log('Summary updated successfully:', response.data);
      })
      .catch((err) => {
        console.error('Error updating summary in db.json:', err);
      });
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Expense</h3>
          <p>${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Update button */}
      <button className="update-button" onClick={handleUpdate}>
        Update Income & Expense
      </button>
    </div>
  );
}

export default Dashboard;
